"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageProvider";

export default function Footer() {
    const { t, dir } = useLanguage();

    return (
        <footer className="border-t py-12 relative z-20" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--border-color)' }}>
            <div className={`max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 ${dir === 'rtl' ? 'text-right' : ''}`}>
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="font-bold text-xl tracking-tighter mb-4 block" style={{ color: 'var(--text-primary)' }}>
                        NAGGAR<span className="text-[#16a085]">ANALYTICS</span>
                    </Link>
                    <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                        {t("footer.tagline")}
                    </p>
                </div>

                <div>
                    <h5 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t("footer.quickLinks")}</h5>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <li><Link href="/services" className="hover:text-[#16a085]">{t("footer.services")}</Link></li>
                        <li><Link href="/portfolio" className="hover:text-[#16a085]">{t("footer.portfolio")}</Link></li>
                        <li><Link href="/about" className="hover:text-[#16a085]">{t("footer.aboutUs")}</Link></li>
                        <li><Link href="/contact" className="hover:text-[#16a085]">{t("footer.contact")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t("footer.legal")}</h5>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <li><Link href="#" className="hover:text-[#16a085]">{t("footer.privacy")}</Link></li>
                        <li><Link href="#" className="hover:text-[#16a085]">{t("footer.terms")}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t text-center text-xs font-mono" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </div>
        </footer>
    );
}
