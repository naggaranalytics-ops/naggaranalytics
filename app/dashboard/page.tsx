import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-8 border-b border-white/5 pb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-arabic text-white mb-2" dir="rtl">مرحباً بك، {user?.given_name || "الباحث"}</h1>
                    <p className="text-slate-400 font-arabic" dir="rtl">نحن هنا لمساعدتك في إنجاز تحليلك الإحصائي بدقة واحترافية.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Projects */}
                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card rounded-2xl p-8 border border-white/5 bg-[#111821]/50">
                        <h2 className="text-2xl font-bold font-arabic text-[#16a085] mb-6 flex items-center justify-between" dir="rtl">
                            <span>مشاريعك الحالية</span>
                            <span className="text-xs bg-[#16a085]/10 text-[#16a085] px-3 py-1 rounded-full border border-[#16a085]/20">0 مشروع</span>
                        </h2>

                        <div className="text-center py-12">
                            <p className="text-slate-400 mb-6 font-arabic" dir="rtl">لا يوجد لديك مشاريع حالية. ابدأ أول مشروع لك الآن لبدء رحلة التحليل الإحصائي.</p>
                            <button className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic">
                                تقديم مشروع جديد
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Quick Links & Resources */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-8 border border-white/5 bg-[#111821]/50">
                        <h3 className="text-xl font-bold font-arabic text-white mb-4" dir="rtl">المكتبة الرقمية</h3>
                        <p className="text-sm text-slate-400 mb-4 font-arabic" dir="rtl">دورات تدريبية ومواد علمية مجانية (قريباً!)</p>
                        <div className="h-32 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex items-center justify-center">
                            <span className="text-slate-500 font-bold tracking-widest text-xs uppercase">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
