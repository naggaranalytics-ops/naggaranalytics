export const runtime = 'edge';

import { cookies } from 'next/headers';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';
import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import TechnicianPageContent from './TechnicianPageContent';

export const revalidate = 0;

export default async function TechnicianPage() {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    if (!user) return null;

    const { databases } = createAdminClient();

    let projects: any[] = [];
    let fetchError: string | null = null;

    try {
        // Fetch projects assigned to this technician
        const res = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries: [
                Query.equal('technician_id', user.$id),
                Query.orderDesc('created_at'),
                Query.limit(100),
            ],
        });
        projects = res.documents;
    } catch (e: any) {
        fetchError = e.message;
    }

    return <TechnicianPageContent projects={projects} fetchError={fetchError} />;
}
