export const runtime = 'edge';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Fetch user's projects and their result files
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            project_files (
                file_url,
                file_type
            )
        `)
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-8 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Link
                    href="/dashboard/new"
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic order-1 md:order-2"
                >
                    تقديم مشروع جديد
                </Link>
                <div className="order-2 md:order-1 text-right w-full md:w-auto">
                    <h1 className="text-3xl font-bold font-arabic text-white mb-2" dir="rtl">مرحباً بك، {user?.given_name || "الباحث"}</h1>
                    <p className="text-slate-400 font-arabic" dir="rtl">تتبع حالة مشاريعك وقم بإدارتها من هنا.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Projects */}
                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card rounded-2xl p-8 border border-white/5 bg-[#111821]/50 text-right">
                        <h2 className="text-2xl font-bold font-arabic text-[#16a085] mb-6 flex items-center justify-between flex-row-reverse" dir="rtl">
                            <span>مشاريعك الحالية</span>
                            <span className="text-xs bg-[#16a085]/10 text-[#16a085] px-3 py-1 rounded-full border border-[#16a085]/20">{projects?.length || 0} مشاريع</span>
                        </h2>

                        {!projects || projects.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                <p className="text-slate-400 mb-6 font-arabic" dir="rtl">لا يوجد لديك مشاريع حالية. ابدأ أول مشروع لك الآن لبدء رحلة التحليل الإحصائي.</p>
                                <Link href="/dashboard/new" className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all font-arabic block w-max mx-auto shadow-lg shadow-[#16a085]/20">
                                    تقديم مشروع جديد
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all text-right font-arabic">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-3 py-1 text-xs rounded-full border ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                project.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {project.status === 'Pending' ? 'قيد المراجعة' :
                                                    project.status === 'Payment Verified' ? 'تم تأكيد الدفع' :
                                                        project.status === 'Analysis In Progress' ? 'جاري التحليل' :
                                                            project.status === 'Review' ? 'المراجعة النهائية' : 'مكتمل'}
                                            </span>
                                            <h3 className="text-lg font-bold text-white flex-1 mr-4 truncate" dir="rtl">{project.thesis_title}</h3>
                                        </div>

                                        <div className="flex justify-end gap-6 text-sm text-slate-400">
                                            <div className="flex items-center gap-1.5 flex-row-reverse">
                                                <Clock size={14} className="text-[#16a085]" />
                                                <span>{new Date(project.created_at).toLocaleDateString('ar-EG')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-row-reverse">
                                                <FileText size={14} className="text-[#16a085]" />
                                                <span>{project.degree === 'Masters' ? 'ماجستير' : project.degree === 'PhD' ? 'دكتوراه' : 'أخرى'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Quick Links & Resources */}
                <div className="space-y-6">
                    <Link href="/dashboard/library" className="block glass-card rounded-2xl p-8 border border-white/5 bg-[#111821]/50 hover:bg-[#111821]/80 hover:border-[#16a085]/30 transition-all group">
                        <h3 className="text-xl font-bold font-arabic text-white mb-4 text-right group-hover:text-[#16a085] transition-colors" dir="rtl">المكتبة الرقمية</h3>
                        <p className="text-sm text-slate-400 mb-4 font-arabic text-right" dir="rtl">دورات تدريبية وقوالب إحصائية لمساعدتك في بحثك.</p>
                        <div className="h-32 rounded-xl bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col items-center justify-center">
                                <span className="text-white font-bold font-arabic bg-[#16a085] px-4 py-2 rounded-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all flex justify-center items-center gap-2">
                                    تصفح المكتبة
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
