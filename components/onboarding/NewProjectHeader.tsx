"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function NewProjectHeader() {
    const { t, dir } = useLanguage();

    return (
        <header className="mb-12 border-b border-white/5 pb-8 text-center" dir={dir}>
            <h1 className="text-3xl font-bold text-white mb-4">{t("onboarding.pageTitle")}</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">{t("onboarding.pageSubtitle")}</p>
        </header>
    );
}
