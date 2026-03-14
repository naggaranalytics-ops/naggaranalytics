export const runtime = 'edge';

import { createAdminClient, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite-server';
import { Download, AlertCircle } from 'lucide-react';
import AdminProjectActions from './AdminProjectActions';

export const revalidate = 0;

export default async function AdminPage() {
    const { databases } = createAdminClient();

    let projects: any[] = [];
    let fetchError: string | null = null;

    try {
        const res = await databases.listDocuments({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.PROJECTS,
            queries:      [Query.orderDesc('created_at'), Query.limit(100)],
        });
        projects = res.documents;
    } catch (e: any) {
        fetchError = e.message;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-arabic text-white mb-2" dir="rtl">إدارة المشاريع</h1>
                <p className="text-slate-400 font-arabic" dir="rtl">مراجعة وتحديث حالات جميع المشاريع المقدمة.</p>
            </header>

            {fetchError && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-xl text-red-400 font-mono text-sm">
                    Error: {fetchError}
                </div>
            )}

            <div className="space-y-4">
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-[#111821] border-dashed border border-white/10 rounded-2xl">
                        <p className="text-slate-400 font-arabic">لا توجد مشاريع حتى الآن.</p>
                    </div>
                ) : (
                    projects.map((project: any) => (
                        <div key={project.$id} className="bg-[#111821] border border-white/5 rounded-2xl p-6 transition-all hover:border-[#16a085]/30">
                            <div className="flex flex-col xl:flex-row justify-between gap-6" dir="rtl">

                                {/* Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white font-arabic truncate max-w-md">{project.title}</h3>
                                                <span className={`px-3 py-0.5 text-xs rounded-full font-medium border font-arabic ${
                                                    project.status === 'completed'    ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    project.status === 'inquiry'      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                                                        'bg-[#16a085]/10 text-[#16a085] border-[#16a085]/20'
                                                }`}>
                                                    {project.status === 'inquiry'     ? 'بانتظار التأكيد' :
                                                     project.status === 'quoted'      ? 'تم تقديم عرض' :
                                                     project.status === 'paid'        ? 'تم الدفع' :
                                                     project.status === 'in_progress' ? 'جاري التحليل' : 'مكتمل'}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm font-arabic mt-1">
                                                الدرجة: {project.degree_type === 'Masters' ? 'الماجستير' : project.degree_type === 'PhD' ? 'الدكتوراه' : project.degree_type || 'غير محدد'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-right pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">معرف العميل</p>
                                            <p className="text-white text-sm font-mono truncate">{project.customer_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">تاريخ التقديم</p>
                                            <p className="text-white text-sm font-mono">{new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs font-arabic mb-1">السعر المقترح</p>
                                            <p className="text-white text-sm font-bold font-mono text-[#16a085]">
                                                {project.quoted_price ? `$${project.quoted_price}` : '—'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="xl:w-80 bg-black/20 rounded-xl p-4 border border-white/5 self-stretch flex flex-col justify-between gap-4">
                                    <div className="flex items-center gap-2 py-2 bg-slate-800/50 text-slate-500 rounded-lg px-3 font-arabic text-sm">
                                        <AlertCircle size={16} />
                                        الملفات متاحة في Appwrite Storage
                                    </div>
                                    <AdminProjectActions projectId={project.$id} currentStatus={project.status} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
