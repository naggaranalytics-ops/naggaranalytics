"use client";

import { useLanguage } from "@/context/LanguageProvider";
import TechnicianSidebar from "./TechnicianSidebar";

export default function TechnicianLayoutShell({
    children,
    user,
}: {
    children: React.ReactNode;
    user: any;
}) {
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-tertiary)]" dir={dir}>
            <TechnicianSidebar user={user} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
