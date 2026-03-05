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
} from "lucide-react";
import { useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface SidebarProps {
    user?: { name: string | null; email: string | null };
}

const Sidebar = ({ user }: SidebarProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showSignOutTip, setShowSignOutTip] = useState(false);

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Research Academy", icon: GraduationCap, href: "/dashboard/library" },
        { label: "New Request", icon: PlusCircle, href: "/dashboard/new" },
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
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#080e17]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
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
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Help & Sign Out */}
                <div className="p-4 border-t border-white/5 space-y-2">

                    {/* Sign-out guidance tip */}
                    <button
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all text-left"
                        onClick={() => setShowSignOutTip(!showSignOutTip)}
                        aria-expanded={showSignOutTip ? "true" : "false"}
                    >
                        <HelpCircle size={18} />
                        <span className="font-medium text-xs">Need help signing out?</span>
                    </button>

                    {showSignOutTip && (
                        <div className="mx-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400 leading-relaxed">
                            Click <span className="text-white font-semibold">Sign Out</span> below to securely log out of your account. Your projects and data are saved automatically — you can sign back in anytime.
                        </div>
                    )}

                    {/* User profile strip */}
                    {user?.email && (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/3 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-[#16a085]/20 flex items-center justify-center shrink-0">
                                <User size={16} className="text-[#16a085]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-white text-xs font-semibold truncate">{user.name || "User"}</p>
                                <p className="text-slate-500 text-[10px] truncate">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Sign out button */}
                    <LogoutLink className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Sign Out</span>
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
