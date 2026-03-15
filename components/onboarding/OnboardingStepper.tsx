"use client";

import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";
import Step1Academic from "./Step1Academic";
import Step2NDA from "./Step2NDA";
import Step3Files from "./Step3Files";
import Step4Tasks from "./Step4Tasks";
import Step5Payment from "./Step5Payment";

export default function OnboardingStepper() {
    const { step } = useOnboarding();
    const { t } = useLanguage();

    const steps = [
        { num: 1, title: t("onboarding.stepper.step1") },
        { num: 2, title: t("onboarding.stepper.step2") },
        { num: 3, title: t("onboarding.stepper.step3") },
        { num: 4, title: t("onboarding.stepper.step4") },
        { num: 5, title: t("onboarding.stepper.step5") },
    ];

    return (
        <div className="max-w-3xl mx-auto w-full">
            {/* Stepper Header */}
            <div className="mb-12">
                <div className="flex justify-between items-center relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:bg-white/10 before:w-full before:z-0">
                    {steps.map((s, idx) => (
                        <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === s.num
                                    ? "bg-[#16a085] text-white ring-4 ring-[#16a085]/20 shadow-lg shadow-[#16a085]/40"
                                    : step > s.num
                                        ? "bg-[#16a085] text-white"
                                        : "bg-[#111821] text-slate-500 border-2 border-slate-700"
                                }`}>
                                {step > s.num ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    s.num
                                )}
                            </div>
                            <span className={`text-xs font-bold hidden md:block transition-colors ${step >= s.num ? "text-white" : "text-slate-500"
                                }`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stepper Body */}
            <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5 bg-[#111821]/80 shadow-2xl">
                {step === 1 && <Step1Academic />}
                {step === 2 && <Step2NDA />}
                {step === 3 && <Step3Files />}
                {step === 4 && <Step4Tasks />}
                {step === 5 && <Step5Payment />}
            </div>
        </div>
    );
}
