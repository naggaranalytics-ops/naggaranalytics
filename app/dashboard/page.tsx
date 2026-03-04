import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProjectsSection from "@/components/ProjectsSection";
import AcademySection from "@/components/AcademySection";
import NewRequestForm from "@/components/NewRequestForm";

export const runtime = 'edge';

export default async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="space-y-16 pb-20">
            {/* Welcome Header */}
            <section>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                    Welcome back, <span className="text-primary">{user?.given_name || "Researcher"}</span>
                </h1>
                <p className="text-slate-400 mt-2">Manage your data analysis projects and access educational content.</p>
            </section>

            {/* Projects Section */}
            <ProjectsSection userId={user?.id || ""} />

            {/* Academy Section */}
            <AcademySection />

            {/* New Request Form */}
            <NewRequestForm userId={user?.id || ""} />
        </div>
    );
}
