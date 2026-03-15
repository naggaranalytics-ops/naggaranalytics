"use client";

import { AlertCircle } from 'lucide-react';
import AdminProjectActions from './AdminProjectActions';
import { useLanguage } from '@/context/LanguageProvider';

export default function AdminPageContent({ projects, fetchError }: { projects: any[]; fetchError: string | null }) {
    const { t, dir } = useLanguage();

    return (
        <div className="p-8 max-w-7xl mx-auto" dir={dir}>
            <header className="mb-8">
                <h1 className={`text-3xl font-bold font-${dir === 'rtl' ? 'arabic' : 'sans'} text-white mb-2`}>
                    {t('admin.page.title')}
                </h1>
                <p className={`text-slate-400 font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>
                    {t('admin.page.subtitle')}
                </p>
            </header>

            {fetchError && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-xl text-red-400 font-mono text-sm">
                    Error: {fetchError}
                </div>
            )}

            <div className="space-y-4">
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-[#111821] border-dashed border border-white/10 rounded-2xl">
                        <p className={`text-slate-400 font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>{t('admin.page.empty')}</p>
                    </div>
                ) : (
                    projects.map((project: any) => (
                        <div key={project.$id} className="bg-[#111821] border border-white/5 rounded-2xl p-6 transition-all hover:border-[#16a085]/30">
                            <div className="flex flex-col xl:flex-row justify-between gap-6" dir={dir}>

                                {/* Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className={`text-xl font-bold text-white font-${dir === 'rtl' ? 'arabic' : 'sans'} truncate max-w-md`}>{project.title}</h3>
                                                <span className={`px-3 py-0.5 text-xs rounded-full font-medium border font-${dir === 'rtl' ? 'arabic' : 'sans'} ${
                                                    project.status === 'completed'    ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    project.status === 'inquiry'      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                                                        'bg-[#16a085]/10 text-[#16a085] border-[#16a085]/20'
                                                }`}>
                                                    {t(`admin.action.status.${project.status}`)}
                                                </span>
                                            </div>
                                            <p className={`text-slate-400 text-sm font-${dir === 'rtl' ? 'arabic' : 'sans'} mt-1`}>
                                                {t('admin.project.degree')} {project.degree_type === 'Masters' ? t('admin.project.masters') : project.degree_type === 'PhD' ? t('admin.project.phd') : project.degree_type || t('admin.project.unspecified')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} pt-4 border-t border-white/5`}>
                                        <div>
                                            <p className={`text-slate-500 text-xs font-${dir === 'rtl' ? 'arabic' : 'sans'} mb-1`}>{t('admin.project.customerId')}</p>
                                            <p className="text-white text-sm font-mono truncate">{project.customer_id}</p>
                                        </div>
                                        <div>
                                            <p className={`text-slate-500 text-xs font-${dir === 'rtl' ? 'arabic' : 'sans'} mb-1`}>{t('admin.project.submitDate')}</p>
                                            <p className="text-white text-sm font-mono">{new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <div>
                                            <p className={`text-slate-500 text-xs font-${dir === 'rtl' ? 'arabic' : 'sans'} mb-1`}>{t('admin.project.quotedPrice')}</p>
                                            <p className="text-white text-sm font-bold font-mono text-[#16a085]">
                                                {project.quoted_price ? `$${project.quoted_price}` : '—'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="xl:w-80 bg-black/20 rounded-xl p-4 border border-white/5 self-stretch flex flex-col justify-between gap-4">
                                    <div className={`flex items-center gap-2 py-2 bg-slate-800/50 text-slate-500 rounded-lg px-3 font-${dir === 'rtl' ? 'arabic' : 'sans'} text-sm`}>
                                        <AlertCircle size={16} />
                                        {t('admin.project.filesMsg')}
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
