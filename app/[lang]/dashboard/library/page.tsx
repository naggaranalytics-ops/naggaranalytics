"use client";

import { PlayCircle, Download, BookOpen, Lock, FileText, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";

export const runtime = 'edge';

export default function LibraryPage({ params }: { params: { lang: string } }) {
    const { t, dir } = useLanguage();

    // Mock data for resources
    const videos = [
        {
            id: 1,
            title: "قناة د. محمد حسن التعليمية",
            description: "تابع قناتي للحصول على دورات ودروس شاملة في التحليل الإحصائي واستخدام البرامج الإحصائية.",
            url: "https://youtube.com/c/MuhamedHassan",
            type: "Free"
        },
        {
            id: 2,
            title: "دورات متقدمة حصرياً",
            description: "محتوى متقدم وشرح مفصل وحصري للبحوث الطبية.",
            videoId: null,
            type: "Premium"
        }
    ];

    const resources = [
        {
            id: 1,
            title: "قالب كتابة النتائج الإحصائية (APA)",
            description: "ملف وورد جاهز للاستخدام.",
            type: "Free"
        },
        {
            id: 2,
            title: "دليل المصطلحات الإحصائية للباحثين",
            description: "أهم المصطلحات مترجمة مع تعريفاتها.",
            type: "Free"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12 border-b border-white/5 pb-8 ltr:text-left rtl:text-right text-left">
                <h1 className="text-3xl font-bold font-arabic text-white mb-2" dir={dir}>{t("library.title")}</h1>
                <p className="text-slate-400 font-arabic" dir={dir}>{t("library.subtitle")}</p>
            </header>

            <div className="space-y-12">
                {/* Videos Section */}
                <section>
                    <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Video className="text-[#16a085]" size={24} />
                        <h2 className="text-2xl font-bold text-white font-arabic">{t("library.videos")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {videos.map((vid) => (
                            <div key={vid.id} className="bg-[#111821] border border-white/5 rounded-2xl overflow-hidden group">
                                <div className="aspect-video bg-black relative">
                                    {vid.type === 'Free' && vid.url ? (
                                        <a href={vid.url} target="_blank" rel="noreferrer" className="w-full h-full flex flex-col items-center justify-center bg-red-950/30 hover:bg-red-900/40 transition-all border-b border-white/5 relative group/link">
                                            <PlayCircle size={64} className="text-red-500 mb-4 group-hover/link:scale-110 transition-transform" />
                                            <span className="text-red-400 font-arabic font-bold">{t("library.goToChannel")}</span>
                                        </a>
                                    ) : vid.type === 'Free' ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${vid.videoId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border-b border-white/5 relative">
                                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 filter blur-sm"></div>
                                            <Lock size={48} className="text-slate-500 mb-4 z-10" />
                                            <span className="text-zinc-400 font-arabic font-bold z-10">{t("library.exclusiveSoon")}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={`p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                    <div className={`flex justify-between items-start mb-2 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <span className={`px-2 py-1 text-[10px] rounded-full font-bold ${vid.type === 'Free' ? 'bg-[#16a085]/20 text-[#16a085]' : 'bg-amber-500/20 text-amber-500'}`}>
                                            {vid.type === 'Free' ? t("library.free") : t("library.premium")}
                                        </span>
                                        <h3 className="text-xl font-bold text-white font-arabic" dir={dir}>{vid.title}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm font-arabic mt-2 line-clamp-2" dir={dir}>{vid.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resources Section */}
                <section className="pt-8 border-t border-white/5">
                    <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <BookOpen className="text-[#16a085]" size={24} />
                        <h2 className="text-2xl font-bold text-white font-arabic">{t("library.templates")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((res) => (
                            <div key={res.id} className={`bg-[#111821] border border-white/5 p-6 rounded-2xl flex flex-col hover:border-[#16a085]/30 transition-all group ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                <div className={`w-12 h-12 rounded-xl bg-[#16a085]/10 flex items-center justify-center text-[#16a085] mb-4 group-hover:scale-110 transition-transform ${dir === 'rtl' ? 'ml-auto' : 'mr-auto'}`}>
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white font-arabic mb-2" dir={dir}>{res.title}</h3>
                                <p className="text-slate-400 text-sm font-arabic flex-1" dir={dir}>{res.description}</p>

                                <button className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all font-arabic text-sm">
                                    <Download size={16} className="text-[#16a085]" />
                                    {t("library.download")}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
