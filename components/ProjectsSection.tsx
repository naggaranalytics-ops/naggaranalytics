import { supabase } from "@/lib/supabase";
import { FileText, Clock, ExternalLink } from "lucide-react";

const ProjectsSection = async ({ userId }: { userId: string }) => {
    const { data: requests, error } = await supabase
        .from("thesis_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-400">Error loading projects: {error.message}</div>;
    }

    return (
        <div id="projects" className="space-y-6 scroll-mt-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">My Projects</h2>
                <span className="text-slate-400 text-sm font-mono">{requests?.length || 0} Total</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests?.map((request) => (
                    <div
                        key={request.id}
                        className="group glass-card rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <FileText size={24} />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${request.status === "completed" ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
                                }`}>
                                {request.status || "Pending"}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {request.topic}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4">{request.university}</p>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                <Clock size={14} />
                                <span>{new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                            {request.file_url && (
                                <a
                                    href={request.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-white transition-colors"
                                    title="View Request File"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}

                {requests?.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-white/5 border border-dashed border-white/10 rounded-2xl">
                        <p className="text-slate-500">No projects found. Create your first request below.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsSection;
