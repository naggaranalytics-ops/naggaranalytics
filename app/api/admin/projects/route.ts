import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function PATCH(req: NextRequest) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    const user    = await getSessionUser(session);

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!user.labels?.includes('admin') && user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { projectId, status } = await req.json();

    if (!projectId || !status) {
        return NextResponse.json({ error: 'projectId and status are required' }, { status: 400 });
    }

    const VALID = ['inquiry', 'quoted', 'paid', 'in_progress', 'completed'];
    if (!VALID.includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    try {
        const { databases } = createAdminClient();

        const updated = await databases.updateDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            documentId:   projectId,
            data: {
                status,
                updated_at: new Date().toISOString(),
            },
        });

        return NextResponse.json(updated);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
