export const runtime = 'edge';

import { cookies } from 'next/headers';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';
import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import DashboardPageContent from '@/components/DashboardPageContent';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    // Layout already guards auth — this is a fallback
    if (!user) return null;

    const { databases } = createAdminClient();

    let projects: unknown[] = [];
    let error: string | null = null;

    try {
        const res = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries: [
                Query.equal('customer_id', user.$id),
                Query.orderDesc('created_at'),
                Query.limit(50),
            ],
        });
        projects = res.documents;
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load projects';
    }

    return (
        <>
            <DashboardPageContent
                user={{ id: user.$id, email: user.email, name: user.name }}
                projects={projects}
                error={error}
            />
            <WhatsAppWidget />
        </>
    );
}
