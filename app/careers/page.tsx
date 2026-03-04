import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                {/* ... content ... */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Careers
                    </h1>
                    <h2 className="text-2xl font-arabic text-[#16a085] mb-12" dir="rtl">الوظائف</h2>

                    <div className="glass-card p-12 rounded-[2rem] border-primary/20">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 ring-1 ring-inset ring-primary/20">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">No Open Positions</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            We don't have any openings right now, but we are always looking for talented biostatisticians.
                        </p>
                        <p className="text-slate-400 mb-10 font-arabic" dir="rtl">
                            لا توجد وظائف شاغرة حالياً، ولكننا نبحث دائماً عن متخصصين في الإحصاء الحيوي الموهوبين.
                        </p>

                        <a href="mailto:careers@naggaranalytics.com" className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-xl shadow-primary/20">
                            Send us your CV
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
