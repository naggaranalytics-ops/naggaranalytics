import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Train } from "lucide-react";

export const runtime = "edge";

const projects = [
    {
        id: "haramain-train",
        titleArabic: "محطات قطار الحرمين",
        titleEnglish: "Haramain Train Stations",
        category: "Environmental & Climate Analysis",
        categoryArabic: "تحليل بيئي ومناخي",
        description:
            "A comprehensive statistical analysis of climatic conditions across Haramain high-speed railway stations in Mecca. The study examined temperature, humidity, wind patterns, and other environmental variables to support operational and safety decisions.",
        tags: ["Climate Analysis", "Descriptive Statistics", "Geospatial Data", "SPSS"],
        status: "Completed",
        slug: "/portfolio/haramain-train",
        hasDetail: true,
    },
    // ── Add future projects here ──
];

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* ── Header ── */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            Our <span className="text-[#16a085]">Portfolio</span>
                        </h1>
                        <p className="text-2xl font-bold text-[#16a085] mb-6" dir="rtl">أعمالنا</p>
                        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                            Real projects. Real insights. Every case study below reflects genuine analysis delivered to our clients.
                        </p>
                    </div>

                    {/* ── Confidentiality Notice ── */}
                    <div className="mb-14 flex items-start gap-4 border border-[#16a085]/30 bg-[#16a085]/5 rounded-2xl p-6">
                        <ShieldCheck className="text-[#16a085] shrink-0 mt-0.5" size={22} />
                        <div>
                            <p className="text-sm font-bold text-[#16a085] mb-1 uppercase tracking-widest">Confidentiality Notice</p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                All data shared in this portfolio is <span className="text-white font-semibold">mimic / simulated data</span> that
                                replicates the structure and statistical properties of the original datasets. We maintain the highest standards of
                                client confidentiality. No real client data is disclosed.
                            </p>
                        </div>
                    </div>

                    {/* ── Project Cards ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-[#16a085]/50 transition-all hover:-translate-y-1 group flex flex-col justify-between"
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
                                    <p className="text-[#16a085] font-bold text-right text-lg mb-1" dir="rtl">{p.titleArabic}</p>
                                    <h2 className="text-xl font-black mb-4 tracking-tight">{p.titleEnglish}</h2>
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
                                    <Link
                                        href={p.slug}
                                        className="mt-8 flex items-center gap-2 text-[#16a085] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        View Full Case Study <ArrowRight size={16} />
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* ── "More Coming Soon" placeholder card ── */}
                        <div className="glass-card p-8 rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-50 min-h-[280px]">
                            <p className="text-slate-500 text-sm font-mono">More projects coming soon…</p>
                            <p className="text-slate-600 text-xs mt-2">قريباً</p>
                        </div>
                    </div>

                    {/* ── Bottom CTA ── */}
                    <div className="mt-20 glass-card p-12 rounded-[3rem] text-center border border-white/5">
                        <h3 className="text-2xl font-bold mb-4">Have a project in mind?</h3>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
                            We'd love to discuss how we can turn your raw data into defensible, publication-ready results.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 border border-[#16a085] text-[#16a085] hover:bg-[#16a085] hover:text-white rounded-xl transition-all font-bold"
                        >
                            Get In Touch
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
