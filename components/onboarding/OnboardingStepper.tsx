"use client";

import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";
import Step1Academic from "./Step1Academic";
import Step2Files from "./Step2Files";
import Step3Tasks from "./Step3Tasks";
import Step4Payment from "./Step4Payment";

export default function OnboardingStepper() {
    const { step } = useOnboarding();
    const { t } = useLanguage();

    const steps = [
        { num: 1, title: t("onboarding.stepper.step1") },
        { num: 2, title: t("onboarding.stepper.step2") },
        { num: 3, title: t("onboarding.stepper.step3") },
        { num: 4, title: t("onboarding.stepper.step4") },
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
                                {s.num}
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
                {step === 2 && <Step2Files />}
                {step === 3 && <Step3Tasks />}
                {step === 4 && <Step4Payment />}
            </div>
        </div>
    );
}
