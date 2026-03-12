"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageProvider";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen selection:bg-[#16a085]/30" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
                        {t("about.title")} <span className="text-[#16a085]">{t("about.titleHighlight")}</span>
                    </h1>

                    <div className="glass-card p-8 md:p-12 rounded-[2rem] text-left">
                        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                            {t("about.p1")}
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t("about.p2")}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
