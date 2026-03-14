import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    // Admin guard
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    const user    = await getSessionUser(session);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    if (!user.labels?.includes('admin') && user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    try {
        const { databases } = createAdminClient();

        const response = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.SUBSCRIBERS,
            queries:      [Query.orderDesc('created_at'), Query.limit(200)],
        });

        return NextResponse.json({ data: response.documents });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
