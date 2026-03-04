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


            {/* Restored Visual Animations */}
            <RegressionCurve />
            <BellCurve />

            {/* Process Section */}
            <ProcessSection />

            {/* Restored Pricing Section */}
            <PricingSection />


            <Footer />
        </div >
    );
}
