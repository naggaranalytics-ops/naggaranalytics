"use client";

import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageProvider";

export default function Footer() {
    const { t, dir } = useLanguage();

    return (
        <footer dir={dir} className="border-t py-12 relative z-20" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <LocaleLink href="/" className="font-bold text-xl tracking-tighter mb-4 block" style={{ color: 'var(--text-primary)' }}>
                        NAGGAR<span className="text-[#16a085]">ANALYTICS</span>
                    </LocaleLink>
                    <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                        {t("footer.tagline")}
                    </p>
                </div>

                <div>
                    <h5 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t("footer.quickLinks")}</h5>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <li><LocaleLink href="/services" className="hover:text-[#16a085]">{t("footer.services")}</LocaleLink></li>
                        <li><LocaleLink href="/portfolio" className="hover:text-[#16a085]">{t("footer.portfolio")}</LocaleLink></li>
                        <li><LocaleLink href="/about" className="hover:text-[#16a085]">{t("footer.aboutUs")}</LocaleLink></li>
                        <li><LocaleLink href="/contact" className="hover:text-[#16a085]">{t("footer.contact")}</LocaleLink></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t("footer.legal")}</h5>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <li><LocaleLink href="/privacy" className="hover:text-[#16a085]">{t("footer.privacy")}</LocaleLink></li>
                        <li><LocaleLink href="/terms" className="hover:text-[#16a085]">{t("footer.terms")}</LocaleLink></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t text-center text-xs font-mono" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </div>
        </footer>
    );
}
