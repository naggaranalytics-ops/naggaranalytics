"use client";

import { useLanguage } from "@/context/LanguageProvider";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function HomePortfolio() {
    const { t, dir, lang } = useLanguage();

    const projects = [
        {
            id: 'haramain-train',
            tag: t('portfolioPage.haramain.category'),
            title: t('portfolioPage.haramain.title'),
            desc: t('portfolioPage.haramain.desc'),
            link: '/portfolio/haramain-train'
        },
        {
            id: 'psoriasis',
            tag: t('portfolioPage.psoriasis.category'),
            title: t('portfolioPage.psoriasis.title'),
            desc: t('portfolioPage.psoriasis.desc'),
            link: '/portfolio'
        },
        {
            id: 'vitamin-d',
            tag: t('portfolioPage.vitaminD.category'),
            title: t('portfolioPage.vitaminD.title'),
            desc: t('portfolioPage.vitaminD.desc'),
            link: '/portfolio'
        }
    ];

    return (
        <section className="py-24 relative z-10 w-full" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className={`flex items-end justify-between mb-12 ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {t("portfolio.title")} <span className="text-[#16a085]">{t("portfolio.titleHighlight")}</span>
                        </h2>
                    </div>
                    <LocaleLink href="/portfolio" className={`hidden md:flex items-center gap-2 text-[#16a085] hover:underline font-bold ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        {t("portfolio.viewAll")}
                        {dir === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </LocaleLink>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {projects.map((item) => (
                        <LocaleLink key={item.id} href={item.link} className="block group">
                            <div className="glass-card bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] rounded-3xl overflow-hidden border border-[var(--glass-border)] transition-all h-full flex flex-col hover:-translate-y-2">
                                <div className="h-48 bg-[#111821] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#16a085]/20 to-[#0ea5e9]/20" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-700">
                                        {/* Abstract background shape for visual interest */}
                                        <div className="w-32 h-32 rounded-full border-4 border-[#16a085]/40 border-dashed animate-[spin_20s_linear_infinite]" />
                                    </div>
                                    <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'}`}>
                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-white shadow-lg">
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[#16a085] transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <div className={`mt-auto flex items-center gap-2 text-[#16a085] font-bold text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                                        {t("portfolio.readMore")}
                                        {dir === 'rtl' ? <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                                    </div>
                                </div>
                            </div>
                        </LocaleLink>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <LocaleLink href="/portfolio" className="inline-flex items-center gap-2 bg-[#16a085]/10 text-[#16a085] px-6 py-3 rounded-xl font-bold border border-[#16a085]/20 hover:bg-[#16a085]/20 transition-all">
                        {t("portfolio.viewAll")}
                    </LocaleLink>
                </div>
            </div>
        </section>
    );
}
