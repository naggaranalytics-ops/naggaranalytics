"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function ProcessSection() {
    const { t, dir } = useLanguage();

    const steps = [
        {
            num: "01",
            titleKey: "process.s1.title",
            descKey: "process.s1.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
            )
        },
        {
            num: "02",
            titleKey: "process.s2.title",
            descKey: "process.s2.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        },
        {
            num: "03",
            titleKey: "process.s3.title",
            descKey: "process.s3.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
            )
        },
        {
            num: "04",
            titleKey: "process.s4.title",
            descKey: "process.s4.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
            )
        },
        {
            num: "05",
            titleKey: "process.s5.title",
            descKey: "process.s5.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        },
        {
            num: "06",
            titleKey: "process.s6.title",
            descKey: "process.s6.desc",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
            )
        }
    ];

    return (
        <div className="content-layer relative z-10 w-full mb-20">
            <section id="process-section" className="py-20 md:py-32 overflow-hidden relative">
                <div className="container mx-auto px-4 relative max-w-5xl">

                    <div className="text-center mb-24 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#16a085]/30 bg-[#16a085]/10 text-[#16a085] text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a085] animate-pulse"></span>
                            <span>{t("process.badge")}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{t("process.title")}</h2>
                        <h3 className="text-2xl text-[#16a085]">{t("process.subtitle")}</h3>
                        <p className="mt-4 max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t("process.desc")}
                        </p>
                    </div>

                    <div className="relative space-y-12">
                        {steps.map((step, i) => (
                            <div key={i} className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16a085]/20 border border-[#16a085]/40 flex items-center justify-center text-[#16a085] shadow-lg shadow-[#16a085]/10">
                                    {step.icon}
                                </div>
                                <div className={`glass-card p-6 rounded-2xl border-l-4 border-[#16a085] flex-grow max-w-xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                    <span className="text-[#16a085] font-mono text-[10px] tracking-widest uppercase mb-1 block">{t("process.step")} {step.num}</span>
                                    <h4 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t(step.titleKey)}</h4>
                                    <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>{t(step.descKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
