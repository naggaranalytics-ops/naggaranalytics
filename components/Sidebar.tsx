"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    LayoutDashboard,
    GraduationCap,
    PlusCircle,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "My Projects", icon: BarChart3, href: "/dashboard#projects" },
        { label: "Research Academy", icon: GraduationCap, href: "/dashboard#academy" },
        { label: "New Request", icon: PlusCircle, href: "/dashboard#new-request" },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden p-2 bg-primary rounded-lg shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark/60 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <Link href="/" className="block w-48">
                            <Image src="/logo/logo-light.png" alt="Naggar Analytics" width={400} height={100} className="w-full h-auto" />
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon size={20} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/5">
                        <LogoutLink className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                            <LogOut size={20} />
                            <span className="font-medium text-sm">Sign Out</span>
                        </LogoutLink>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
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
