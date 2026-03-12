"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleLink from "@/components/LocaleLink";
import { ArrowLeft, ArrowRight, ShieldCheck, Train, Download, ImageIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";

export default function HaramainTrainPage() {
    const { t, dir } = useLanguage();

    const ArrowBack = dir === 'rtl' ? ArrowRight : ArrowLeft;

    const methods = [
        "Descriptive statistics (mean, median, SD, percentiles)",
        "Seasonal trend decomposition",
        "Correlation & regression analysis",
        "Outlier detection & distribution fitting",
        "Comparative analysis across stations",
    ];

    const tools = ["SPSS", "Microsoft Excel", "R", "Data Visualization", "Statistical Reporting"];

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30" dir={dir}>
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* ── Breadcrumb ── */}
                    <LocaleLink href="/portfolio" className={`inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#16a085] transition-colors mb-10 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <ArrowBack size={16} /> {t("haramain.backToPortfolio")}
                    </LocaleLink>

                    {/* ── Header ── */}
                    <div className="mb-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#16a085] border border-[#16a085]/40 px-3 py-1 rounded-full">
                            {t("portfolioPage.haramain.category")}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mt-6 mb-2 tracking-tight">
                            {t("portfolioPage.haramain.title")}
                        </h1>
                    </div>

                    {/* ── Confidentiality Notice ── */}
                    <div className={`flex items-start gap-4 border border-[#16a085]/30 bg-[#16a085]/5 rounded-2xl p-6 mb-12 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                        <ShieldCheck className="text-[#16a085] shrink-0 mt-0.5" size={22} />
                        <div>
                            <p className="text-sm font-bold text-[#16a085] mb-1 uppercase tracking-widest">{t("haramain.confidentialTitle")}</p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {t("haramain.confidentialDesc").replace(/<\/?strong>/g, '')}
                            </p>
                        </div>
                    </div>

                    {/* ── Overview ── */}
                    <section className="glass-card p-10 rounded-[2rem] border border-white/5 mb-8">
                        <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <Train size={22} className="text-[#16a085]" />
                            <h2 className="text-xl font-bold">{t("haramain.overview")}</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            {t("haramain.overviewP1")}
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            {t("haramain.overviewP2")}
                        </p>
                    </section>

                    {/* ── Methods & Tools ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <section className="glass-card p-8 rounded-[2rem] border border-white/5">
                            <h2 className="text-lg font-bold mb-5">{t("haramain.methods")}</h2>
                            <ul className="space-y-3 text-sm text-slate-400">
                                {methods.map((item) => (
                                    <li key={item} className={`flex items-start gap-2 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                                        <span className="text-[#16a085] mt-0.5">▹</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="glass-card p-8 rounded-[2rem] border border-white/5">
                            <h2 className="text-lg font-bold mb-5">{t("haramain.tools")}</h2>
                            <div className="flex flex-wrap gap-2">
                                {tools.map((tool) => (
                                    <span key={tool} className="text-[11px] font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-slate-300">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Mimic Data Download ── */}
                    <section className="glass-card p-10 rounded-[2rem] border border-[#16a085]/20 mb-8">
                        <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <Download size={20} className="text-[#16a085]" />
                            <h2 className="text-xl font-bold">{t("haramain.downloadTitle")}</h2>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {t("haramain.downloadDesc")}
                        </p>
                        <a
                            href="#"
                            className={`inline-flex items-center gap-2 px-8 py-3 bg-[#16a085] hover:bg-[#16a085]/80 text-white font-bold rounded-xl transition-all text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                        >
                            <Download size={16} /> {t("haramain.downloadBtn")}
                        </a>
                    </section>

                    {/* ── Back link ── */}
                    <LocaleLink href="/portfolio" className={`inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#16a085] transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <ArrowBack size={16} /> {t("haramain.backToPortfolio")}
                    </LocaleLink>

                </div>
            </main>

            <Footer />
        </div>
    );
}
