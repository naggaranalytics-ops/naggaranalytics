"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
        { href: "/faq", label: "FAQ" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70 bg-[#111821] border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/logo/logo.svg" alt="Naggar Analytics" width={400} height={400} className="w-auto h-12 md:h-12" priority />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <LoginLink className="text-sm font-medium hover:text-primary transition-colors text-white">Sign In</LoginLink>
                        <RegisterLink className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-all">
                            Register
                        </RegisterLink>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-4">
                        <LoginLink className="text-sm font-medium text-white hover:text-primary transition-colors">Sign In</LoginLink>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMenuOpen && (
                <div className="md:hidden glass-card border-x-0 border-b border-white/5 bg-[#111821]/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-3 px-4">
                            <RegisterLink className="w-full py-3 bg-primary text-white text-center font-bold rounded-xl shadow-lg shadow-primary/20">
                                Get Started
                            </RegisterLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
