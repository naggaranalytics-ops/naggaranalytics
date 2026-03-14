import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, Query, ID } from '@/lib/appwrite-server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        const { databases } = createAdminClient();

        // Check for duplicate
        const existing = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.SUBSCRIBERS,
            queries:      [Query.equal('email', email), Query.limit(1)],
        });

        if (existing.documents.length > 0) {
            return NextResponse.json({ success: true, message: 'Already subscribed.' });
        }

        await databases.createDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.SUBSCRIBERS,
            documentId:   ID.unique(),
            data: {
                email,
                name:       name || '',
                status:     'active',
                created_at: new Date().toISOString(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('subscribe error:', message);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
