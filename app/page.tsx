import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import RegressionCurve from "@/components/RegressionCurve";
import BellCurve from "@/components/BellCurve";
import PricingSection from "@/components/PricingSection";
import ParticlesScript from "@/components/ParticlesScript";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

export const runtime = 'edge';

export default async function Home() {
    const { isAuthenticated } = getKindeServerSession();

    if (await isAuthenticated()) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-dark text-white selection:bg-primary/30 relative">
            {/* Background Particles/Glow - Matching the original site design */}
            <div id="global-particles-bg" className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-secondary via-dark to-dark opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
            </div>
            <ParticlesScript />

            <Navbar />

            {/* 
              =======================================================================
              HERO SECTION (Replicated exactly from old site)
              =======================================================================
            */}
            <div className="content-layer relative z-10 w-full min-h-[100dvh] flex flex-col justify-center items-center py-20 pt-32 pointer-events-none">
                <div className="px-4 flex flex-col items-center w-full max-w-6xl mx-auto text-center pointer-events-auto">

                    <h1 className="flex justify-center mb-6 drop-shadow-2xl">
                        <Image src="/logo/logo.svg" alt="Naggar Analytics" width={800} height={800} className="w-auto h-32 md:h-48 lg:h-64 object-contain" priority />
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 opacity-90">
                        <p className="text-xl md:text-2xl text-slate-300 font-mono tracking-tight">
                            Raw Data
                        </p>
                        <svg className="w-6 h-6 text-[#16a085] transform rotate-90 md:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                        <p className="text-xl md:text-2xl text-white font-mono font-bold tracking-tight">
                            Defensible Results
                        </p>
                    </div>

                    <div className="arrow-anim absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-60">
                        <p className="text-[10px] text-[#16a085] font-mono mb-2 tracking-widest text-center">SCROLL</p>
                        <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    { icon: BarChart3, title: "Deep Analysis", desc: "Rigorous cleaning and hypothesis testing by senior experts." },
                    { icon: ShieldCheck, title: "Defensible Results", desc: "Publication-ready tables and high-res graphs (APA style)." },
                    { icon: Zap, title: "10-Day Delivery", desc: "Fast, reliable, and thorough results for your research." }
                ].map((feature, i) => (
                    <LoginLink key={i} className="block group">
                        <div className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-all hover:-translate-y-2 h-full">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-inner ring-1 ring-inset ring-primary/20">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                Get Started <ArrowRight size={16} />
                            </div>
                        </div>
                    </LoginLink>
                ))}
            </div>

            {/* Restored Visual Animations */}
            <RegressionCurve />
            <BellCurve />

            {/* Process Section */}
            <ProcessSection />

            {/* Restored Pricing Section */}
            <PricingSection />

            {/* CTA / Signup Section */}
            <section className="relative py-32 px-4 z-10">
                <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 text-center rounded-[3rem] border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -ml-20 -mb-20" />

                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                        Ready to elevate your <br />
                        <span className="text-primary italic">research data?</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                        Join hundreds of researchers getting fast, accurate, and defensible statistical results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <RegisterLink className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-2 text-lg">
                            Get Started Now <ArrowRight size={20} />
                        </RegisterLink>
                    </div>

                    <p className="mt-8 text-slate-500 text-sm">
                        No credit card required to start your first request.
                    </p>
                </div>
            </section>

            <Footer />
        </div >
    );
}
