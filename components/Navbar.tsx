"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageProvider";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { t, lang, toggleLang, dir } = useLanguage();

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/services", label: t("nav.services") },
        { href: "/portfolio", label: t("nav.portfolio") },
        { href: "/careers", label: t("nav.careers") },
        { href: "/faq", label: t("nav.faq") },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70" style={{ backgroundColor: 'var(--navbar-bg)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between h-20 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src={theme === 'light' ? "/logo/light-logo.svg" : "/logo/logo.svg"}
                                alt="Naggar Analytics"
                                width={400}
                                height={400}
                                className="w-auto h-12 md:h-12"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className={`flex items-baseline gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--primary)]"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className={`hidden md:flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl hover:bg-[var(--input-bg)] transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            aria-label={t("theme.toggle")}
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all hover:bg-[var(--input-bg)]"
                            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                        >
                            <Globe size={14} />
                            {t("lang.toggle")}
                        </button>

                        <LoginLink className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>
                            {t("nav.signIn")}
                        </LoginLink>
                        <RegisterLink className="px-6 py-2 bg-[var(--primary)] hover:opacity-90 text-white text-sm font-bold rounded-xl transition-all">
                            {t("nav.register")}
                        </RegisterLink>
                    </div>

                    {/* Mobile menu button */}
                    <div className={`flex md:hidden items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <button onClick={toggleTheme} className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }} aria-label={t("theme.toggle")}>
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={toggleLang} className="text-xs font-bold px-2 py-1 rounded-lg border" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                            {t("lang.toggle")}
                        </button>
                        <LoginLink className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>
                            {t("nav.signIn")}
                        </LoginLink>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMenuOpen && (
                <div className="md:hidden glass-card border-x-0 border-b backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-base font-medium rounded-xl transition-all hover:bg-[var(--input-bg)]"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t flex flex-col gap-3 px-4" style={{ borderColor: 'var(--border-color)' }}>
                            <RegisterLink className="w-full py-3 bg-[var(--primary)] text-white text-center font-bold rounded-xl shadow-lg">
                                {t("nav.getStarted")}
                            </RegisterLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
