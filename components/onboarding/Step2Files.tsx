"use client";

import React, { useRef, useState } from "react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useLanguage } from "../../context/LanguageProvider";
import { UploadCloud, X, File as FileIcon, AlertCircle, CheckCircle } from "lucide-react";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_FILES = 5;

const isValidGoogleDriveLink = (url: string): boolean => {
    if (!url.trim()) return true;
    const googleDrivePattern = /^https:\/\/drive\.google\.com\/(file|folders?)\/d\/[a-zA-Z0-9_-]+/;
    return googleDrivePattern.test(url);
};

export default function Step2Files() {
    const { lang, t } = useLanguage();
    const { files, setFiles, googleDriveLink, setGoogleDriveLink, nextStep, prevStep } = useOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileErrors, setFileErrors] = useState<string>("");
    const [googleDriveError, setGoogleDriveError] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            let errors = "";

            for (const file of selectedFiles) {
                if (file.size > MAX_FILE_SIZE) {
                    errors = t("onboarding.step2.fileSizeError");
                    break;
                }
            }

            if (files.length + selectedFiles.length > MAX_FILES) {
                errors = t("onboarding.step2.fileCountError");
            }

            if (errors) {
                setFileErrors(errors);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                return;
            }

            setFileErrors("");
            setFiles([...files, ...selectedFiles]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleGoogleDriveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setGoogleDriveLink(url);

        if (url && !isValidGoogleDriveLink(url)) {
            setGoogleDriveError(t("onboarding.step2.googleDriveError"));
        } else {
            setGoogleDriveError("");
        }
    };

    const isComplete = files.length > 0 && !googleDriveError;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {t("onboarding.step2.title")} <span className="text-red-500">*</span>
                </h2>
                <p className="text-slate-400 text-sm">{t("onboarding.step2.subtitle")}</p>
            </div>

            {/* File Upload Section */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#16a085]/50 bg-[#16a085]/5 hover:bg-[#16a085]/10 transition-colors rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer text-center"
            >
                <input
                    id="fileUpload"
                    title={t("onboarding.step2.uploadTitle")}
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <UploadCloud className="w-12 h-12 text-[#16a085] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{t("onboarding.step2.uploadTitle")}</h3>
                <p className="text-sm text-slate-400">{t("onboarding.step2.uploadDesc")}</p>
            </div>

            {/* File Error Messages */}
            {fileErrors && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{fileErrors}</p>
                </div>
            )}

            {/* Uploaded Files List */}
            {files.length > 0 && (
                <div className="space-y-3 mt-6">
                    <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold text-slate-300 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {lang === "ar" ? "الملفات المرفوعة:" : "Uploaded Files:"} ({files.length}/{MAX_FILES})
                        </h4>
                    </div>
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#111821] border border-white/10">
                            <button
                                onClick={() => removeFile(i)}
                                title={t("onboarding.step2.remove")}
                                aria-label="Remove file"
                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            >
                                <X size={18} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm text-white font-medium truncate max-w-[200px] md:max-w-md">{file.name}</p>
                                    <p className="text-xs text-slate-500">
                                        {t("onboarding.step2.fileSize")} {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-[#16a085]/10 flex items-center justify-center text-[#16a085]">
                                    <FileIcon size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Files Required Error */}
            {files.length === 0 && (
                <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-sm">{t("onboarding.step2.filesRequired")}</p>
                </div>
            )}

            {/* Note about large datasets */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-400 text-sm">{t("onboarding.step2.note")}</p>
            </div>

            {/* Google Drive Link Section */}
            <div className="space-y-3 pt-4 border-t border-white/10">
                <label className={`block ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-lg font-bold text-white mb-1">{t("onboarding.step2.googleDriveSection")}</h3>
                    <p className="text-xs text-slate-400">{t("onboarding.step2.googleDriveLabel")}</p>
                </label>
                <input
                    type="text"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    placeholder={t("onboarding.step2.googleDrivePlaceholder")}
                    value={googleDriveLink}
                    onChange={handleGoogleDriveChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#111821] border text-white placeholder-slate-500 transition-colors outline-none ${
                        googleDriveError
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-[#16a085]"
                    }`}
                />
                {googleDriveError && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <p className="text-red-400 text-xs">{googleDriveError}</p>
                    </div>
                )}
                {googleDriveLink && !googleDriveError && (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <p className="text-green-400 text-xs">{lang === "ar" ? "رابط صحيح ✓" : "Valid link ✓"}</p>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-white/5 flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                    {t("onboarding.step2.prev")}
                </button>
                <button
                    onClick={nextStep}
                    disabled={!isComplete}
                    className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("onboarding.step2.next")}
                </button>
            </div>
        </div>
    );
}
