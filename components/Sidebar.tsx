"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    GraduationCap,
    PlusCircle,
    LogOut,
    Menu,
    X,
    HelpCircle,
    User,
    Sun,
    Moon,
    Globe,
} from "lucide-react";
import { useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageProvider";

interface SidebarProps {
    user?: { name: string | null; email: string | null };
}

const Sidebar = ({ user }: SidebarProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showSignOutTip, setShowSignOutTip] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { t, lang, toggleLang } = useLanguage();

    const navItems = [
        { label: t("sidebar.dashboard"), icon: LayoutDashboard, href: "/dashboard" },
        { label: t("sidebar.library"), icon: GraduationCap, href: "/dashboard/library" },
        { label: t("sidebar.newRequest"), icon: PlusCircle, href: "/dashboard/new" },
    ];

    const isActive = (href: string) =>
        href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#16a085] rounded-lg shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={`fixed inset-y-0 ${lang === 'ar' ? 'right-0' : 'left-0'} z-40 w-64 backdrop-blur-xl border-r flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : lang === 'ar' ? "translate-x-full md:translate-x-0" : "-translate-x-full"
                    }`}
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
                {/* Logo */}
                <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <Link href="/" className="inline-block">
                        <Image
                            src="/logo/logo.svg"
                            alt="Naggar Analytics"
                            width={400}
                            height={400}
                            className="w-auto h-10"
                            priority
                        />
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.href)
                                ? "bg-[#16a085] text-white shadow-lg shadow-[#16a085]/20"
                                : "hover:bg-[var(--input-bg)]"
                                }`}
                            style={!isActive(item.href) ? { color: 'var(--text-secondary)' } : {}}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer controls */}
                <div className="p-4 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>

                    {/* Theme & Lang toggles */}
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <button
                            onClick={toggleTheme}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all hover:bg-[var(--input-bg)]"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                            {theme === "dark" ? "Light" : "Dark"}
                        </button>
                        <button
                            onClick={toggleLang}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium border transition-all hover:bg-[var(--input-bg)]"
                            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                        >
                            <Globe size={14} />
                            {t("lang.toggle")}
                        </button>
                    </div>

                    {/* Sign-out guidance tip */}
                    <button
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-left hover:bg-[var(--input-bg)]"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => setShowSignOutTip(!showSignOutTip)}
                        aria-expanded={showSignOutTip ? "true" : "false"}
                    >
                        <HelpCircle size={18} />
                        <span className="font-medium text-xs">{t("sidebar.signOutHelp")}</span>
                    </button>

                    {showSignOutTip && (
                        <div className="mx-2 px-4 py-3 rounded-xl text-xs leading-relaxed border" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                            {t("sidebar.signOutTip")}
                        </div>
                    )}

                    {/* User profile strip */}
                    {user?.email && (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--input-bg)' }}>
                            <div className="w-8 h-8 rounded-full bg-[#16a085]/20 flex items-center justify-center shrink-0">
                                <User size={16} className="text-[#16a085]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name || t("sidebar.user")}</p>
                                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Sign out button */}
                    <LogoutLink className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">{t("sidebar.signOut")}</span>
                    </LogoutLink>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
