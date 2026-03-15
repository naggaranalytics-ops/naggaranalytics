'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';

export default function TechnicianProjectActions({
    projectId,
    currentStatus,
}: {
    projectId: string;
    currentStatus: string;
}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();
    const { t, dir } = useLanguage();

    const handleDeliveryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('file', e.target.files[0]);
        try {
            const res = await fetch('/api/admin/delivery', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Upload failed');
            alert(t('tech.action.successUpload'));
            router.refresh();
        } catch {
            alert(t('tech.action.errorUpload'));
        } finally {
            setIsUpdating(false);
        }
    };

    if (currentStatus === 'completed') {
        return (
            <div className={`w-full flex justify-center items-center py-2.5 bg-green-500/10 text-green-400 rounded-lg font-${dir === 'rtl' ? 'arabic' : 'sans'} font-bold text-sm border border-green-500/20`}>
                {t('tech.action.completedMsg')}
            </div>
        );
    }

    return (
        <div className="pt-4 border-t border-white/5 mt-auto flex flex-col gap-3">
            {(currentStatus === 'in_progress' || currentStatus === 'paid') && (
                <div className="relative">
                    <input
                        type="file"
                        title="Upload Result File"
                        onChange={handleDeliveryUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUpdating}
                    />
                    <div className={`w-full flex justify-center items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white py-2.5 rounded-lg font-${dir === 'rtl' ? 'arabic' : 'sans'} font-bold text-sm shadow-lg shadow-[#16a085]/20 transition-all`}>
                        {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : t('tech.action.uploadBtn')}
                    </div>
                </div>
            )}

            <div className={`w-full text-center py-2 text-slate-500 text-xs font-${dir === 'rtl' ? 'arabic' : 'sans'}`}>
                {t(`tech.action.status.${currentStatus}`)}
            </div>
        </div>
    );
}
