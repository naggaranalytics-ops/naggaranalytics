import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = getKindeServerSession();
    const isAuthed = await isAuthenticated();

    if (!isAuthed) {
        redirect("/api/auth/login");
    }

    return (
        <div className="min-h-screen bg-[#050a10] text-white pt-20">
            {children}
        </div>
    );
}
