/**
 * Dashboard Project Routes
 * GET  /api/dashboard/projects — list projects for the logged-in user
 * POST /api/dashboard/projects — create a new project
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, ID, Query } from '@/lib/appwrite-server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const session = request.cookies.get(SESSION_COOKIE)?.value;
        const user    = await getSessionUser(session);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { databases } = createAdminClient();

        const projectsResponse = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries: [
                Query.equal('customer_id', user.$id),
                Query.orderDesc('created_at'),
                Query.limit(50),
            ],
        });

        return NextResponse.json({
            projects: projectsResponse.documents,
            total:    projectsResponse.total,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch projects';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = request.cookies.get(SESSION_COOKIE)?.value;
        const user    = await getSessionUser(session);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        if (!body.title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const { databases } = createAdminClient();

        const project = await databases.createDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            documentId:   ID.unique(),
            data: {
                customer_id:    user.$id,
                title:          body.title,
                description:    body.description || '',
                status:         'inquiry',
                payment_status: 'pending',
                pricing_tier_id: body.pricing_tier_id || null,
                created_at:     new Date().toISOString(),
                updated_at:     new Date().toISOString(),
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create project';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
