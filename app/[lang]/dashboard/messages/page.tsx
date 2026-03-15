import { cookies } from 'next/headers';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';
import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import { Project } from '@/lib/appwrite-types';
import { ChatMasterLayout } from '@/components/dashboard/chat/ChatMasterLayout';

export default async function MessagesPage() {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    if (!user) return null;

    const { databases } = createAdminClient();

    let projects: Project[] = [];
    let error: string | null = null;

    try {
        // Fetch projects to populate the sidebar
        const res = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries: [
                Query.equal('customer_id', user.$id),
                Query.orderDesc('created_at'),
                Query.limit(50),
            ],
        });
        projects = res.documents as unknown as Project[];
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load projects';
        console.error("Messages Error loading projects:", error);
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            </div>
            
            {error ? (
                 <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                 Error loading conversations: {error}. Please try again later.
               </div>
            ) : (
                <ChatMasterLayout 
                    projects={projects} 
                    currentUserId={user.$id} 
                />
            )}
        </div>
    );
}
