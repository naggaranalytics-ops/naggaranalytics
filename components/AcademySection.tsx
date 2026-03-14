import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Play } from "lucide-react";

const AcademySection = async () => {
    const { data: content, error } = await supabase
        .from("educational_content")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-400">Error loading academy content: {error.message}</div>;
    }

    return (
        <div id="academy" className="space-y-6 scroll-mt-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Research Academy</h2>
                <span className="text-slate-400 text-sm font-mono">Educational Resources</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content?.map((item) => (
                    <div
                        key={item.id}
                        className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1"
                    >
                        <div className="aspect-video bg-secondary relative flex items-center justify-center">
                            {item.thumbnail_url ? (
                                <Image
                                    src={item.thumbnail_url}
                                    alt={item.title}
                                    fill
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-primary/5" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/20 transform group-hover:scale-110 transition-transform">
                                    <Play size={32} fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-sm line-clamp-2">
                                {item.description || "Master statistical concepts with our expert-led tutorials."}
                            </p>

                            <a
                                href={item.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                            >
                                Watch Video
                            </a>
                        </div>
                    </div>
                ))}

                {content?.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-slate-500">Coming soon: Tutorials on Biostatistics, Regression, and Data Visualization.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademySection;
