"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const NewRequestForm = ({ userId }: { userId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [topic, setTopic] = useState("");
    const [university, setUniversity] = useState("");

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !topic || !university) return;

        setLoading(true);
        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split(".").pop();
            const fileName = `${userId}-${Math.random()}.${fileExt}`;
            const filePath = `requests/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("thesis-files")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("thesis-files")
                .getPublicUrl(filePath);

            // 3. Save to thesis_requests table
            const { error: dbError } = await supabase.from("thesis_requests").insert([
                {
                    user_id: userId,
                    topic,
                    university,
                    file_url: publicUrl,
                    status: "pending",
                },
            ]);

            if (dbError) throw dbError;

            setSuccess(true);
            setTopic("");
            setUniversity("");
            setFile(null);
            router.refresh();

            setTimeout(() => setSuccess(false), 5000);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="new-request" className="scroll-mt-24">
            <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">New Analysis Request</h2>
                    <p className="text-slate-400 mb-8">Upload your dataset and project details for professional statistical review.</p>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Thesis Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g. Impact of AI on Healthcare"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">University</label>
                                <input
                                    type="text"
                                    value={university}
                                    onChange={(e) => setUniversity(e.target.value)}
                                    placeholder="e.g. King Saud University"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Upload Dataset (Excel/SPSS)</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".xlsx,.xls,.sav,.csv"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    aria-label="Upload dataset"
                                    required
                                />
                                <div className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center transition-all ${file ? "border-primary bg-primary/5" : "border-white/10 bg-white/5 hover:border-white/20"
                                    }`}>
                                    <div className={`p-4 rounded-full mb-3 ${file ? "bg-primary text-white" : "bg-white/5 text-slate-400"}`}>
                                        {file ? <CheckCircle2 size={32} /> : <FileUp size={32} />}
                                    </div>
                                    <p className="font-medium text-white">{file ? file.name : "Select your file"}</p>
                                    <p className="text-slate-500 text-xs mt-1">Excel or SPSS files supported</p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Upload size={20} className="group-hover:-translate-y-1 transition-transform" />
                                    Submit Request
                                </>
                            )}
                        </button>

                        {success && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm text-center flex items-center justify-center gap-2">
                                <CheckCircle2 size={16} />
                                Your request has been submitted successfully!
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewRequestForm;
