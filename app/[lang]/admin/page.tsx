export const runtime = 'edge';

import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import AdminPageContent from './AdminPageContent';

export const revalidate = 0;

export default async function AdminPage() {
    const { databases } = createAdminClient();

    let projects: any[] = [];
    let fetchError: string | null = null;

    try {
        const res = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries:      [Query.orderDesc('created_at'), Query.limit(100)],
        });
        projects = res.documents;
    } catch (e: any) {
        fetchError = e.message;
    }

    return <AdminPageContent projects={projects} fetchError={fetchError} />;
}
