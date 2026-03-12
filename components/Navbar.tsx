"use client";

import LocaleLink from "@/components/LocaleLink";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
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
        <nav dir={dir} className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70" style={{ backgroundColor: 'var(--navbar-bg)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <LocaleLink href="/">
                            <Image
                                src={theme === 'dark' ? "/logos/navbar-dark.svg" : "/logos/navbar-light.svg"}
                                alt="Naggar Analytics"
                                width={400}
                                height={400}
                                className="w-auto h-12 md:h-12"
                                priority
                            />
                        </LocaleLink>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-baseline gap-6">
                            {navLinks.map((link) => (
                                <LocaleLink
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--primary)]"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.label}
                                </LocaleLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
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

                        <LocaleLink href="/auth/login" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>
                            {t("nav.signIn")}
                        </LocaleLink>
                        <LocaleLink href="/auth/signup" className="px-6 py-2 bg-[var(--primary)] hover:opacity-90 text-white text-sm font-bold rounded-xl transition-all">
                            {t("nav.register")}
                        </LocaleLink>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-3">
                        <button onClick={toggleTheme} className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }} aria-label={t("theme.toggle")}>
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={toggleLang} className="text-xs font-bold px-2 py-1 rounded-lg border" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                            {t("lang.toggle")}
                        </button>
                        <LocaleLink href="/auth/login" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-primary)' }}>
                            {t("nav.signIn")}
                        </LocaleLink>
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
                    <div className={`px-4 pt-2 pb-6 space-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {navLinks.map((link) => (
                            <LocaleLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-base font-medium rounded-xl transition-all hover:bg-[var(--input-bg)]"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {link.label}
                            </LocaleLink>
                        ))}
                        <div className="pt-4 mt-4 border-t flex flex-col gap-3 px-4" style={{ borderColor: 'var(--border-color)' }}>
                            <LocaleLink href="/auth/signup" className="w-full py-3 bg-[var(--primary)] text-white text-center font-bold rounded-xl shadow-lg">
                                {t("nav.getStarted")}
                            </LocaleLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
