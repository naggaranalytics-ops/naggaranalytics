import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";

export default function FAQPage() {
    const faqs = [
        {
            q: "How long does the analysis take?",
            qa: "كم يستغرق التحليل؟",
            a: "Standard analysis projects are delivered within 10 business days."
        },
        {
            q: "Do you sign NDAs?",
            qa: "هل توقعون اتفاقيات عدم الإفصاح؟",
            a: "Yes, we prioritize data privacy and sign strict NDAs for every project."
        },
        {
            q: "Which citation styles do you support?",
            qa: "ما هي أنماط الاستشهاد التي تدعمونها؟",
            a: "We primary support APA, but can adapt to Vancouver, MLA, or Harvard styles."
        },
        {
            q: "What statistical software do you use?",
            qa: "ما هي البرامج الإحصائية التي تستخدمونها؟",
            a: "We use SPSS, R, STATA, and Python depending on the project requirements."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            FAQ<span className="text-[#16a085]">s</span>
                        </h1>
                        <h2 className="text-2xl font-arabic text-[#16a085]" dir="rtl">الأسئلة الشائعة</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group glass-card rounded-2xl border-white/5 overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <div className="text-left">
                                        <h4 className="font-bold text-lg">{faq.q}</h4>
                                        <p className="text-[#16a085] text-sm font-arabic" dir="rtl">{faq.qa}</p>
                                    </div>
                                    <span className="transition-transform duration-300 group-open:rotate-180">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-400 border-t border-white/5 bg-white/5">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
