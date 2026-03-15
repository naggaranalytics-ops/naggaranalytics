"use client";

import React from "react";
import { useOnboarding, SERVICE_PRICES } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";
import { Check } from "lucide-react";

export default function Step4Tasks() {
    const { lang, t } = useLanguage();
    const { tasks, updateTasks, calculateRange, nextStep, prevStep } = useOnboarding();
    const isRtl = lang === "ar";

    const taskList = [
        { id: "cleaning",     labelKey: "onboarding.step3.cleaning",     descKey: "onboarding.step3.cleaningDesc" },
        { id: "descriptive",  labelKey: "onboarding.step3.descriptive",  descKey: "onboarding.step3.descriptiveDesc" },
        { id: "inferential",  labelKey: "onboarding.step3.inferential",  descKey: "onboarding.step3.inferentialDesc" },
        { id: "metaAnalysis", labelKey: "onboarding.step3.metaAnalysis", descKey: "onboarding.step3.metaAnalysisDesc" },
        { id: "writing",      labelKey: "onboarding.step3.writing",      descKey: "onboarding.step3.writingDesc" },
    ];

    const isComplete = Object.values(tasks).some(v => v === true);
    const range = calculateRange();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-bold text-white mb-2">{t("onboarding.step3.title")}</h2>
                <p className="text-slate-400 text-sm">{t("onboarding.step3.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {taskList.map((task) => {
                    const isSelected = tasks[task.id as keyof typeof tasks];
                    const price = SERVICE_PRICES[task.id];
                    return (
                        <div
                            key={task.id}
                            onClick={() => updateTasks({ [task.id]: !isSelected })}
                            className={`cursor-pointer border rounded-xl p-4 transition-all duration-300 ${isSelected ? 'bg-[#16a085]/10 border-[#16a085]' : 'bg-[#111821] border-white/5 hover:border-white/20'}`}
                        >
                            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                                {/* Checkbox */}
                                <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-[#16a085] border-[#16a085]' : 'bg-[#050a10] border-slate-600'}`}>
                                    {isSelected && <Check size={14} className="text-white" />}
                                </div>

                                {/* Content */}
                                <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                                    <h3 className="text-white font-bold">{t(task.labelKey)}</h3>
                                    <p className="text-sm text-slate-400 mt-0.5">{t(task.descKey)}</p>
                                </div>

                                {/* Price Range Badge */}
                                <div className={`flex-shrink-0 text-center bg-black/30 rounded-lg px-3 py-2 border ${isSelected ? "border-[#16a085]/30" : "border-white/5"}`}>
                                    <div className="text-[#16a085] font-mono font-bold text-sm">
                                        ${price.min} – ${price.max}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Estimated Range Total */}
            {isComplete && (
                <div className="bg-[#111821] border border-white/5 rounded-xl p-5 mt-6">
                    <div className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`}>
                        <div className={isRtl ? "text-right" : "text-left"}>
                            <div className="text-lg font-bold text-white">{t("onboarding.step3.estimatedRange")}</div>
                            <div className="text-xs text-slate-400 mt-1 max-w-xs">{t("onboarding.step3.pricingNote")}</div>
                        </div>
                        <div className="text-2xl font-bold text-[#16a085] font-mono whitespace-nowrap">
                            ${range.min} – ${range.max}
                        </div>
                    </div>
                </div>
            )}

            {/* Quote-based info */}
            <div className={`flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-sm text-blue-300/80 leading-relaxed">
                    {t("onboarding.step3.quoteExplanation")}
                </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                    {t("onboarding.step3.prev")}
                </button>
                <button
                    onClick={nextStep}
                    disabled={!isComplete}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("onboarding.step3.next")}
                </button>
            </div>
        </div>
    );
}
