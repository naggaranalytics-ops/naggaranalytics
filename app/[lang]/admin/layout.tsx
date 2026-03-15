import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionUser, SESSION_COOKIE } from '@/lib/appwrite-auth';
import AdminSidebar from './AdminSidebar';

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params?: { lang?: string };
}) {
    const lang = params?.lang ?? 'ar';

    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    if (!user) {
        redirect(`/${lang}/login`);
    }

    // Admin check: either the user has the "admin" label (set in Appwrite Console)
    // or their email matches the ADMIN_EMAIL env var.
    const isAdmin =
        user.labels?.includes('admin') ||
        user.email === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
        redirect(`/${lang}/dashboard`);
    }

    return (
        <div className="min-h-screen bg-[#0a0f16] flex flex-col md:flex-row" dir="rtl">
            {/* Sidebar */}
            <AdminSidebar user={user} />

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
