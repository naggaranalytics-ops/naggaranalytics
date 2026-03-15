const AcademySection = () => {
    return (
        <div id="academy" className="space-y-6 scroll-mt-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Research Academy</h2>
                <span className="text-slate-400 text-sm font-mono">Educational Resources</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-slate-500">Coming soon: Tutorials on Biostatistics, Regression, and Data Visualization.</p>
                </div>
            </div>
        </div>
    );
};

export default AcademySection;
