import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionUser, SESSION_COOKIE } from '@/lib/appwrite-auth';
import Sidebar from '@/components/Sidebar';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    if (!user) {
        redirect(`/${params.lang}/login`);
    }

    const isRtl = params.lang === 'ar';

    return (
        <div className="min-h-screen flex bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
            <Sidebar user={{ name: user.name || null, email: user.email || null }} />
            <main className={`flex-1 ${isRtl ? 'md:mr-64' : 'md:ml-64'} pt-6 px-4 sm:px-6 lg:px-8 pb-20 min-h-screen`}>
                {children}
            </main>
        </div>
    );
}
