import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Contact <span className="text-[#16a085]">Us</span>
                        </h1>
                        <h2 className="text-2xl font-arabic text-[#16a085]" dir="rtl">تواصل معنا</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="glass-card p-8 rounded-3xl">
                                <h3 className="text-xl font-bold mb-4">Inquiry details</h3>
                                <p className="text-slate-400 text-sm mb-6">
                                    Have a project in mind? Let's discuss how we can help you with your data.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <span>contact@naggaranalytics.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <span>London, United Kingdom</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-[2.5rem] border-primary/10">
                            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                            <p className="text-slate-400 mb-8">
                                For the fastest service, please log in and open a new request directly in your dashboard.
                            </p>
                            <a href="/dashboard" className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary/20">
                                Open Dashboard <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
