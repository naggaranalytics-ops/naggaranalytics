"use client";

import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, ArrowLeft, ShieldCheck, Train } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";

export default function PortfolioPage() {
    const { t, dir, lang } = useLanguage();

    const projects = [
        {
            id: "haramain-train",
            title: t("portfolioPage.haramain.title"),
            category: t("portfolioPage.haramain.category"),
            description: t("portfolioPage.haramain.desc"),
            tags: ["Climate Analysis", "Descriptive Statistics", "Geospatial Data", "SPSS"],
            slug: "/portfolio/haramain-train",
            hasDetail: true,
        },
    ];

    const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30" dir={dir}>
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* ── Header ── */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            {t("portfolioPage.title")} <span className="text-[#16a085]">{t("portfolioPage.titleHighlight")}</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                            {t("portfolioPage.desc")}
                        </p>
                    </div>

                    {/* ── Confidentiality Notice ── */}
                    <div className={`mb-14 flex items-start gap-4 border border-[#16a085]/30 bg-[#16a085]/5 rounded-2xl p-6 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                        <ShieldCheck className="text-[#16a085] shrink-0 mt-0.5" size={22} />
                        <div>
                            <p className="text-sm font-bold text-[#16a085] mb-1 uppercase tracking-widest">{t("portfolioPage.confidentialTitle")}</p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {t("portfolioPage.confidentialDesc").replace(/<\/?strong>/g, '')}
                            </p>
                        </div>
                    </div>

                    {/* ── Project Cards ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                className={`glass-card p-8 rounded-[2rem] border border-white/5 hover:border-[#16a085]/50 transition-all hover:-translate-y-1 group flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : ''}`}
                            >
                                <div>
                                    {/* Icon + category */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#16a085] border border-[#16a085]/40 px-3 py-1 rounded-full">
                                            {p.category}
                                        </span>
                                        <Train size={20} className="text-[#16a085] opacity-60" />
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-black mb-4 tracking-tight">{p.title}</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {p.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1 text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                {p.hasDetail && (
                                    <LocaleLink
                                        href={p.slug}
                                        className={`mt-8 flex items-center gap-2 text-[#16a085] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                                    >
                                        {t("portfolioPage.viewCase")} <ArrowIcon size={16} />
                                    </LocaleLink>
                                )}
                            </div>
                        ))}

                        {/* ── "More Coming Soon" placeholder card ── */}
                        <div className="glass-card p-8 rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-50 min-h-[280px]">
                            <p className="text-slate-500 text-sm font-mono">{t("portfolioPage.comingSoon")}</p>
                        </div>
                    </div>

                    {/* ── Bottom CTA ── */}
                    <div className="mt-20 glass-card p-12 rounded-[3rem] text-center border border-white/5">
                        <h3 className="text-2xl font-bold mb-4">{t("portfolioPage.ctaTitle")}</h3>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
                            {t("portfolioPage.ctaDesc")}
                        </p>
                        <LocaleLink
                            href="/contact"
                            className="inline-block px-10 py-4 border border-[#16a085] text-[#16a085] hover:bg-[#16a085] hover:text-white rounded-xl transition-all font-bold"
                        >
                            {t("portfolioPage.ctaButton")}
                        </LocaleLink>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
