"use client";

import { useLanguage } from "@/context/LanguageProvider";
import LocaleLink from "@/components/LocaleLink";
import { FolderOpen, Briefcase, Mail, Settings } from "lucide-react";

export default function AdminSidebar({ user }: { user: any }) {
    const { t, dir } = useLanguage();

    return (
        <aside className="w-full md:w-64 bg-[#111821] border-l border-white/5 flex flex-col" dir={dir}>
            <div className="p-6 border-b border-white/5">
                <h2 className={`text-2xl font-bold text-white font-${dir === 'rtl' ? 'arabic' : 'sans'} tracking-tight`}>
                    {t('admin.dashboard')}
                </h2>
                <p className="text-[#16a085] text-xs mt-1 font-mono uppercase tracking-widest block">Naggar Analytics</p>
            </div>

            <nav className={`flex-1 p-4 space-y-2 font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>
                <LocaleLink href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#16a085]/10 text-[#16a085] rounded-xl font-medium transition-all">
                    <FolderOpen size={18} />
                    {t('admin.nav.projects')}
                </LocaleLink>
                <LocaleLink href="/admin/careers" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                    <Briefcase size={18} />
                    {t('admin.nav.careers')}
                </LocaleLink>
                <LocaleLink href="/admin/subscribers" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                    <Mail size={18} />
                    {t('admin.nav.subscribers')}
                </LocaleLink>
                <LocaleLink href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                    <Settings size={18} />
                    {t('admin.nav.settings')}
                </LocaleLink>
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#16a085] to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.[0] ?? 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`text-white text-sm font-medium truncate ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{user.name}</p>
                        <p className={`text-slate-500 text-xs truncate font-mono ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{user.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
