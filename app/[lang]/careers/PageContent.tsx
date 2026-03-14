"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { Briefcase, Globe, ChevronDown, ChevronUp, Upload } from "lucide-react";

// ── Job definitions ──────────────────────────────────────────────────────────
const jobs = [
    {
        id: "junior",
        title: "Junior Data Analyst",
        level: "Junior",
        type: "Full-time · Remote",
        badge: "Now Hiring",
        description: `We are looking for a motivated Junior Data Analyst to join the Naggar Analytics team. In this role, you will work alongside senior analysts to support data collection, cleaning, statistical analysis, and reporting for our clients — which include researchers, academics, and institutions across the region.`,
        responsibilities: [
            "Assist in the design and execution of statistical analyses using tools such as SPSS, R, or Python",
            "Clean, organize, and validate datasets submitted by clients",
            "Produce clear, well-structured reports and visualizations of analytical findings",
            "Support the preparation of publication-ready tables and charts",
            "Collaborate with senior analysts to review and interpret results",
            "Maintain strict confidentiality of all client data and project materials",
        ],
        requirements: [
            "Bachelor's degree in Statistics, Data Science, Mathematics, or a related field",
            "Familiarity with at least one statistical software (SPSS, R, or Python)",
            "Strong attention to detail and willingness to learn",
            "Good written and verbal communication skills (Arabic & English)",
            "Ability to work independently in a remote environment",
        ],
        niceToHave: [
            "Experience with academic or research data",
            "Knowledge of biostatistics or health data analysis",
            "Familiarity with data visualization tools (Power BI, Tableau, ggplot2)",
        ],
    },
    {
        id: "senior",
        title: "Senior Data Analyst",
        level: "Senior",
        type: "Full-time · Remote",
        badge: "Now Hiring",
        description: `We are seeking an experienced Senior Data Analyst to take ownership of complex, multi-layered statistical projects at Naggar Analytics. You will be the primary analytical lead for high-stakes client work, mentoring junior team members and ensuring the quality, accuracy, and academic rigor of all deliverables.`,
        responsibilities: [
            "Lead end-to-end statistical analyses for research, academic, and institutional clients",
            "Design appropriate methodologies (regression, ANOVA, survival analysis, etc.) based on study objectives",
            "Oversee data quality assurance and validation processes",
            "Produce and review publication-ready reports, tables, and figures meeting journal standards",
            "Mentor and guide junior analysts on best practices and analytical techniques",
            "Communicate complex statistical results clearly to non-technical clients",
            "Uphold and enforce data confidentiality and analytical integrity standards",
        ],
        requirements: [
            "Bachelor's or Master's degree in Statistics, Biostatistics, Data Science, or a related field",
            "3+ years of hands-on experience in statistical analysis",
            "Proficiency in SPSS, R, Python, or equivalent tools",
            "Proven track record of handling research or academic data projects",
            "Strong written and verbal communication skills in Arabic and English",
            "Ability to manage multiple projects concurrently in a remote setting",
        ],
        niceToHave: [
            "Experience with health, clinical, or social science data",
            "Knowledge of machine learning techniques for data analysis",
            "Prior experience in a consulting or client-facing analytical role",
            "Published research or co-authored academic papers",
        ],
    },
];

// ── Application Form ─────────────────────────────────────────────────────────
function ApplicationForm({ jobTitle }: { jobTitle: string }) {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "", email: "", whatsapp: "", why: "", cv: null as File | null,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, cv: e.target.files?.[0] ?? null });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    job_title: jobTitle,
                    full_name: form.name,
                    email: form.email,
                    whatsapp: form.whatsapp,
                    why_join: form.why,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Something went wrong. Please try again.");
            } else {
                setSubmitted(true);
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <div className="mt-8 text-center py-10 border border-[#16a085]/30 bg-[#16a085]/5 rounded-2xl">
                <p className="text-[#16a085] font-bold text-lg mb-2">Application Submitted! 🎉</p>
                <p className="text-slate-400 text-sm">Thank you for applying. We&apos;ll be in touch soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-xs font-mono uppercase tracking-widest text-[#16a085] mb-4">Apply for: {jobTitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                    <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">Full Name *</label>
                    <input
                        name="name" required value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085]/60 transition-colors"
                    />
                </div>
                {/* Email */}
                <div>
                    <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">Email Address *</label>
                    <input
                        name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085]/60 transition-colors"
                    />
                </div>
            </div>

            {/* WhatsApp */}
            <div>
                <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">WhatsApp Number *</label>
                <input
                    name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange}
                    placeholder="+966 5XX XXX XXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085]/60 transition-colors"
                />
            </div>

            {/* CV Upload */}
            <div>
                <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">Upload CV *</label>
                <label className="flex items-center gap-3 w-full bg-white/5 border border-white/10 hover:border-[#16a085]/40 rounded-xl px-4 py-3 cursor-pointer transition-colors group">
                    <Upload size={16} className="text-slate-500 group-hover:text-[#16a085] transition-colors shrink-0" />
                    <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors truncate">
                        {form.cv ? form.cv.name : "Choose PDF or DOCX (max 5 MB)"}
                    </span>
                    <input
                        type="file" accept=".pdf,.doc,.docx" required onChange={handleFile}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Why join */}
            <div>
                <label className="block text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest">Why do you want to join Naggar Analytics? *</label>
                <textarea
                    name="why" required value={form.why} onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what motivates you to join our team and how you can contribute..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085]/60 transition-colors resize-none"
                />
            </div>

            {error && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>
            )}
            <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#16a085] hover:bg-[#16a085]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all text-sm tracking-wide"
            >
                {submitting ? "Submitting…" : "Submit Application"}
            </button>
        </form>
    );
}

// ── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job }: { job: typeof jobs[0] }) {
    const [open, setOpen] = useState(false);
    const [applying, setApplying] = useState(false);

    return (
        <div className="glass-card rounded-[2rem] border border-white/5 hover:border-[#16a085]/30 transition-all overflow-hidden">
            {/* Header row */}
            <div className="p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#16a085]/10 flex items-center justify-center shrink-0">
                            <Briefcase size={20} className="text-[#16a085]" />
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#16a085] border border-[#16a085]/40 px-2 py-0.5 rounded-full mr-2">
                                {job.badge}
                            </span>
                            <h2 className="text-xl font-black mt-2 tracking-tight">{job.title}</h2>
                            <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs font-mono">
                                <Globe size={12} />
                                <span>{job.type}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => { setOpen(!open); setApplying(false); }}
                        className="flex items-center gap-2 text-sm text-[#16a085] font-bold border border-[#16a085]/40 px-4 py-2 rounded-xl hover:bg-[#16a085]/10 transition-all shrink-0"
                    >
                        {open ? "Hide Details" : "View Details"}
                        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mt-5">{job.description}</p>
            </div>

            {/* Expanded details */}
            {open && (
                <div className="border-t border-white/5 px-8 pb-8 pt-6 space-y-7">
                    {/* Responsibilities */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Key Responsibilities</h3>
                        <ul className="space-y-2">
                            {job.responsibilities.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-slate-400">
                                    <span className="text-[#16a085] mt-0.5 shrink-0">▹</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Requirements</h3>
                        <ul className="space-y-2">
                            {job.requirements.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-slate-400">
                                    <span className="text-[#16a085] mt-0.5 shrink-0">▹</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nice to Have */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Nice to Have</h3>
                        <ul className="space-y-2">
                            {job.niceToHave.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-slate-500">
                                    <span className="text-slate-600 mt-0.5 shrink-0">◦</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Apply toggle */}
                    {!applying ? (
                        <button
                            onClick={() => setApplying(true)}
                            className="mt-4 px-8 py-3 bg-[#16a085] hover:bg-[#16a085]/80 text-white font-bold rounded-xl transition-all text-sm"
                        >
                            Apply Now
                        </button>
                    ) : (
                        <ApplicationForm jobTitle={job.title} />
                    )}
                </div>
            )}
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            Join Our <span className="text-[#16a085]">Team</span>
                        </h1>
                        {lang === 'ar' && <p className="text-2xl font-bold text-[#16a085] mb-6" dir="rtl">انضم إلينا</p>}
                        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                            We&apos;re building a team of passionate data professionals committed to delivering rigorous,
                            high-quality statistical analysis. All roles are fully remote.
                        </p>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
