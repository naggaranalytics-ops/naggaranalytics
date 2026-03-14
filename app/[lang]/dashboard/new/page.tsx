export const runtime = 'edge';

import { cookies } from 'next/headers';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';
import { OnboardingProvider } from "@/context/OnboardingContext";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";

export default async function NewProjectPage() {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12 border-b border-white/5 pb-8 text-center text-right">
                <h1 className="text-3xl font-bold font-arabic text-white mb-4" dir="rtl">مشروع إحصائي جديد</h1>
                <p className="text-slate-400 font-arabic max-w-2xl mx-auto" dir="rtl">أكمل الخطوات التالية لتقديم تفاصيل مشروعك وسنقوم بالبدء فوراً في التحليل.</p>
            </header>

            <OnboardingProvider>
                <OnboardingStepper />
            </OnboardingProvider>
        </div>
    );
}
