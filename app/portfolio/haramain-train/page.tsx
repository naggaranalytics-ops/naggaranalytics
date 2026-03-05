import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Train, Download, ImageIcon } from "lucide-react";
import { readdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function getProjectImages() {
    try {
        const dir = path.join(process.cwd(), "public/projects/haramain-train");
        const files = await readdir(dir);
        return files
            .filter((f) => /\.(jpe?g|png|webp|svg|gif)$/i.test(f))
            .map((f) => `/projects/haramain-train/${f}`);
    } catch {
        return [];
    }
}

export default async function HaramainTrainPage() {
    const images = await getProjectImages();

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* ── Breadcrumb ── */}
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#16a085] transition-colors mb-10">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>

                    {/* ── Header ── */}
                    <div className="mb-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#16a085] border border-[#16a085]/40 px-3 py-1 rounded-full">
                            Environmental &amp; Climate Analysis
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mt-6 mb-2 tracking-tight">
                            Haramain Train Stations
                        </h1>
                        <p className="text-2xl font-bold text-[#16a085]" dir="rtl">محطات قطار الحرمين</p>
                    </div>

                    {/* ── Confidentiality Notice ── */}
                    <div className="flex items-start gap-4 border border-[#16a085]/30 bg-[#16a085]/5 rounded-2xl p-6 mb-12">
                        <ShieldCheck className="text-[#16a085] shrink-0 mt-0.5" size={22} />
                        <div>
                            <p className="text-sm font-bold text-[#16a085] mb-1 uppercase tracking-widest">Confidentiality Notice</p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                All data shared in this case study is <span className="text-white font-semibold">mimic / simulated data</span> that
                                replicates the statistical structure of the original dataset. We uphold the highest standards of client transparency
                                and confidentiality — no real operational data is disclosed.
                            </p>
                        </div>
                    </div>

                    {/* ── Overview ── */}
                    <section className="glass-card p-10 rounded-[2rem] border border-white/5 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Train size={22} className="text-[#16a085]" />
                            <h2 className="text-xl font-bold">Project Overview</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            This project involved a comprehensive statistical analysis of climatic conditions across the Haramain high-speed railway
                            stations in the Mecca region. The study aimed to provide actionable insights to support station operations, safety
                            planning, and environmental compliance.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Key climatic variables — including temperature extremes, humidity levels, wind speed distributions, and UV exposure —
                            were analyzed across multiple stations and time periods to identify patterns, seasonal trends, and anomalies.
                        </p>
                    </section>

                    {/* ── Methods & Tools ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <section className="glass-card p-8 rounded-[2rem] border border-white/5">
                            <h2 className="text-lg font-bold mb-5">Analytical Methods</h2>
                            <ul className="space-y-3 text-sm text-slate-400">
                                {[
                                    "Descriptive statistics (mean, median, SD, percentiles)",
                                    "Seasonal trend decomposition",
                                    "Correlation & regression analysis",
                                    "Outlier detection & distribution fitting",
                                    "Comparative analysis across stations",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="text-[#16a085] mt-0.5">▹</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="glass-card p-8 rounded-[2rem] border border-white/5">
                            <h2 className="text-lg font-bold mb-5">Tools Used</h2>
                            <div className="flex flex-wrap gap-2">
                                {["SPSS", "Microsoft Excel", "R", "Data Visualization", "Statistical Reporting"].map((tool) => (
                                    <span key={tool} className="text-[11px] font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-slate-300">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Photo Gallery ── */}
                    <section className="glass-card p-10 rounded-[2rem] border border-white/5 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon size={20} className="text-[#16a085]" />
                            <h2 className="text-xl font-bold">Project Gallery</h2>
                        </div>

                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map((src, i) => (
                                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl border border-white/10 hover:border-[#16a085]/50 transition-all">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={src}
                                            alt={`Project image ${i + 1}`}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="border border-dashed border-white/10 rounded-2xl py-16 text-center">
                                <ImageIcon size={32} className="mx-auto text-slate-600 mb-3" />
                                <p className="text-slate-500 text-sm font-mono">Project photos will appear here once uploaded.</p>
                                <p className="text-slate-600 text-xs mt-1">
                                    Add images to <code className="text-slate-500">public/projects/haramain-train/</code>
                                </p>
                            </div>
                        )}
                    </section>

                    {/* ── Mimic Data Download ── */}
                    <section className="glass-card p-10 rounded-[2rem] border border-[#16a085]/20 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Download size={20} className="text-[#16a085]" />
                            <h2 className="text-xl font-bold">Download Mimic Dataset</h2>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            A simulated dataset mirroring the structure and statistical properties of the original data is available for download.
                            This allows researchers and students to explore the analysis methods used.
                        </p>
                        {/* Replace href with actual file when ready */}
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#16a085] hover:bg-[#16a085]/80 text-white font-bold rounded-xl transition-all text-sm"
                        >
                            <Download size={16} /> Download Dataset (CSV) — Coming Soon
                        </a>
                    </section>

                    {/* ── Back link ── */}
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#16a085] transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>

                </div>
            </main>

            <Footer />
        </div>
    );
}
