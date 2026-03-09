"use client";

import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageProvider";

export default function FAQPage() {
    const { t } = useLanguage();

    const faqs = [
        { qKey: "faq.q1", aKey: "faq.a1" },
        { qKey: "faq.q2", aKey: "faq.a2" },
        { qKey: "faq.q3", aKey: "faq.a3" },
        { qKey: "faq.q4", aKey: "faq.a4" },
    ];

    return (
        <div className="min-h-screen selection:bg-[#16a085]/30" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            {t("faq.title")}<span className="text-[#16a085]">{t("faq.titleHighlight")}</span>
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group glass-card rounded-2xl overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <div className="text-left">
                                        <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{t(faq.qKey)}</h4>
                                    </div>
                                    <span className="transition-transform duration-300 group-open:rotate-180" style={{ color: 'var(--text-secondary)' }}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                                    {t(faq.aKey)}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
