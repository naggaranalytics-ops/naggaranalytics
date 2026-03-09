"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { useTheme } from "@/context/ThemeProvider";
import LocaleLink from "@/components/LocaleLink";
import { FileText, Clock, CheckCircle, PlusCircle, Library, AlertTriangle } from "lucide-react";

const statusSteps = [
    'Pending',
    'Payment Verified',
    'Analysis In Progress',
    'Review',
    'Completed',
];

function StatusBadge({ status }: { status: string }) {
    const { t } = useLanguage();

    const statusConfig: Record<string, { label: string; color: string; step: number }> = {
        'Pending': { label: t('dash.status.pending'), color: 'yellow', step: 1 },
        'Payment Verified': { label: t('dash.status.paymentVerified'), color: 'blue', step: 2 },
        'Analysis In Progress': { label: t('dash.status.analysisInProgress'), color: 'blue', step: 3 },
        'Review': { label: t('dash.status.review'), color: 'purple', step: 4 },
        'Completed': { label: t('dash.status.completed'), color: 'green', step: 5 },
    };

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
    const { t, dir } = useLanguage();
    const statusConfig: Record<string, { step: number }> = {
        'Pending': { step: 1 },
        'Payment Verified': { step: 2 },
        'Analysis In Progress': { step: 3 },
        'Review': { step: 4 },
        'Completed': { step: 5 },
    };
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
            <p className={`text-[10px] text-slate-600 font-mono mt-1 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>
                {currentStep} / {statusSteps.length} {t('dash.stages')}
            </p>
        </div>
    );
}

export default function DashboardPageContent({ user, projects, error }: { user: any, projects: any[], error: any }) {
    const { t, dir, lang } = useLanguage();
    const { theme } = useTheme();

    const activeProjects = projects?.filter(p => p.status !== 'Completed') ?? [];
    const completedProjects = projects?.filter(p => p.status === 'Completed') ?? [];

    const stats = [
        { label: t('dash.totalProjects'), value: projects?.length ?? 0, icon: FileText },
        { label: t('dash.active'), value: activeProjects.length, icon: Clock },
        { label: t('dash.completed'), value: completedProjects.length, icon: CheckCircle },
    ];

    const statusConfig: Record<string, { label: string }> = {
        'Pending': { label: t('dash.status.pending') },
        'Payment Verified': { label: t('dash.status.paymentVerified') },
        'Analysis In Progress': { label: t('dash.status.analysisInProgress') },
        'Review': { label: t('dash.status.review') },
        'Completed': { label: t('dash.status.completed') },
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4" dir={dir}>
            {/* ── Header ── */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b pb-8" style={{ borderColor: 'var(--border-color)' }}>
                <div className={`w-full md:w-auto ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {t('dash.welcome').replace('{name}', user?.given_name || (lang === 'ar' ? 'الباحث' : 'Researcher'))}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {t('dash.subtitle')}
                    </p>
                </div>
                <LocaleLink
                    href="/dashboard/new"
                    className="flex items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-7 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 shrink-0"
                >
                    <PlusCircle size={18} />
                    <span>{t('dash.newProject')}</span>
                </LocaleLink>
            </header>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="glass-card rounded-2xl p-5 text-right" style={{ borderColor: 'var(--border-color)' }}>
                        <Icon size={18} className="text-[#16a085] mb-2 mr-auto" />
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{value}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ── Projects list ── */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card rounded-2xl p-7" style={{ borderColor: 'var(--border-color)' }}>
                        <h2 className={`text-xl font-bold text-[#16a085] mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {t('dash.currentProjects')}
                        </h2>

                        {error && (
                            <div className="flex items-center gap-3 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 mb-4 text-sm">
                                <AlertTriangle size={16} className="shrink-0" />
                                <span>{t('dash.error')}</span>
                            </div>
                        )}

                        {!error && (!projects || projects.length === 0) ? (
                            <div className="text-center py-14 border border-dashed rounded-xl" style={{ borderColor: 'var(--border-color)' }}>
                                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                                    {t('dash.empty')}
                                </p>
                                <LocaleLink
                                    href="/dashboard/new"
                                    className="inline-flex items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20"
                                >
                                    <PlusCircle size={16} /> {t('dash.newProject')}
                                </LocaleLink>
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
                                            className="glass-card rounded-xl p-5 transition-all" style={{ borderColor: 'var(--border-color)' }}
                                        >
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <StatusBadge status={project.status} />
                                                <h3 className={`text-base font-bold flex-1 truncate ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-primary)' }}>
                                                    {project.thesis_title}
                                                </h3>
                                            </div>

                                            <ProgressBar status={project.status} />

                                            <div className="flex justify-between items-center mt-4 gap-3 flex-wrap">
                                                <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                                                    <Clock size={12} />
                                                    {new Date(project.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                    <FileText size={12} className="text-[#16a085]" />
                                                    {project.degree === 'Masters' ? t('dash.degree.masters') : project.degree === 'PhD' ? t('dash.degree.phd') : t('dash.degree.other')}
                                                </div>
                                                {resultFile && (
                                                    <a
                                                        href={resultFile.file_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-1.5 text-xs text-[#16a085] hover:underline"
                                                    >
                                                        ⬇ {t('dash.downloadResults')}
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
                    <div className="glass-card rounded-2xl p-6" style={{ borderColor: 'var(--border-color)' }}>
                        <h3 className={`text-sm font-bold mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-primary)' }}>
                            {dir === 'rtl' ? '🗺 مراحل المشروع' : '🗺 Project Roadmap'}
                        </h3>
                        <ul className="space-y-3">
                            {statusSteps.map((s, i) => (
                                <li key={s} className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <span className="w-5 h-5 rounded-full bg-[#16a085]/15 text-[#16a085] text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{statusConfig[s].label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Library card */}
                    <LocaleLink
                        href="/dashboard/library"
                        className="block glass-card rounded-2xl p-6 hover:border-[#16a085]/40 transition-all group" style={{ borderColor: 'var(--border-color)' }}
                    >
                        <div className={`flex items-center gap-3 mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Library size={20} className="text-[#16a085]" />
                            <h3 className="text-sm font-bold group-hover:text-[#16a085] transition-colors" style={{ color: 'var(--text-primary)' }}>
                                {t('dash.library')}
                            </h3>
                        </div>
                        <p className={`text-xs ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-secondary)' }}>
                            {t('dash.libraryDesc')}
                        </p>
                    </LocaleLink>

                    {/* Support card */}
                    <div className="bg-[#16a085]/5 border border-[#16a085]/20 rounded-2xl p-6 glass-card">
                        <h3 className={`text-sm font-bold mb-2 text-[#16a085] ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {t('dash.support')}
                        </h3>
                        <p className={`text-xs mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-secondary)' }}>
                            {t('dash.supportDesc')}
                        </p>
                        <a
                            href="https://wa.me/966573657207"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold border border-[#16a085]/40 px-4 py-2 rounded-xl hover:bg-[#16a085]/10 transition-all text-[#16a085]"
                        >
                            {t('dash.whatsapp')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
