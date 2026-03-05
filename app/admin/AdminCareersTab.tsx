"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Application {
    id: string;
    created_at: string;
    job_title: string;
    full_name: string;
    email: string;
    whatsapp: string;
    why_join: string;
}

export default function AdminCareersTab() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/applications")
            .then((r) => r.json())
            .then((d) => { setApplications(d.data ?? []); setLoading(false); })
            .catch(() => { setError("Failed to load applications"); setLoading(false); });
    }, []);

    if (loading) return (
        <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">Loading applications…</div>
    );
    if (error) return (
        <div className="text-center py-20 text-red-400 text-sm">{error}</div>
    );
    if (applications.length === 0) return (
        <div className="text-center py-20 bg-[#111821] border-dashed border border-white/10 rounded-2xl">
            <Briefcase size={32} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-500 font-arabic">لا توجد طلبات توظيف حتى الآن.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <p className="text-slate-500 text-xs font-mono mb-6">{applications.length} application{applications.length !== 1 ? "s" : ""} received</p>
            {applications.map((app) => (
                <div key={app.id} className="bg-[#111821] border border-white/5 hover:border-[#16a085]/30 rounded-2xl p-6 transition-all">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#16a085] border border-[#16a085]/30 px-2 py-0.5 rounded-full">
                                    {app.job_title}
                                </span>
                                <div className="flex items-center gap-1 text-slate-600 text-xs font-mono">
                                    <Calendar size={11} />
                                    {new Date(app.created_at).toLocaleDateString("en-GB")}
                                </div>
                            </div>
                            <h3 className="text-white font-bold text-base">{app.full_name}</h3>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#16a085] transition-colors">
                                    <Mail size={12} /> {app.email}
                                </a>
                                <a href={`https://wa.me/${app.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#16a085] transition-colors">
                                    <Phone size={12} /> {app.whatsapp}
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                            className="flex items-center gap-1.5 text-xs text-[#16a085] border border-[#16a085]/30 px-3 py-1.5 rounded-lg hover:bg-[#16a085]/10 transition-all shrink-0"
                        >
                            {expanded === app.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {expanded === app.id ? "Hide" : "Read Why"}
                        </button>
                    </div>

                    {expanded === app.id && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Why they want to join</p>
                            <p className="text-slate-300 text-sm leading-relaxed">{app.why_join}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
