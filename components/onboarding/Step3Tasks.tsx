"use client";

import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { Check } from "lucide-react";

export default function Step3Tasks() {
    const { tasks, updateTasks, calculateTotal, nextStep, prevStep } = useOnboarding();

    const taskList = [
        { id: "cleaning", label: "تنظيف وتهيئة البيانات (Data Cleaning)", desc: "مراجعة القيم المفقودة والمتطرفة", price: 200 },
        { id: "descriptive", label: "التحليل الوصفي (Descriptive Stats)", desc: "الجداول التكرارية والرسومات البيانية", price: 100 },
        { id: "inferential", label: "التحليل الاستدلالي (Inferential Stats)", desc: "T-Test, ANOVA, Regression, الخ", price: 200 },
        { id: "writing", label: "كتابة النتائج والمناقشة", desc: "كتابة تقرير شامل والرد على الملاحظات", price: 100 },
    ];

    const isComplete = Object.values(tasks).some(v => v === true);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-right">
                <h2 className="text-2xl font-bold font-arabic text-white mb-2">الخدمات المطلوبة</h2>
                <p className="text-slate-400 text-sm font-arabic">حدد الخدمات الإحصائية التي تحتاجها لمشروعك.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {taskList.map((task) => {
                    const isSelected = tasks[task.id as keyof typeof tasks];
                    return (
                        <div
                            key={task.id}
                            onClick={() => updateTasks({ [task.id]: !isSelected })}
                            className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all duration-300 ${isSelected ? 'bg-[#16a085]/10 border-[#16a085]' : 'bg-[#111821] border-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="text-left font-mono font-bold text-[#16a085] flex-shrink-0">
                                ${task.price}
                            </div>

                            <div className="flex items-center gap-4 text-right">
                                <div>
                                    <h3 className="text-white font-bold font-arabic text-lg">{task.label}</h3>
                                    <p className="text-sm text-slate-400 font-arabic">{task.desc}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#16a085] border-[#16a085]' : 'bg-[#050a10] border-slate-600'
                                    }`}>
                                    {isSelected && <Check size={14} className="text-white" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#111821] border border-white/5 rounded-xl p-6 flex justify-between items-center mt-8">
                <div className="text-3xl font-bold text-[#16a085] font-mono">${calculateTotal()}</div>
                <div className="text-right font-arabic">
                    <div className="text-lg font-bold text-white">التكلفة التقديرية</div>
                    <div className="text-xs text-slate-400">الأسعار قابلة للمراجعة بعد تقييم الملفات</div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all font-arabic"
                >
                    السابق
                </button>
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
