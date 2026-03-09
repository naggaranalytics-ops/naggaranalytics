"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar } from "lucide-react";

interface Subscriber {
    id: string;
    created_at: string;
    email: string;
    source: string;
}

export default function AdminSubscribersTab() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/admin/subscribers")
            .then((r) => r.json())
            .then((d) => { setSubscribers(d.data ?? []); setLoading(false); })
            .catch(() => { setError("Failed to load subscribers"); setLoading(false); });
    }, []);

    const copyAllEmails = () => {
        const emails = subscribers.map(s => s.email).join(", ");
        navigator.clipboard.writeText(emails);
        alert("تم نسخ جميع الإيميلات بنجاح!");
    };

    if (loading) return (
        <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">Loading subscribers…</div>
    );
    if (error) return (
        <div className="text-center py-20 text-red-400 text-sm">{error}</div>
    );
    if (subscribers.length === 0) return (
        <div className="text-center py-20 bg-[#111821] border-dashed border border-white/10 rounded-2xl">
            <Mail size={32} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-500 font-arabic">لا يوجد مشتركون حتى الآن.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6 text-slate-500 text-xs font-mono">
                <p>{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}</p>
                <button
                    onClick={copyAllEmails}
                    className="flex items-center gap-1.5 text-[#16a085] hover:text-white transition-colors"
                >
                    <Mail size={12} /> نسخ العناوين البريدية
                </button>
            </div>
            {subscribers.map((sub) => (
                <div key={sub.id} className="bg-[#111821] border border-white/5 hover:border-[#16a085]/30 rounded-2xl p-6 transition-all flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-mono text-base">{sub.email}</h3>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-mono tracking-widest text-[#16a085] bg-[#16a085]/10 px-2 py-0.5 rounded-full">
                                {sub.source}
                            </span>
                            <div className="flex items-center gap-1 text-slate-600 text-xs font-mono">
                                <Calendar size={11} />
                                {new Date(sub.created_at).toLocaleDateString("en-GB")}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
