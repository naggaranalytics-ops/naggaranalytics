import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";

export default function ServicesPage() {
    const services = [
        {
            title: "Statistical Consulting",
            arabic: "الاستشارات الإحصائية",
            desc: "Expert guidance on research design, methodology, and data strategy.",
            items: ["Study Design", "Sample Size Calculation", "Hypothesis Selection"]
        },
        {
            title: "Data Analysis",
            arabic: "تحليل البيانات",
            desc: "Comprehensive cleaning, processing, and advanced modeling of your data.",
            items: ["Regression Analysis", "ANOVA & T-Tests", "Survival Analysis"]
        },
        {
            title: "Publication Support",
            arabic: "دعم النشر العلمي",
            desc: "Helping you get your research ready for high-impact journals.",
            items: ["APA Formatting", "High-res Data Viz", "Methodology Reports"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Our <span className="text-[#16a085]">Services</span>
                        </h1>
                        <h2 className="text-2xl font-arabic text-[#16a085]" dir="rtl">خدماتنا</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-[#16a085]/50 transition-all hover:-translate-y-2">
                                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                                <p className="text-[#16a085] font-arabic mb-6" dir="rtl">{s.arabic}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">{s.desc}</p>

                                <ul className="space-y-3">
                                    {s.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a085]"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 glass-card rounded-[3rem] text-center border-[#16a085]/20 bg-gradient-to-br from-[#16a085]/5 to-transparent">
                        <h3 className="text-3xl font-bold mb-6">Need a custom solution?</h3>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                            We handle everything from simple surveys to complex clinical trials. Talk to us about your specific research needs.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="/contact" className="px-10 py-4 bg-[#16a085] hover:bg-[#149174] text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#16a085]/20">
                                Contact Us
                            </a>
                            <a href="/portfolio" className="px-10 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl transition-all">
                                View Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
