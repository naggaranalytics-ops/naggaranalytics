"use client";

import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageProvider";

export default function ServicesPage() {
    const { t, dir } = useLanguage();

    const services = [
        {
            titleKey: "services.s1.title",
            descKey: "services.s1.desc",
            items: ["services.s1.item1", "services.s1.item2", "services.s1.item3"]
        },
        {
            titleKey: "services.s2.title",
            descKey: "services.s2.desc",
            items: ["services.s2.item1", "services.s2.item2", "services.s2.item3"]
        },
        {
            titleKey: "services.s3.title",
            descKey: "services.s3.desc",
            items: ["services.s3.item1", "services.s3.item2", "services.s3.item3"]
        }
    ];

    return (
        <div className="min-h-screen text-white selection:bg-[#16a085]/30" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            {t("services.title")} <span className="text-[#16a085]">{t("services.titleHighlight")}</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-[#16a085]/50 transition-all hover:-translate-y-2">
                                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t(s.titleKey)}</h3>
                                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{t(s.descKey)}</p>

                                <ul className="space-y-3">
                                    {s.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a085]"></span>
                                            {t(item)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 glass-card rounded-[3rem] text-center border-[#16a085]/20 bg-gradient-to-br from-[#16a085]/5 to-transparent">
                        <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{t("services.custom.title")}</h3>
                        <p className="mb-10 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t("services.custom.desc")}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="/contact" className="px-10 py-4 bg-[#16a085] hover:bg-[#149174] text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#16a085]/20">
                                {t("services.custom.cta")}
                            </a>
                            <a href="/portfolio" className="px-10 py-4 border font-bold rounded-2xl transition-all hover:bg-[var(--input-bg)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                {t("services.custom.portfolio")}
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
