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

        const degree        = formData.get('degree')         as string;
        const thesisTitle   = formData.get('thesisTitle')    as string;
        const tasksStr      = formData.get('tasks')           as string;
        const estimatedMin  = formData.get('estimatedMin')   as string;
        const estimatedMax  = formData.get('estimatedMax')   as string;
        const ndaAgreed     = formData.get('ndaAgreed')       as string;
        const ndaSignature  = formData.get('ndaSignature')    as string;
        const ndaSignedAt   = formData.get('ndaSignedAt')     as string;
        const googleDriveLink = formData.get('googleDriveLink') as string | null;

        if (!degree || !thesisTitle || !tasksStr) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (ndaAgreed !== 'true' || !ndaSignature) {
            return NextResponse.json({ error: 'NDA must be signed before submitting' }, { status: 400 });
        }

        const wordCount = thesisTitle.trim().split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount < 3) {
            return NextResponse.json({ error: 'Thesis title must contain at least 3 words' }, { status: 400 });
        }

        const tasks = JSON.parse(tasksStr);

        const { databases } = createAdminClient();

        // Build description with tasks + google drive link
        const descriptionData: Record<string, unknown> = { ...tasks };
        if (googleDriveLink) {
            descriptionData.googleDriveLink = googleDriveLink;
        }

        // Build project data — only include fields that are likely in schema
        // Core required fields
        const projectData: Record<string, unknown> = {
            customer_id:    user.$id,
            title:          thesisTitle,
            description:    JSON.stringify(descriptionData),
            degree_type:    degree,
            status:         'awaiting_quote',
            created_at:     new Date().toISOString(),
            updated_at:     new Date().toISOString(),
        };

        // Optional fields — only add if not empty (avoids schema mismatch errors)
        if (ndaSignature)  projectData.nda_signature = ndaSignature;
        if (ndaAgreed)     projectData.nda_agreed = true;
        if (ndaSignedAt)   projectData.nda_signed_at = ndaSignedAt || new Date().toISOString();

        // Create project document — status is awaiting_quote (no upfront payment)
        let projectDoc;
        try {
            projectDoc = await databases.createDocument({
                databaseId:   DATABASE_ID,
                collectionId: COLLECTIONS.PROJECTS,
                documentId:   ID.unique(),
                data: projectData,
            });
        } catch (createErr: unknown) {
            const msg = createErr instanceof Error ? createErr.message : String(createErr);
            console.error('Appwrite createDocument error:', msg, JSON.stringify(createErr));
            return NextResponse.json(
                { error: 'Failed to create project. Please try again.', details: msg },
                { status: 500 }
            );
        }

        const projectId = projectDoc.$id;

        // Upload data files (raw data, docs, etc.)
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
                        file_purpose:      'initial_upload',
                        status:            'pending',
                        created_at:        new Date().toISOString(),
                    },
                });
            } catch (e) {
                console.error(`Failed to upload ${file.name}:`, e);
                // Continue with remaining files
            }
        }

        // Email notification to admin
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;

        if (RESEND_API_KEY && ADMIN_EMAIL) {
            const selectedServices = Object.entries(tasks)
                .filter(([, v]) => v)
                .map(([k]) => k)
                .join(', ');

            fetch('https://api.resend.com/emails', {
                method:  'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({
                    from:    'Naggar Analytics <onboarding@resend.dev>',
                    to:      [ADMIN_EMAIL],
                    subject: `New Project Awaiting Quote: ${thesisTitle}`,
                    html: `
                        <h2>New Project Submitted — Awaiting Your Quote</h2>
                        <p><strong>Title:</strong> ${thesisTitle}</p>
                        <p><strong>Degree:</strong> ${degree}</p>
                        <p><strong>Client:</strong> ${user.email}</p>
                        <p><strong>Services Requested:</strong> ${selectedServices}</p>
                        <p><strong>Estimated Range:</strong> $${estimatedMin || '?'} – $${estimatedMax || '?'}</p>
                        <p><strong>Files Uploaded:</strong> ${allFiles.length}</p>
                        ${googleDriveLink ? `<p><strong>Google Drive:</strong> <a href="${googleDriveLink}">${googleDriveLink}</a></p>` : ''}
                        <p><strong>NDA Signed By:</strong> ${ndaSignature}</p>
                        <hr />
                        <p>Please review the files and set a final quote in the Admin Dashboard.</p>
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
