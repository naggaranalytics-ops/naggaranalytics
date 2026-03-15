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

    const { projectId, status, technician_id } = await req.json();

    if (!projectId) {
        return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    // At least one field to update
    if (!status && technician_id === undefined) {
        return NextResponse.json({ error: 'Provide status or technician_id to update' }, { status: 400 });
    }

    if (status) {
        const VALID = ['inquiry', 'awaiting_quote', 'quoted', 'paid', 'in_progress', 'completed'];
        if (!VALID.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }
    }

    try {
        const { databases } = createAdminClient();

        const data: Record<string, unknown> = { updated_at: new Date().toISOString() };
        if (status) data.status = status;
        if (technician_id !== undefined) data.technician_id = technician_id;

        const updated = await databases.updateDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            documentId:   projectId,
            data,
        });

        return NextResponse.json(updated);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
