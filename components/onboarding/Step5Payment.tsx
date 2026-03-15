"use client";

import React, { useRef, useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function Step5Payment() {
    const { lang, t } = useLanguage();
    const { calculateTotal, prevStep, paymentPhase, academicDetails, nda, tasks, files } = useOnboarding();
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
            formData.append('ndaAgreed', String(nda.agreed));
            formData.append('ndaSignature', nda.signatureName);
            formData.append('ndaSignedAt', nda.signedAt || new Date().toISOString());

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
                throw new Error(data.error || (lang === "ar" ? "فشل إرسال المشروع. يرجى المحاولة مرة أخرى." : "Failed to submit project. Please try again."));
            }

            alert(lang === "ar" ? "تم إرسال مشروعك بنجاح! سيتم مراجعته قريباً." : "Your project has been submitted successfully! We will review it soon.");
            // Redirect to dashboard (this will be built next)
            window.location.href = `/${lang}/dashboard`;

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-bold text-white mb-2">{t("onboarding.step4.title")}</h2>
                <p className="text-slate-400 text-sm">{t("onboarding.step4.subtitle")}</p>
            </div>

            <div className={`bg-[#111821] border border-white/5 rounded-2xl p-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <span className="text-3xl font-bold text-[#16a085] font-mono">${amountToPay.toFixed(2)}</span>
                    <div>
                        <span className="text-lg text-white font-bold block">{t("onboarding.step4.amountRequired")}</span>
                        <span className="text-xs text-slate-400">({paymentPhase})</span>
                    </div>
                </div>

                <h3 className={`text-lg text-white font-bold mb-4 flex gap-2 items-center ${lang === "ar" ? "justify-end" : "justify-start"}`}>
                    <span>{lang === "ar" ? "تفاصيل الحساب البنكي (بنك الراجحي)" : "Bank Account Details (Al-Rajhi Bank)"}</span>
                    <span className="w-2 h-2 rounded-full bg-[#16a085]"></span>
                </h3>

                <div className="space-y-3 text-sm text-slate-300 bg-black/20 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-white">Mohammed Hassan Mohammed Elnaggar</span>
                        <span className="text-slate-400">{lang === "ar" ? "الاسم" : "Name"}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-white">077050010006087640585</span>
                        <span className="text-slate-400">{lang === "ar" ? "رقم الحساب" : "Account Number"}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[#16a085]">SA58 8000 0865 6080 1764 0585</span>
                        <span className="text-slate-400">{lang === "ar" ? "الآيبان (IBAN)" : "IBAN"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-mono text-white">RJHISARI</span>
                        <span className="text-slate-400">{lang === "ar" ? "سويفت كود" : "SWIFT Code"}</span>
                    </div>
                </div>
            </div>

            <div className={`mt-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
                <label className="block text-sm font-medium text-slate-300 mb-2 pl-2">{t("onboarding.step4.uploadReceipt")} <span className="text-red-500">*</span></label>
                <div
                    onClick={() => receiptRef.current?.click()}
                    className={`border border-dashed transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer ${receipt ? 'border-[#16a085] bg-[#16a085]/5' : 'border-white/20 bg-[#111821] hover:bg-white/5'
                        }`}
                >
                    <input
                        id="receiptUpload"
                        title={t("onboarding.step4.uploadReceipt")}
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
                        <div className={`flex items-center gap-3 w-full ${lang === "ar" ? "justify-end" : "justify-start"}`}>
                            <span className="text-slate-400">{t("onboarding.step4.receiptPlaceholder")}</span>
                            <UploadCloud className="text-[#16a085]" size={24} />
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
                >
                    {t("onboarding.step4.prev")}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!receipt || isSubmitting}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting ? t("onboarding.step4.submitting") : t("onboarding.step4.submit")}
                </button>
            </div>
        </div>
    );
}
