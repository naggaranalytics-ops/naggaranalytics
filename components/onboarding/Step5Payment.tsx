"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";

export default function Step5Payment() {
    const { lang, t } = useLanguage();
    const { calculateRange, prevStep, academicDetails, nda, tasks, files, googleDriveLink } = useOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const isRtl = lang === "ar";

    const range = calculateRange();

    const selectedServices = Object.entries(tasks)
        .filter(([, selected]) => selected)
        .map(([key]) => key);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('degree', academicDetails.degree);
            formData.append('thesisTitle', academicDetails.thesisTitle);
            formData.append('tasks', JSON.stringify(tasks));
            formData.append('estimatedMin', range.min.toString());
            formData.append('estimatedMax', range.max.toString());
            formData.append('ndaAgreed', String(nda.agreed));
            formData.append('ndaSignature', nda.signatureName);
            formData.append('ndaSignedAt', nda.signedAt || new Date().toISOString());
            if (googleDriveLink) {
                formData.append('googleDriveLink', googleDriveLink);
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
                throw new Error(data.error || t("onboarding.step5.errorMsg"));
            }

            setSubmitted(true);

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success state
    if (submitted) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
                <div className="w-20 h-20 rounded-full bg-[#16a085]/20 flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t("onboarding.step5.successTitle")}</h2>
                <p className="text-slate-400 max-w-md mx-auto">{t("onboarding.step5.successMsg")}</p>
                <div className="bg-[#111821] border border-white/5 rounded-xl p-4 max-w-sm mx-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t("onboarding.step5.successStep1")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        <span>{t("onboarding.step5.successStep2")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                        <span>{t("onboarding.step5.successStep3")}</span>
                    </div>
                </div>
                <button
                    onClick={() => window.location.href = `/${lang}/dashboard`}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 mt-4"
                >
                    {t("onboarding.step5.goToDashboard")}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-bold text-white mb-2">{t("onboarding.step5.title")}</h2>
                <p className="text-slate-400 text-sm">{t("onboarding.step5.subtitle")}</p>
            </div>

            {/* Project Summary Card */}
            <div className="bg-[#111821] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className={`text-lg font-bold text-white flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <svg className="w-5 h-5 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                    {t("onboarding.step5.summaryTitle")}
                </h3>

                {/* Thesis Info */}
                <div className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t("onboarding.step1.degree")}</span>
                        <span className="text-white font-medium">{academicDetails.degree}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t("onboarding.step1.thesisTitle")}</span>
                        <span className="text-white font-medium max-w-[200px] truncate" dir="ltr">{academicDetails.thesisTitle}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t("onboarding.step5.filesCount")}</span>
                        <span className="text-white font-medium">{files.length} {isRtl ? "ملفات" : files.length === 1 ? "file" : "files"}</span>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                    <p className={`text-xs text-slate-500 uppercase tracking-wider mb-3 ${isRtl ? "text-right" : "text-left"}`}>
                        {t("onboarding.step5.selectedServices")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {selectedServices.map((key) => (
                            <span key={key} className="bg-[#16a085]/10 text-[#16a085] border border-[#16a085]/20 text-xs font-medium px-3 py-1.5 rounded-full">
                                {t(`onboarding.step3.${key}`)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Estimated Range */}
                <div className="border-t border-white/5 pt-4">
                    <div className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`}>
                        <span className="text-slate-400 text-sm">{t("onboarding.step3.estimatedRange")}</span>
                        <span className="text-xl font-bold text-[#16a085] font-mono">${range.min} – ${range.max}</span>
                    </div>
                </div>

                {/* NDA Status */}
                <div className="border-t border-white/5 pt-4">
                    <div className={`flex items-center gap-2 text-sm ${isRtl ? "flex-row-reverse" : ""}`}>
                        <svg className="w-4 h-4 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        <span className="text-[#16a085] font-medium">{t("onboarding.step5.ndaSigned")}</span>
                        <span className="text-slate-500">— {nda.signatureName}</span>
                    </div>
                </div>
            </div>

            {/* What Happens Next */}
            <div className={`bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 ${isRtl ? "text-right" : "text-left"}`}>
                <h4 className={`text-sm font-bold text-blue-300 mb-3 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    {t("onboarding.step5.whatsNext")}
                </h4>
                <ol className={`space-y-2 text-sm text-blue-200/70 ${isRtl ? "list-decimal list-inside" : "list-decimal list-inside"}`}>
                    <li>{t("onboarding.step5.nextStep1")}</li>
                    <li>{t("onboarding.step5.nextStep2")}</li>
                    <li>{t("onboarding.step5.nextStep3")}</li>
                </ol>
            </div>

            {/* Navigation */}
            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
                >
                    {t("onboarding.step5.prev")}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t("onboarding.step5.submitting")}
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            {t("onboarding.step5.submit")}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
