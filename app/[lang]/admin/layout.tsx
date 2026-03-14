import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionUser, SESSION_COOKIE } from '@/lib/appwrite-auth';
import LocaleLink from '@/components/LocaleLink';
import { LogOut, Settings, Users, FolderOpen, Briefcase, Mail } from 'lucide-react';

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
            <aside className="w-full md:w-64 bg-[#111821] border-l border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-2xl font-bold text-white font-arabic tracking-tight">
                        لوحة الإدارة
                    </h2>
                    <p className="text-[#16a085] text-xs mt-1 font-mono uppercase tracking-widest block">Naggar Analytics</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 font-arabic">
                    <LocaleLink href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#16a085]/10 text-[#16a085] rounded-xl font-medium transition-all">
                        <FolderOpen size={18} />
                        المشاريع
                    </LocaleLink>
                    <LocaleLink href="/admin/careers" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                        <Briefcase size={18} />
                        طلبات التوظيف
                    </LocaleLink>
                    <LocaleLink href="/admin/subscribers" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                        <Mail size={18} />
                        المشتركون
                    </LocaleLink>
                    <LocaleLink href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                        <Settings size={18} />
                        الإعدادات (قريباً)
                    </LocaleLink>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#16a085] to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
                            {user.name?.[0] ?? 'A'}
                        </div>
                        <div className="flex-1 truncate">
                            <p className="text-white text-sm font-medium truncate">{user.name}</p>
                            <p className="text-slate-500 text-xs truncate font-mono">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
