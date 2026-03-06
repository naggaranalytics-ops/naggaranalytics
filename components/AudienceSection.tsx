"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { CheckCircle, Briefcase, User, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AudienceSection() {
    const { t, dir } = useLanguage();

    return (
        <section className="py-24 relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-4">
                <div className={`grid md:grid-cols-2 gap-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>

                    {/* Persons Card */}
                    <div className="glass-card bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-10 rounded-3xl border border-[var(--glass-border)] transition-all group">
                        <div className={`flex items-center gap-4 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 rounded-2xl bg-[#16a085]/10 flex items-center justify-center shrink-0">
                                <User size={28} className="text-[#16a085]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                                {t("audience.persons.title")}
                            </h3>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[1, 2, 3].map((num) => (
                                <li key={num} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                                    <CheckCircle size={20} className="text-[#16a085] shrink-0 mt-0.5" />
                                    <span className="text-[var(--text-secondary)]">{t(`audience.persons.item${num}`)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className={`flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                            <Link href="/dashboard/new" className={`flex items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                                <span>{t("audience.persons.cta")}</span>
                                {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                            </Link>
                        </div>
                    </div>

                    {/* Business Card */}
                    <div className="glass-card bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-10 rounded-3xl border border-[var(--glass-border)] transition-all group">
                        <div className={`flex items-center gap-4 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center shrink-0">
                                <Briefcase size={28} className="text-[#0ea5e9]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                                {t("audience.business.title")}
                            </h3>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[1, 2, 3].map((num) => (
                                <li key={num} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                                    <CheckCircle size={20} className="text-[#0ea5e9] shrink-0 mt-0.5" />
                                    <span className="text-[var(--text-secondary)]">{t(`audience.business.item${num}`)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className={`flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                            <a href="https://wa.me/966573657207" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 bg-transparent border-2 border-[#0ea5e9] hover:bg-[#0ea5e9]/10 text-[#0ea5e9] font-bold py-3 px-8 rounded-xl transition-all ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                                <span>{t("audience.business.cta")}</span>
                                {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
