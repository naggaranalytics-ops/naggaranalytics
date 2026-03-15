import LocaleLink from "@/components/LocaleLink";

export default function PricingSection() {
    return (
        <div className="content-layer relative z-10 w-full mb-20">
            <section className="py-24 flex flex-col items-center justify-center relative">

                <div className="text-center mb-16 px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        <span>Transparent Pricing</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">Simple Pricing</h2>
                    <h3 className="text-2xl md:text-3xl text-[#16a085] font-arabic" dir="rtl">الباقات الإحصائية</h3>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light">No hidden fees, no surprises.</p>
                </div>

                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10 items-stretch">

                    {/* Basic Plan */}
                    <div className="h-full">
                        <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#16a085]/50 transition-all duration-300">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-white font-bold text-xl font-arabic">باقة التأسيس</div>
                                <span className="font-mono text-[10px] border border-slate-600 text-slate-400 px-2 py-1 rounded">BASIC</span>
                            </div>
                            <h4 className="text-left text-[#16a085] text-4xl font-bold mb-6">$249</h4>
                            <div className="h-px bg-white/10 w-full mb-6"></div>
                            <ul className="text-slate-400 space-y-4 mb-8 flex-grow text-sm text-right font-arabic" dir="rtl">
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2">✓</span> تصميم منهجية الدراسة</li>
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2">✓</span> حساب حجم العينة</li>
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2">✓</span> تنسيق وبرمجة الاستبيان</li>
                                <li className="flex items-center justify-start opacity-40"><span className="text-slate-600 ml-2">✕</span> تحليل الانحدار</li>
                            </ul>
                            <LocaleLink href="/login" className="w-full block text-center py-3 border border-[#16a085] text-[#16a085] hover:bg-[#16a085] hover:text-white rounded-xl transition-all font-semibold mt-auto font-arabic">اطلب الآن</LocaleLink>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="h-full md:-mt-8 md:mb-8 relative z-10 transform md:scale-105">
                        <div className="glass-card bg-[#111821] rounded-2xl p-8 flex flex-col relative h-full border-[#16a085]/50 shadow-2xl shadow-[#16a085]/10">
                            <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                                <span className="bg-[#16a085] text-white text-[10px] px-4 py-1 rounded-full font-bold font-mono tracking-widest shadow-lg uppercase">Most Popular</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#16a085]/5 to-transparent rounded-2xl pointer-events-none"></div>
                            <div className="flex justify-between items-start mb-2 mt-2 relative z-10">
                                <div className="text-white font-bold text-2xl font-arabic">التحليل المتقدم</div>
                                <span className="text-[#16a085] font-mono text-[10px] border border-[#16a085] px-2 py-1 rounded">PRO</span>
                            </div>
                            <h4 className="text-left text-[#16a085] text-5xl font-bold mb-6 relative z-10">$499</h4>
                            <div className="h-px bg-[#16a085] w-full mb-6 opacity-30 relative z-10"></div>
                            <ul className="text-slate-200 space-y-4 mb-8 flex-grow text-sm text-right font-medium relative z-10 font-arabic" dir="rtl">
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2 bg-[#16a085]/10 p-1 rounded-full text-xs">✓</span> جميع محتويات التأسيس</li>
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2 bg-[#16a085]/10 p-1 rounded-full text-xs">✓</span> التحليل الوصفي والاستدلالي</li>
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2 bg-[#16a085]/10 p-1 rounded-full text-xs">✓</span> الجداول والرسومات البيانية</li>
                                <li className="flex items-center justify-start"><span className="text-[#16a085] ml-2 bg-[#16a085]/10 p-1 rounded-full text-xs">✓</span> تحليل الانحدار واختبار الفرضيات</li>
                            </ul>
                            <LocaleLink href="/login" className="w-full block text-center py-4 bg-[#16a085] text-white hover:bg-[#149174] rounded-xl transition-all font-bold shadow-lg shadow-black/50 hover:shadow-black/70 mt-auto relative z-10 font-arabic">اطلب الآن</LocaleLink>
                        </div>
                    </div>

                    {/* Custom Plan */}
                    <div className="h-full">
                        <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-slate-500 transition-all duration-300">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-white font-bold text-xl font-arabic">باقة مخصصة</div>
                                <span className="text-slate-400 font-mono text-[10px] border border-slate-600 px-2 py-1 rounded">CUSTOM</span>
                            </div>
                            <div className="text-left text-slate-400 text-sm mb-6 mt-1 font-arabic">الجهات والمراكز</div>
                            <div className="h-px bg-white/10 w-full mb-6"></div>
                            <p className="text-right text-slate-300 leading-relaxed mb-8 flex-grow text-sm font-arabic" dir="rtl">
                                للمراكز البحثية والجهات التي لديها مجموعة ضخمة من البيانات، يسعدنا التواصل معكم لتحديد باقة تناسب احتياجاتكم بدقة.
                            </p>
                            <LocaleLink href="/contact" className="w-full block text-center py-3 border border-slate-600 text-slate-400 hover:border-white hover:text-white rounded-xl transition-all font-semibold mt-auto font-arabic">تواصل معنا</LocaleLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
