"use client";

import { useLanguage } from "@/context/LanguageProvider";
import LocaleLink from "@/components/LocaleLink";
import { FolderOpen } from "lucide-react";

export default function TechnicianSidebar({ user }: { user: any }) {
    const { t, dir } = useLanguage();

    return (
        <aside className="w-full md:w-64 bg-[#111821] border-l border-white/5 flex flex-col" dir={dir}>
            <div className="p-6 border-b border-white/5">
                <h2 className={`text-2xl font-bold text-white font-${dir === 'rtl' ? 'arabic' : 'sans'} tracking-tight`}>
                    {t('tech.dashboard')}
                </h2>
                <p className="text-[#16a085] text-xs mt-1 font-mono uppercase tracking-widest block">Naggar Analytics</p>
            </div>

            <nav className={`flex-1 p-4 space-y-2 font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>
                <LocaleLink href="/technician" className="flex items-center gap-3 px-4 py-3 bg-[#16a085]/10 text-[#16a085] rounded-xl font-medium transition-all">
                    <FolderOpen size={18} />
                    {t('tech.nav.projects')}
                </LocaleLink>
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#16a085] to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.[0] ?? 'T'}
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
