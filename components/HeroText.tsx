"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function HeroText() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 opacity-90">
            <p className="text-xl md:text-2xl font-mono tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                {t("hero.rawData")}
            </p>
            <svg className="w-6 h-6 text-[#16a085] transform rotate-90 md:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            <p className="text-xl md:text-2xl font-mono font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {t("hero.defensibleResults")}
            </p>
        </div>
    );
}
