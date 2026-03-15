'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, CheckCircle2, UserPlus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';

const STATUS_FLOW = ['inquiry', 'awaiting_quote', 'quoted', 'paid', 'in_progress', 'completed'];

export default function AdminProjectActions({
    projectId,
    currentStatus,
    currentTechnicianId,
}: {
    projectId: string;
    currentStatus: string;
    currentTechnicianId?: string;
}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [techId, setTechId] = useState(currentTechnicianId || '');
    const [techSaved, setTechSaved] = useState(false);
    const router = useRouter();
    const { t, dir } = useLanguage();

    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    const nextStatus   = STATUS_FLOW[currentIndex + 1];

    const handleUpdateStatus = async () => {
        if (!nextStatus) return;
        setIsUpdating(true);
        try {
            const res = await fetch('/api/admin/projects', {
                method:  'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ projectId, status: nextStatus }),
            });
            if (!res.ok) throw new Error('Update failed');
            router.refresh();
        } catch {
            alert(t('admin.action.errorUpdate'));
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAssignTechnician = async () => {
        if (!techId.trim()) return;
        setIsUpdating(true);
        setTechSaved(false);
        try {
            const res = await fetch('/api/admin/projects', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, technician_id: techId.trim() }),
            });
            if (!res.ok) throw new Error('Assign failed');
            setTechSaved(true);
            router.refresh();
        } catch {
            alert(t('admin.action.errorUpdate'));
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeliveryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('file', e.target.files[0]);
        try {
            const res = await fetch('/api/admin/delivery', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Upload failed');
            alert(t('admin.action.successUpload'));
            router.refresh();
        } catch {
            alert(t('admin.action.errorUpload'));
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="pt-4 border-t border-white/5 mt-auto flex flex-col gap-3">
            {/* Technician assignment */}
            <div className="space-y-2">
                <label className={`text-xs text-slate-500 font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>
                    {dir === 'rtl' ? 'معرف الفني' : 'Technician ID'}
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={techId}
                        onChange={e => { setTechId(e.target.value); setTechSaved(false); }}
                        placeholder={dir === 'rtl' ? 'أدخل معرف الفني…' : 'Paste technician user ID…'}
                        dir="ltr"
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#16a085]/50"
                    />
                    <button
                        onClick={handleAssignTechnician}
                        disabled={isUpdating || !techId.trim()}
                        className="flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-50 transition-all"
                    >
                        <UserPlus size={14} />
                        {dir === 'rtl' ? 'تعيين' : 'Assign'}
                    </button>
                </div>
                {techSaved && (
                    <p className="text-green-400 text-xs flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {dir === 'rtl' ? 'تم التعيين بنجاح' : 'Assigned successfully'}
                    </p>
                )}
            </div>

            {(currentStatus === 'in_progress' || currentStatus === 'completed') && (
                <div className="relative">
                    <input
                        type="file"
                        title="Upload Delivery File"
                        onChange={handleDeliveryUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUpdating}
                    />
                    <div className={`w-full flex justify-center items-center gap-2 bg-slate-800 text-white py-2.5 rounded-lg font-${dir === 'rtl' ? 'arabic' : 'sans'} font-bold text-sm border border-slate-700 hover:bg-slate-700 transition-all`}>
                        {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : t('admin.action.uploadBtn')}
                    </div>
                </div>
            )}

            {nextStatus ? (
                <button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating}
                    className={`w-full flex justify-center items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white py-2.5 rounded-lg disabled:opacity-50 transition-all font-${dir === 'rtl' ? 'arabic' : 'sans'} font-bold text-sm shadow-lg shadow-[#16a085]/20`}
                >
                    {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    <span dir={dir}>{t('admin.action.upgradeBtn')} {t(`admin.action.status.${nextStatus}`)}</span>
                </button>
            ) : (
                <div className={`w-full flex justify-center items-center py-2.5 bg-green-500/10 text-green-400 rounded-lg font-${dir === 'rtl' ? 'arabic' : 'sans'} font-bold text-sm border border-green-500/20`}>
                    {t('admin.action.completedMsg')}
                </div>
            )}
        </div>
    );
}
