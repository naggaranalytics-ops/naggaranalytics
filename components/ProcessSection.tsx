export default function ProcessSection() {
    const steps = [
        {
            num: "01",
            title: "Upload Data",
            arabic: "رفع البيانات",
            desc: "Securely upload your datasets. We sign strict NDAs for every project to ensure 100% privacy.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
            )
        },
        {
            num: "02",
            title: "Sanity Check",
            arabic: "الفحص الأولي",
            desc: "We perform a free initial validation to ensure your data is clean and ready for analysis before you pay.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        },
        {
            num: "03",
            title: "Secure Payment",
            arabic: "الدفع الآمن",
            desc: "Once validated, process payment securely to officially kickstart the deep analysis phase.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
            )
        },
        {
            num: "04",
            title: "Deep Analysis",
            arabic: "التحليل العميق",
            desc: "Rigorous cleaning, hypothesis testing, and regression modeling performed by senior biostatisticians.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
            )
        },
        {
            num: "05",
            title: "10-Day Delivery",
            arabic: "التسليم",
            desc: "Receive publication-ready tables (APA style), high-res graphs, and a full methodology report.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        },
        {
            num: "06",
            title: "Success",
            arabic: "النجاح",
            desc: "You submit your thesis with confidence, supported by defensible, accurate results.",
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
                            <span>The Roadmap</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">Process</h2>
                        <h3 className="text-2xl font-arabic text-[#16a085]" dir="rtl">رحلة العمل</h3>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
                            From raw data to defensible results in 6 steps. Clear, predictable, and rigorous.
                        </p>
                    </div>

                    <div className="relative space-y-12">
                        {/* Simplified timeline for React - matching the spirit of the original */}
                        {steps.map((step, i) => (
                            <div key={i} className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                                    {step.icon}
                                </div>
                                <div className={`glass-card p-6 rounded-2xl border-l-4 border-primary flex-grow max-w-xl ${i % 2 === 0 ? 'text-left' : 'md:text-left'}`}>
                                    <span className="text-primary font-mono text-[10px] tracking-widest uppercase mb-1 block">Step {step.num}</span>
                                    <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                                    <p className="text-primary font-arabic text-xs mb-3" dir="rtl">{step.arabic}</p>
                                    <p className="text-slate-300 text-sm leading-relaxed font-light">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
