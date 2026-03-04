import Navbar from "@/components/Navbar";
import ParticlesScript from "@/components/ParticlesScript";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#050a10] text-white selection:bg-[#16a085]/30">
            <ParticlesScript />
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        About <span className="text-[#16a085]">Us</span>
                    </h1>
                    <h2 className="text-2xl font-arabic text-[#16a085] mb-12" dir="rtl">عن الشركة</h2>

                    <div className="glass-card p-8 md:p-12 rounded-[2rem] text-left">
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            Naggar Analytics is a leading provider of high-accuracy statistical analysis services. We specialize in helping researchers, students, and institutions turn raw data into defensible, publication-ready results.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6 font-arabic" dir="rtl">
                            نحن في نجار أناليتيكس نقدم خدمات تحليل إحصائي عالية الدقة. نتخصص في مساعدة الباحثين والطلاب والمؤسسات على تحويل البيانات الخام إلى نتائج قابلة للدفاع عنها وجاهزة للنشر.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our team of senior biostatisticians ensures that every project meets the highest standards of academic and professional rigor.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
