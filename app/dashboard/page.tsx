export const runtime = 'nodejs';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FileText, Clock, CheckCircle, PlusCircle, Library, AlertTriangle } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; step: number }> = {
    'Pending': { label: 'قيد المراجعة', color: 'yellow', step: 1 },
    'Payment Verified': { label: 'تم تأكيد الدفع', color: 'blue', step: 2 },
    'Analysis In Progress': { label: 'جاري التحليل', color: 'blue', step: 3 },
    'Review': { label: 'المراجعة النهائية', color: 'purple', step: 4 },
    'Completed': { label: 'مكتمل ✓', color: 'green', step: 5 },
};

const statusSteps = [
    'Pending',
    'Payment Verified',
    'Analysis In Progress',
    'Review',
    'Completed',
];

function StatusBadge({ status }: { status: string }) {
    const cfg = statusConfig[status] || { label: status, color: 'slate', step: 0 };
    const colors: Record<string, string> = {
        yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20',
        slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    return (
        <span className={`px-3 py-1 text-xs rounded-full border font-mono ${colors[cfg.color]}`}>
            {cfg.label}
        </span>
    );
}

function ProgressBar({ status }: { status: string }) {
    const currentStep = statusConfig[status]?.step ?? 0;
    return (
        <div className="mt-4">
            <div className="flex items-center gap-1">
                {statusSteps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                        <div className={`h-1.5 w-full rounded-full transition-all ${i < currentStep ? 'bg-[#16a085]' : 'bg-white/10'
                            }`} />
                    </div>
                ))}
            </div>
            <p className="text-[10px] text-slate-600 font-mono mt-1 text-right">
                {currentStep} / {statusSteps.length} مراحل
            </p>
        </div>
    );
}

export default async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const { data: projects, error } = await supabase
        .from('projects')
        .select(`*, project_files(file_url, file_type)`)
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false });

    const activeProjects = projects?.filter(p => p.status !== 'Completed') ?? [];
    const completedProjects = projects?.filter(p => p.status === 'Completed') ?? [];

    return (
        <div className="max-w-5xl mx-auto py-10">

            {/* ── Header ── */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-white/5 pb-8">
                <div className="text-right w-full md:w-auto">
                    <h1 className="text-2xl md:text-3xl font-bold font-arabic text-white mb-1" dir="rtl">
                        مرحباً، {user?.given_name || "الباحث"} 👋
                    </h1>
                    <p className="text-slate-400 font-arabic text-sm" dir="rtl">
                        تتبع حالة مشاريعك وقم بإدارتها من هنا.
                    </p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="flex items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-7 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 shrink-0"
                >
                    <PlusCircle size={18} />
                    <span className="font-arabic">تقديم مشروع جديد</span>
                </Link>
            </header>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'إجمالي المشاريع', value: projects?.length ?? 0, icon: FileText },
                    { label: 'نشطة', value: activeProjects.length, icon: Clock },
                    { label: 'مكتملة', value: completedProjects.length, icon: CheckCircle },
                ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-[#111821]/60 border border-white/5 rounded-2xl p-5 text-right">
                        <Icon size={18} className="text-[#16a085] mb-2 mr-auto" />
                        <p className="text-2xl font-black text-white">{value}</p>
                        <p className="text-xs text-slate-500 font-arabic mt-1" dir="rtl">{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── Projects list ── */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111821]/60 border border-white/5 rounded-2xl p-7">
                        <h2 className="text-xl font-bold font-arabic text-[#16a085] mb-6 text-right" dir="rtl">
                            مشاريعك الحالية
                        </h2>

                        {error && (
                            <div className="flex items-center gap-3 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 mb-4 text-sm">
                                <AlertTriangle size={16} className="shrink-0" />
                                <span>تعذّر تحميل المشاريع. يرجى تحديث الصفحة.</span>
                            </div>
                        )}

                        {!error && (!projects || projects.length === 0) ? (
                            <div className="text-center py-14 border border-dashed border-white/10 rounded-xl">
                                <p className="text-slate-400 mb-6 font-arabic" dir="rtl">
                                    لا يوجد لديك مشاريع حالية. ابدأ أول مشروع لك الآن.
                                </p>
                                <Link
                                    href="/dashboard/new"
                                    className="inline-flex items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all font-arabic shadow-lg shadow-[#16a085]/20"
                                >
                                    <PlusCircle size={16} /> تقديم مشروع جديد
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {projects?.map((project) => {
                                    const resultFile = project.project_files?.find(
                                        (f: { file_type: string }) => f.file_type === 'result'
                                    );
                                    return (
                                        <div
                                            key={project.id}
                                            className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all"
                                        >
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <StatusBadge status={project.status} />
                                                <h3 className="text-base font-bold text-white flex-1 text-right truncate font-arabic" dir="rtl">
                                                    {project.thesis_title}
                                                </h3>
                                            </div>

                                            <ProgressBar status={project.status} />

                                            <div className="flex justify-between items-center mt-4 gap-3 flex-wrap">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                                                    <Clock size={12} />
                                                    {new Date(project.created_at).toLocaleDateString('ar-EG')}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-arabic">
                                                    <FileText size={12} className="text-[#16a085]" />
                                                    {project.degree === 'Masters' ? 'ماجستير' : project.degree === 'PhD' ? 'دكتوراه' : 'أخرى'}
                                                </div>
                                                {resultFile && (
                                                    <a
                                                        href={resultFile.file_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-1.5 text-xs text-[#16a085] hover:underline font-arabic"
                                                    >
                                                        ⬇ تحميل النتائج
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Right sidebar cards ── */}
                <div className="space-y-5">

                    {/* Project status guide */}
                    <div className="bg-[#111821]/60 border border-white/5 rounded-2xl p-6 text-right">
                        <h3 className="text-sm font-bold text-white font-arabic mb-4" dir="rtl">🗺 مراحل المشروع</h3>
                        <ul className="space-y-3">
                            {statusSteps.map((s, i) => (
                                <li key={s} className="flex items-center gap-3 flex-row-reverse">
                                    <span className="w-5 h-5 rounded-full bg-[#16a085]/15 text-[#16a085] text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <span className="text-xs text-slate-400 font-arabic">{statusConfig[s].label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Library card */}
                    <Link
                        href="/dashboard/library"
                        className="block bg-[#111821]/60 border border-white/5 rounded-2xl p-6 hover:border-[#16a085]/40 transition-all group text-right"
                    >
                        <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                            <Library size={20} className="text-[#16a085]" />
                            <h3 className="text-sm font-bold text-white font-arabic group-hover:text-[#16a085] transition-colors" dir="rtl">
                                المكتبة الرقمية
                            </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-arabic" dir="rtl">
                            دورات تدريبية وقوالب إحصائية للباحثين
                        </p>
                    </Link>

                    {/* Support card */}
                    <div className="bg-[#16a085]/5 border border-[#16a085]/20 rounded-2xl p-6 text-right">
                        <h3 className="text-sm font-bold text-[#16a085] font-arabic mb-2" dir="rtl">💬 تواصل معنا</h3>
                        <p className="text-xs text-slate-400 font-arabic mb-4" dir="rtl">
                            لديك سؤال أو تحتاج مساعدة؟ نحن هنا على مدار الساعة.
                        </p>
                        <a
                            href="https://wa.me/966573657207"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold font-arabic text-[#16a085] border border-[#16a085]/40 px-4 py-2 rounded-xl hover:bg-[#16a085]/10 transition-all"
                        >
                            واتساب مباشر
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
