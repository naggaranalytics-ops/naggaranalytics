import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }

    const user = await getUser();

    if (user && user.id) {
        // Sync user with Supabase
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (!profile && !error) {
            // Create new profile
            await supabase.from("profiles").insert([
                {
                    id: user.id,
                    email: user.email,
                    full_name: `${user.given_name || ""} ${user.family_name || ""}`.trim(),
                    avatar_url: user.picture,
                },
            ]);
        }
    }

    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 ml-0 md:ml-64">
                <div className="max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
