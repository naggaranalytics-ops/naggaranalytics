'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

const STATUS_FLOW = ['inquiry', 'quoted', 'paid', 'in_progress', 'completed'];

const STATUS_LABELS: Record<string, string> = {
    inquiry:     'بانتظار التأكيد',
    quoted:      'تم تقديم عرض',
    paid:        'تم الدفع',
    in_progress: 'جاري التحليل',
    completed:   'مكتمل',
};

export default function AdminProjectActions({
    projectId,
    currentStatus,
}: {
    projectId: string;
    currentStatus: string;
}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

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
            alert('حدث خطأ أثناء التحديث.');
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
            alert('تم رفع ملف النتيجة بنجاح!');
            router.refresh();
        } catch {
            alert('حدث خطأ أثناء الرفع!');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="pt-4 border-t border-white/5 mt-auto flex flex-col gap-3">
            {(currentStatus === 'in_progress' || currentStatus === 'completed') && (
                <div className="relative">
                    <input
                        type="file"
                        title="Upload Delivery File"
                        onChange={handleDeliveryUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUpdating}
                    />
                    <div className="w-full flex justify-center items-center gap-2 bg-slate-800 text-white py-2.5 rounded-lg font-arabic font-bold text-sm border border-slate-700 hover:bg-slate-700 transition-all">
                        {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : 'رفع النتيجة النهائية'}
                    </div>
                </div>
            )}

            {nextStatus ? (
                <button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating}
                    className="w-full flex justify-center items-center gap-2 bg-[#16a085] hover:bg-[#149174] text-white py-2.5 rounded-lg disabled:opacity-50 transition-all font-arabic font-bold text-sm shadow-lg shadow-[#16a085]/20"
                >
                    {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    <span dir="rtl">ترقية لـ: {STATUS_LABELS[nextStatus]}</span>
                </button>
            ) : (
                <div className="w-full flex justify-center items-center py-2.5 bg-green-500/10 text-green-400 rounded-lg font-arabic font-bold text-sm border border-green-500/20">
                    تم اكتمال المشروع بنجاح 🎉
                </div>
            )}
        </div>
    );
}
