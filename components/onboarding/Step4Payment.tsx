"use client";

import React, { useRef, useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function Step4Payment() {
    const { calculateTotal, prevStep, paymentPhase, academicDetails, tasks, files } = useOnboarding();
    const [receipt, setReceipt] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const receiptRef = useRef<HTMLInputElement>(null);

    const total = calculateTotal();
    const amountToPay = paymentPhase === "Deposit 70%" ? total * 0.7 : total;

    const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setReceipt(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('degree', academicDetails.degree);
            formData.append('thesisTitle', academicDetails.thesisTitle);
            formData.append('tasks', JSON.stringify(tasks));
            formData.append('total', total.toString());
            formData.append('paymentPhase', paymentPhase);

            if (receipt) {
                formData.append('receipt', receipt);
            }

            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await fetch('/api/projects', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'فشل إرسال المشروع. يرجى المحاولة مرة أخرى.');
            }

            alert("تم إرسال مشروعك بنجاح! سيتم مراجعته قريباً.");
            // Redirect to dashboard (this will be built next)
            window.location.href = '/dashboard';

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-right">
                <h2 className="text-2xl font-bold font-arabic text-white mb-2">الدفع والتأكيد</h2>
                <p className="text-slate-400 text-sm font-arabic">يرجى تحويل المبلغ المطلوب وإرفاق إيصال التحويل لتبدأ العمل على مشروعك.</p>
            </div>

            <div className="bg-[#111821] border border-white/5 rounded-2xl p-6 text-right font-arabic">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <span className="text-3xl font-bold text-[#16a085] font-mono">${amountToPay.toFixed(2)}</span>
                    <div>
                        <span className="text-lg text-white font-bold block">المبلغ المطلوب تحويله</span>
                        <span className="text-xs text-slate-400">({paymentPhase})</span>
                    </div>
                </div>

                <h3 className="text-lg text-white font-bold mb-4 flex justify-end gap-2 items-center">
                    <span>تفاصيل الحساب البنكي (بنك الراجحي)</span>
                    <span className="w-2 h-2 rounded-full bg-[#16a085]"></span>
                </h3>

                <div className="space-y-3 text-sm text-slate-300 bg-black/20 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-white">Mohammed Hassan Mohammed Elnaggar</span>
                        <span className="text-slate-400">الاسم</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-white">077050010006087640585</span>
                        <span className="text-slate-400">رقم الحساب</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[#16a085]">SA58 8000 0865 6080 1764 0585</span>
                        <span className="text-slate-400">الآيبان (IBAN)</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-mono text-white">RJHISARI</span>
                        <span className="text-slate-400">سويفت كود</span>
                    </div>
                </div>
            </div>

            <div className="text-right mt-8">
                <label className="block text-sm font-medium text-slate-300 mb-2 font-arabic pl-2">إرفاق إيصال التحويل <span className="text-red-500">*</span></label>
                <div
                    onClick={() => receiptRef.current?.click()}
                    className={`border border-dashed transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer ${receipt ? 'border-[#16a085] bg-[#16a085]/5' : 'border-white/20 bg-[#111821] hover:bg-white/5'
                        }`}
                >
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        ref={receiptRef}
                        onChange={handleReceiptUpload}
                    />

                    {receipt ? (
                        <div className="flex items-center gap-3 w-full">
                            <CheckCircle2 className="text-[#16a085]" size={24} />
                            <span className="text-white font-medium truncate flex-1 text-left" dir="ltr">{receipt.name}</span>
                            <span className="text-xs text-slate-400">{(receipt.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 w-full justify-end">
                            <span className="text-slate-400 font-arabic">اضغط هنا لإرفاق صورة الإيصال أو ملف PDF</span>
                            <UploadCloud className="text-[#16a085]" size={24} />
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all font-arabic disabled:opacity-50"
                >
                    السابق
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!receipt || isSubmitting}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال المشروع البدء"}
                </button>
            </div>
        </div>
    );
}
