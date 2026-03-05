export const runtime = 'edge';

import { supabase } from "@/lib/supabase";
import { Clock, FileText, CheckCircle2, Download, AlertCircle, RefreshCw } from "lucide-react";
import AdminProjectActions from "./AdminProjectActions";

// Adding revalidate to ensure fresh data since it is an admin dashboard
export const revalidate = 0;

export default async function AdminPage() {
    // Fetch all projects for the admin, ordered by newest
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            profiles:user_id (
                first_name,
                last_name,
                email
            )
        `)
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold font-arabic text-white mb-2" dir="rtl">إدارة المشاريع</h1>
                    <p className="text-slate-400 font-arabic" dir="rtl">مراجعة وتحديث حالات جميع المشاريع المقدمة.</p>
                </div>
            </header>

            <div className="space-y-4">
                {!projects || projects.length === 0 ? (
                    <div className="text-center py-20 bg-[#111821] border-dashed border border-white/10 rounded-2xl">
                        <p className="text-slate-400 font-arabic">لا توجد مشاريع حتى الآن.</p>
                    </div>
                ) : (
                    projects.map((project: any) => (
                        <div key={project.id} className="bg-[#111821] border border-white/5 rounded-2xl p-6 transition-all hover:border-[#16a085]/30">
                            <div className="flex flex-col xl:flex-row justify-between gap-6" dir="rtl">

                                {/* Info Section */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white font-arabic truncate max-w-md">{project.thesis_title}</h3>
                                                <span className={`px-3 py-0.5 text-xs rounded-full font-medium border ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    project.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                        'bg-[#16a085]/10 text-[#16a085] border-[#16a085]/20'
                                                    } font-arabic`}>
                                                    {project.status === 'Pending' ? 'بانتظار التأكيد' :
                                                        project.status === 'Payment Verified' ? 'تم تأكيد الدفع' :
                                                            project.status === 'Analysis In Progress' ? 'جاري التحليل' :
                                                                project.status === 'Review' ? 'المراجعة النهائية' : 'مكتمل'}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm font-arabic mt-1">
                                                الدرجة: {project.degree === 'Masters' ? 'الماجستير' : project.degree === 'PhD' ? 'الدكتوراه' : 'أخرى'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-right pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">العميل</p>
                                            <p className="text-white text-sm font-mono truncate">{project.profiles?.email || 'Unknown User'}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">تاريخ التقديم</p>
                                            <p className="text-white text-sm font-mono">{new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">المبلغ الإجمالي</p>
                                            <p className="text-white text-sm font-bold font-mono text-[#16a085]">${project.total_price}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">نظام الدفع</p>
                                            <p className="text-white text-sm font-arabic">{project.payment_phase === 'Deposit 70%' ? 'عربون 70%' : 'دفع كامل'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Section */}
                                <div className="xl:w-80 bg-black/20 rounded-xl p-4 border border-white/5 self-stretch flex flex-col justify-between h-auto gap-4">
                                    <div className="space-y-3">
                                        {project.receipt_url ? (
                                            <a href={project.receipt_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-[#16a085]/10 hover:bg-[#16a085]/20 text-[#16a085] rounded-lg transition-all font-arabic text-sm border border-[#16a085]/20">
                                                <Download size={16} />
                                                تحميل إيصال الدفع
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800/50 text-slate-500 rounded-lg font-arabic text-sm">
                                                <AlertCircle size={16} />
                                                لا يوجد إيصال
                                            </div>
                                        )}
                                    </div>

                                    {/* Client Component injected here for Interactivity */}
                                    <AdminProjectActions projectId={project.id} currentStatus={project.status} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
