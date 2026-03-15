"use client";

import { useLanguage } from "@/context/LanguageProvider";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutShell({
    children,
    user,
}: {
    children: React.ReactNode;
    user: any;
}) {
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0a0f16] flex flex-col md:flex-row" dir={dir}>
            {/* Sidebar */}
            <AdminSidebar user={user} />

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
