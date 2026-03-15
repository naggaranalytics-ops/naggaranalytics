export const runtime = 'edge';

import { cookies } from 'next/headers';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';
import { OnboardingProvider } from "@/context/OnboardingContext";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import NewProjectHeader from "@/components/onboarding/NewProjectHeader";

export default async function NewProjectPage() {
    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <NewProjectHeader />

            <OnboardingProvider>
                <OnboardingStepper />
            </OnboardingProvider>
        </div>
    );
}
