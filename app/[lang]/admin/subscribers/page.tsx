export const runtime = 'edge';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import AdminSubscribersTab from "../AdminSubscribersTab";

export default async function AdminSubscribersPage() {
    const { isAuthenticated } = getKindeServerSession();
    const isAuth = await isAuthenticated();

    if (!isAuth) {
        redirect("/api/auth/login");
    }

    return (
        <div className="p-8 max-w-7xl mx-auto" dir="rtl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-arabic text-white mb-2">المشتركون بالبريد</h1>
                <p className="text-slate-400 font-arabic">استعرض القائمة البريدية لعملائك لتبدأ في مراسلتهم.</p>
            </header>

            <AdminSubscribersTab />
        </div>
    );
}
