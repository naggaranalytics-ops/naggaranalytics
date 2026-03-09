import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isAuthed = await isAuthenticated();

    if (!isAuthed) {
        redirect("/api/auth/login");
    }

    const user = await getUser();
    const isRtl = params.lang === 'ar';

    return (
        <div className="min-h-screen bg-[#050a10] text-white flex">
            <Sidebar user={{ name: user?.given_name || null, email: user?.email || null }} />
            {/* Main content — offset by sidebar width on desktop */}
            <main className={`flex-1 ${isRtl ? 'md:mr-64' : 'md:ml-64'} pt-6 px-4 sm:px-6 lg:px-8 pb-20 min-h-screen`}>
                {children}
            </main>
            <WhatsAppWidget />
        </div>
    );
}
