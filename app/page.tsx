import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default async function Home() {
    const { isAuthenticated } = getKindeServerSession();

    if (await isAuthenticated()) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-dark text-white selection:bg-primary/30 relative">
            {/* Background Particles/Glow - Matching the original site design */}
            <div id="global-particles-bg" className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-secondary via-dark to-dark opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
            </div>

            {/* Header / Nav Section */}
            <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto backdrop-blur-md bg-dark/70 border-b border-white/5">
                <div className="text-2xl font-bold tracking-tighter">
                    NAGGAR<span className="text-primary">ANALYTICS</span>
                </div>
                <div className="flex items-center gap-6">
                    <LoginLink className="text-sm font-medium hover:text-primary transition-colors">Sign In</LoginLink>
                    <RegisterLink className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-all">
                        Register
                    </RegisterLink>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 px-4 overflow-hidden min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-mono tracking-[0.2em] uppercase mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Advanced Analytics
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        NAGGAR ANALYTICS
                    </h1>

                    <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light mb-12">
                        Professional high-accuracy statistical analysis and consulting for researchers, students, and institutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <LoginLink className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
                            Get Started <ArrowRight size={20} />
                        </LoginLink>
                        <RegisterLink className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
                            Create Account
                        </RegisterLink>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: BarChart3, title: "Deep Analysis", desc: "Rigorous cleaning and hypothesis testing by senior experts." },
                        { icon: ShieldCheck, title: "Defensible Results", desc: "Publication-ready tables and high-res graphs (APA style)." },
                        { icon: Zap, title: "10-Day Delivery", desc: "Fast, reliable, and thorough results for your research." }
                    ].map((feature, i) => (
                        <LoginLink key={i} className="block group">
                            <div className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-all hover:-translate-y-2 h-full">
                                <feature.icon size={32} className="text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                                <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Get Started <ArrowRight size={16} />
                                </div>
                            </div>
                        </LoginLink>
                    ))}
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-xs font-mono">
                &copy; 2026 Naggar Analytics. All rights reserved.
            </footer>
        </div >
    );
}
