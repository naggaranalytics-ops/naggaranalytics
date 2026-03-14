"use client";

import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";

export default function Step1Academic() {
    const { lang, t } = useLanguage();
    const { academicDetails, updateAcademicDetails, nextStep } = useOnboarding();

    const getWordCount = (text: string): number => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const wordCount = getWordCount(academicDetails.thesisTitle);
    const hasMinimumWords = wordCount >= 3;

    const isComplete = academicDetails.degree !== "" && academicDetails.thesisTitle.trim() !== "" && hasMinimumWords;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-right">
                <h2 className="text-2xl font-bold font-arabic text-white mb-2">{t("onboarding.step1.title")}</h2>
                <p className="text-slate-400 text-sm font-arabic">{t("onboarding.step1.subtitle")}</p>
            </div>

            <div className="space-y-4 text-right">
                <div>
                    <label htmlFor="degreeSelect" className="block text-sm font-medium text-slate-300 mb-2 font-arabic">{t("onboarding.step1.degree")} <span className="text-red-500">*</span></label>
                    <select
                        id="degreeSelect"
                        title={t("onboarding.step1.degreeSelect")}
                        value={academicDetails.degree}
                        onChange={(e) => updateAcademicDetails({ degree: e.target.value as any })}
                        className="w-full bg-[#111821] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#16a085] focus:border-transparent outline-none transition-all font-arabic"
                        dir="rtl"
                    >
                        <option value="" disabled>{t("onboarding.step1.degreeSelect")}</option>
                        <option value="Masters">{t("onboarding.step1.degreeMasters")}</option>
                        <option value="PhD">{t("onboarding.step1.degreePhd")}</option>
                        <option value="Other">{t("onboarding.step1.degreeOther")}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 font-arabic">{t("onboarding.step1.thesisTitle")} <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={academicDetails.thesisTitle}
                        onChange={(e) => updateAcademicDetails({ thesisTitle: e.target.value })}
                        placeholder={t("onboarding.step1.thesisTitlePlaceholder")}
                        className={`w-full bg-[#111821] border rounded-xl px-4 py-3 text-white focus:ring-2 focus:border-transparent outline-none transition-all font-arabic placeholder:text-slate-600 ${
                            academicDetails.thesisTitle.trim() !== "" && !hasMinimumWords
                                ? "border-red-500/50 focus:ring-red-500/50"
                                : "border-white/10 focus:ring-[#16a085]"
                        }`}
                        dir={lang === "ar" ? "rtl" : "ltr"}
                    />
                    {academicDetails.thesisTitle.trim() !== "" && !hasMinimumWords && (
                        <p className="text-red-500 text-sm mt-2 font-arabic">{t("onboarding.step1.thesisTitleError")} ({wordCount} {lang === "ar" ? "كلمة" : wordCount === 1 ? "word" : "words"})</p>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                    onClick={nextStep}
                    disabled={!isComplete}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("onboarding.step1.next")}
                </button>
            </div>
        </div>
    );
}
