"use client";

import React, { useRef } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { UploadCloud, X, File as FileIcon } from "lucide-react";

export default function Step2Files() {
    const { files, setFiles, nextStep, prevStep } = useOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles([...files, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-right">
                <h2 className="text-2xl font-bold font-arabic text-white mb-2">رفع الملفات</h2>
                <p className="text-slate-400 text-sm font-arabic">يرجى رفع بياناتك الخام (Excel/CSV) وأي مستندات داعمة مثل الاستبيان.</p>
            </div>

            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#16a085]/50 bg-[#16a085]/5 hover:bg-[#16a085]/10 transition-colors rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer text-center"
            >
                <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <UploadCloud className="w-12 h-12 text-[#16a085] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-arabic">اضغط هنا لرفع الملفات</h3>
                <p className="text-sm text-slate-400 font-arabic">أو قم بسحب وإسقاط الملفات هنا. الحد الأقصى 50 ميغابايت.</p>
            </div>

            {files.length > 0 && (
                <div className="space-y-3 mt-6">
                    <h4 className="text-right text-sm font-bold text-slate-300 font-arabic">الملفات المرفوعة:</h4>
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#111821] border border-white/10">
                            <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                                <X size={18} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm text-white font-medium truncate max-w-[200px] md:max-w-md">{file.name}</p>
                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-[#16a085]/10 flex items-center justify-center text-[#16a085]">
                                    <FileIcon size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all font-arabic"
                >
                    السابق
                </button>
                <button
                    onClick={nextStep}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 font-arabic"
                >
                    التالي
                </button>
            </div>
        </div>
    );
}
