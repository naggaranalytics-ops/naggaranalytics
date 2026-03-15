import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionUser, SESSION_COOKIE } from '@/lib/appwrite-auth';
import TechnicianLayoutShell from './TechnicianLayoutShell';

export default async function TechnicianLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params?: { lang?: string };
}) {
    const lang = params?.lang ?? 'en';

    const cookieStore = await cookies();
    const session     = cookieStore.get(SESSION_COOKIE)?.value;
    const user        = await getSessionUser(session);

    if (!user) {
        redirect(`/${lang}/login`);
    }

    // Technician check: user must have the "technician" label (set in Appwrite Console)
    // Also allow admins to access the technician panel
    const isTechnician =
        user.labels?.includes('technician') ||
        user.labels?.includes('admin') ||
        user.email === process.env.ADMIN_EMAIL;

    if (!isTechnician) {
        redirect(`/${lang}/dashboard`);
    }

    return <TechnicianLayoutShell user={user}>{children}</TechnicianLayoutShell>;
}
