export const runtime = 'edge';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "@/lib/supabase";
import DashboardPageContent from "@/components/DashboardPageContent";

export default async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const { data: projects, error } = await supabase
        .from('projects')
        .select(`*, project_files(file_url, file_type)`)
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false });

    return <DashboardPageContent user={user} projects={projects || []} error={error} />;
}
