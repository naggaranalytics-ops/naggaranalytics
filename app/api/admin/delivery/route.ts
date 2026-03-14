export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, BUCKETS, ID, getFileUrl } from '@/lib/appwrite-server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

export async function POST(request: NextRequest) {
    try {
        // Admin auth guard
        const session = request.cookies.get(SESSION_COOKIE)?.value;
        const user    = await getSessionUser(session);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (!user.labels?.includes('admin') && user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const formData  = request.formData ? await request.formData() : null;
        if (!formData) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const projectId = formData.get('projectId') as string;
        const file      = formData.get('file')       as File | null;

        if (!projectId || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upload file to Appwrite Storage
        const fileId    = ID.unique();
        const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
        const pid       = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
        const apiKey    = process.env.APPWRITE_API_KEY!;

        const form = new FormData();
        form.append('fileId', fileId);
        form.append('file',   file, file.name);

        const uploadRes = await fetch(`${endpoint}/storage/buckets/${BUCKETS.DELIVERY_FILES}/files`, {
            method:  'POST',
            headers: {
                'X-Appwrite-Project': pid,
                'X-Appwrite-Key':     apiKey,
            },
            body: form,
        });

        if (!uploadRes.ok) {
            const err = await uploadRes.json();
            return NextResponse.json({ error: 'Failed to upload file', details: err.message }, { status: 500 });
        }

        const fileUrl = getFileUrl(BUCKETS.DELIVERY_FILES, fileId);

        // Save file record in DB
        const { databases } = createAdminClient();

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
                storage_bucket_id: BUCKETS.DELIVERY_FILES,
                storage_file_id:   fileId,
                file_version:      1,
                file_purpose:      'result',
                status:            'approved',
                created_at:        new Date().toISOString(),
            },
        });

        return NextResponse.json({ success: true, url: fileUrl });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Delivery error:', message);
        return NextResponse.json({ error: 'Internal server error.', details: message }, { status: 500 });
    }
}
