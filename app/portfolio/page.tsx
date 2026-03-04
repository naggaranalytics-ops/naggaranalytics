import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
    const projects = [
        {
            title: "Health Metrics Analysis",
            client: "Medical Research Center",
            desc: "Comprehensive statistical analysis of patient data for a major health study.",
            arabic: "تحليل المقاييس الصحية"
        },
        {
            title: "Financial Risk Modeling",
            client: "Investment Firm",
            desc: "Regression models to predict market volatility and potential risks.",
            arabic: "نمذجة المخاطر المالية"
        },
        {
            title: "Educational Outcome Study",
            client: "University Dept",
            desc: "Analyzing the impact of digital tools on student performance over 3 years.",
            arabic: "دراسة المخرجات التعليمية"
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
                            Our <span className="text-[#16a085]">Portfolio</span>
                        </h1>
                        <h2 className="text-2xl font-arabic text-[#16a085]" dir="rtl">أعمالنا</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <div key={i} className="glass-card p-8 rounded-[2rem] hover:border-[#16a085]/50 transition-all hover:-translate-y-2 group">
                                <div className="text-[#16a085] font-arabic text-right mb-4 opacity-70" dir="rtl">{p.arabic}</div>
                                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                                <p className="text-primary text-xs font-mono mb-4 uppercase tracking-widest">{p.client}</p>
                                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>

                                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all">
                                    View Case Study <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 glass-card p-12 rounded-[3rem] text-center border-white/5">
                        <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                            We have completed over 500+ statistical projects for clients globally. Contact us for specific case studies in your field.
                        </p>
                        <a href="/contact" className="inline-block px-10 py-4 border border-[#16a085] text-[#16a085] hover:bg-[#16a085] hover:text-white rounded-xl transition-all font-bold">
                            View More Projects
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
