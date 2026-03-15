"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";

export default function Step2NDA() {
    const { lang, t } = useLanguage();
    const { nda, updateNDA, nextStep, prevStep } = useOnboarding();
    const [showFull, setShowFull] = useState(false);
    const isRtl = lang === "ar";

    const handleSign = () => {
        updateNDA({
            agreed: true,
            signedAt: new Date().toISOString(),
        });
    };

    const handleUnsign = () => {
        updateNDA({
            agreed: false,
            signedAt: null,
        });
    };

    const isComplete = nda.agreed && nda.signatureName.trim().length >= 3;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {t("onboarding.step2nda.title")}
                </h2>
                <p className="text-slate-400 text-sm">
                    {t("onboarding.step2nda.subtitle")}
                </p>
            </div>

            {/* NDA Trust Badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#16a085]/10 border border-[#16a085]/20">
                <div className="w-10 h-10 rounded-full bg-[#16a085]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16a085]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                </div>
                <p className={`text-sm text-[#16a085] font-medium ${isRtl ? "text-right" : "text-left"}`}>
                    {t("onboarding.step2nda.trustBadge")}
                </p>
            </div>

            {/* NDA Document */}
            <div className="rounded-xl border border-white/10 bg-[#0a0f17] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#111821]">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-300">
                            {t("onboarding.step2nda.documentTitle")}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="text-xs text-[#16a085] hover:text-[#1abc9c] transition-colors"
                    >
                        {showFull ? t("onboarding.step2nda.showLess") : t("onboarding.step2nda.showMore")}
                    </button>
                </div>

                <div className={`px-5 py-4 space-y-4 text-sm text-slate-300 leading-relaxed overflow-y-auto transition-all duration-300 ${showFull ? "max-h-[500px]" : "max-h-[240px]"} ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
                    <p className="font-bold text-white text-base">
                        {t("onboarding.step2nda.ndaHeading")}
                    </p>

                    <p>{t("onboarding.step2nda.ndaIntro")}</p>

                    <div>
                        <p className="font-semibold text-white mb-1">{t("onboarding.step2nda.clause1Title")}</p>
                        <p>{t("onboarding.step2nda.clause1Body")}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-white mb-1">{t("onboarding.step2nda.clause2Title")}</p>
                        <p>{t("onboarding.step2nda.clause2Body")}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-white mb-1">{t("onboarding.step2nda.clause3Title")}</p>
                        <p>{t("onboarding.step2nda.clause3Body")}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-white mb-1">{t("onboarding.step2nda.clause4Title")}</p>
                        <p>{t("onboarding.step2nda.clause4Body")}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-white mb-1">{t("onboarding.step2nda.clause5Title")}</p>
                        <p>{t("onboarding.step2nda.clause5Body")}</p>
                    </div>
                </div>

                {!showFull && (
                    <div className="h-8 bg-gradient-to-t from-[#0a0f17] to-transparent -mt-8 relative z-10 pointer-events-none" />
                )}
            </div>

            {/* Signature Section */}
            <div className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t("onboarding.step2nda.signatureLabel")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={nda.signatureName}
                        onChange={(e) => updateNDA({ signatureName: e.target.value })}
                        placeholder={t("onboarding.step2nda.signaturePlaceholder")}
                        className="w-full bg-[#111821] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#16a085] focus:border-transparent outline-none transition-all placeholder:text-slate-600 font-serif italic text-lg"
                        dir={isRtl ? "rtl" : "ltr"}
                    />
                    {nda.signatureName.trim().length > 0 && nda.signatureName.trim().length < 3 && (
                        <p className="text-red-500 text-sm mt-2">{t("onboarding.step2nda.signatureError")}</p>
                    )}
                </div>

                {/* Agreement Checkbox */}
                <label className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border transition-all ${nda.agreed ? "border-[#16a085]/40 bg-[#16a085]/5" : "border-white/10 bg-[#111821] hover:border-white/20"}`}>
                    <div className="relative flex-shrink-0 mt-0.5">
                        <input
                            type="checkbox"
                            checked={nda.agreed}
                            onChange={() => nda.agreed ? handleUnsign() : handleSign()}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${nda.agreed ? "bg-[#16a085] border-[#16a085]" : "border-slate-600 group-hover:border-slate-400"}`}>
                            {nda.agreed && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed">
                        {t("onboarding.step2nda.agreeText")}
                    </span>
                </label>

                {/* Signed Confirmation */}
                {nda.agreed && nda.signedAt && (
                    <div className="flex items-center gap-2 text-sm text-[#16a085]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            {t("onboarding.step2nda.signedOn")} {new Date(nda.signedAt).toLocaleDateString(isRtl ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    className="text-slate-400 hover:text-white font-bold py-3 px-8 rounded-xl transition-all border border-white/10 hover:border-white/20"
                >
                    {t("onboarding.step2nda.prev")}
                </button>
                <button
                    onClick={nextStep}
                    disabled={!isComplete}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("onboarding.step2nda.next")}
                </button>
            </div>
        </div>
    );
}
