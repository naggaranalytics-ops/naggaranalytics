"use client";

import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Step1Academic() {
    const { academicDetails, updateAcademicDetails, nextStep } = useOnboarding();

    const isComplete = academicDetails.degree !== "" && academicDetails.thesisTitle.trim() !== "";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-right">
                <h2 className="text-2xl font-bold font-arabic text-white mb-2">التفاصيل الأكاديمية</h2>
                <p className="text-slate-400 text-sm font-arabic">يرجى تقديم تفاصيل الدرجة العلمية وعنوان البحث لبدء مشروعك.</p>
            </div>

            <div className="space-y-4 text-right">
                <div>
                    <label htmlFor="degreeSelect" className="block text-sm font-medium text-slate-300 mb-2 font-arabic">الدرجة العلمية <span className="text-red-500">*</span></label>
                    <select
                        id="degreeSelect"
                        title="اختر الدرجة العلمية"
                        value={academicDetails.degree}
                        onChange={(e) => updateAcademicDetails({ degree: e.target.value as any })}
                        className="w-full bg-[#111821] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#16a085] focus:border-transparent outline-none transition-all font-arabic"
                        dir="rtl"
                    >
                        <option value="" disabled>اختر الدرجة العلمية</option>
                        <option value="Masters">الماجستير (Master's)</option>
                        <option value="PhD">الدكتوراه (PhD)</option>
                        <option value="Other">أخرى (Other)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 font-arabic">عنوان الرسالة / البحث <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={academicDetails.thesisTitle}
                        onChange={(e) => updateAcademicDetails({ thesisTitle: e.target.value })}
                        placeholder="أدخل عنوان البحث هنا..."
                        className="w-full bg-[#111821] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#16a085] focus:border-transparent outline-none transition-all font-arabic placeholder:text-slate-600"
                        dir="rtl"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                    onClick={nextStep}
                    disabled={!isComplete}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    التالي
                </button>
            </div>
        </div>
    );
}
