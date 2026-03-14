export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, BUCKETS, ID, getFileUrl } from '@/lib/appwrite-server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

// Upload a File object to Appwrite Storage and return the public view URL
async function uploadFile(file: File, bucketId: string): Promise<string> {
    const fileId    = ID.unique();
    const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
    const apiKey    = process.env.APPWRITE_API_KEY!;

    const form = new FormData();
    form.append('fileId', fileId);
    form.append('file',   file, file.name);

    const res = await fetch(`${endpoint}/storage/buckets/${bucketId}/files`, {
        method:  'POST',
        headers: {
            'X-Appwrite-Project': projectId,
            'X-Appwrite-Key':     apiKey,
        },
        body: form,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Upload failed: ${err.message}`);
    }

    return getFileUrl(bucketId, fileId);
}

export async function POST(request: NextRequest) {
    try {
        // Auth check
        const session = request.cookies.get(SESSION_COOKIE)?.value;
        const user    = await getSessionUser(session);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();

        const degree      = formData.get('degree')       as string;
        const thesisTitle = formData.get('thesisTitle')  as string;
        const tasksStr    = formData.get('tasks')         as string;
        const totalStr    = formData.get('total')         as string;
        const paymentPhase = formData.get('paymentPhase') as string;
        const receiptFile = formData.get('receipt')       as File | null;

        if (!degree || !thesisTitle || !tasksStr || !totalStr || !receiptFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const wordCount = thesisTitle.trim().split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount < 3) {
            return NextResponse.json({ error: 'Thesis title must contain at least 3 words' }, { status: 400 });
        }

        const tasks = JSON.parse(tasksStr);
        const total = parseFloat(totalStr);

        const { databases } = createAdminClient();

        // Upload receipt to Appwrite Storage
        const receiptUrl = await uploadFile(receiptFile, BUCKETS.CLIENT_UPLOADS);

        // Create project document
        const projectDoc = await databases.createDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            documentId:   ID.unique(),
            data: {
                customer_id:   user.$id,
                title:         thesisTitle,
                description:   JSON.stringify(tasks),
                degree_type:   degree,
                status:        'inquiry',
                payment_status: 'pending',
                quoted_price:  total,
                created_at:    new Date().toISOString(),
                updated_at:    new Date().toISOString(),
            },
        });

        const projectId = projectDoc.$id;

        // Record receipt as a file document
        await databases.createDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.FILES,
            documentId:   ID.unique(),
            data: {
                project_id:        projectId,
                uploader_id:       user.$id,
                file_name:         receiptFile.name,
                file_size:         receiptFile.size,
                file_type:         receiptFile.type || 'application/octet-stream',
                storage_bucket_id: BUCKETS.CLIENT_UPLOADS,
                storage_file_id:   receiptUrl,  // storing URL for quick access
                file_version:      1,
                file_purpose:      'inquiry',
                status:            'pending',
                created_at:        new Date().toISOString(),
            },
        });

        // Upload additional files (raw data, docs, etc.)
        const allFiles = formData.getAll('files') as File[];

        for (const file of allFiles) {
            try {
                const fileUrl = await uploadFile(file, BUCKETS.CLIENT_UPLOADS);

                await databases.createDocument({
                    databaseId:   DATABASE_ID,
                    collectionId: COLLECTIONS.FILES,
                    documentId:   ID.unique(),
                    data: {
                        project_id:        projectId,
                        uploader_id:       user.$id,
                        file_name:         file.name,
                        file_size:         file.size,
                        file_type:         file.type || 'application/octet-stream',
                        storage_bucket_id: BUCKETS.CLIENT_UPLOADS,
                        storage_file_id:   fileUrl,
                        file_version:      1,
                        file_purpose:      'inquiry',
                        status:            'pending',
                        created_at:        new Date().toISOString(),
                    },
                });
            } catch (e) {
                console.error(`Failed to upload ${file.name}:`, e);
                // Continue with remaining files
            }
        }

        // Email notification
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;

        if (RESEND_API_KEY && ADMIN_EMAIL) {
            fetch('https://api.resend.com/emails', {
                method:  'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({
                    from:    'Naggar Analytics <onboarding@resend.dev>',
                    to:      [ADMIN_EMAIL],
                    subject: `New Project Submitted: ${thesisTitle}`,
                    html: `
                        <h2>New Project Submitted</h2>
                        <p><strong>Title:</strong> ${thesisTitle}</p>
                        <p><strong>Degree:</strong> ${degree}</p>
                        <p><strong>Client:</strong> ${user.email}</p>
                        <p><strong>Total:</strong> $${total}</p>
                        <p><strong>Payment Phase:</strong> ${paymentPhase}</p>
                    `,
                }),
            }).catch(() => {});
        }

        return NextResponse.json({ success: true, projectId });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Project submission error:', message);
        return NextResponse.json({ error: 'Internal server error.', details: message }, { status: 500 });
    }
}
