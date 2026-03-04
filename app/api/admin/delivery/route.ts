import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60;

export async function POST(request: Request) {
    try {
        const { isAuthenticated } = getKindeServerSession();
        if (!(await isAuthenticated())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const projectId = formData.get('projectId') as string;
        const file = formData.get('file') as File;

        if (!projectId || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upload to destination
        const fileExt = file.name.split('.').pop();
        const filePath = `deliveries/${projectId}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('delivery_files')
            .upload(filePath, file);

        if (uploadError) {
            return NextResponse.json({ error: 'Failed to upload file', details: uploadError }, { status: 500 });
        }

        const { data: fileUrlData } = supabase.storage
            .from('delivery_files')
            .getPublicUrl(filePath);

        // Store file reference in DB
        const { error: dbError } = await supabase
            .from('project_files')
            .insert({
                project_id: projectId,
                file_url: fileUrlData.publicUrl,
                file_type: 'Final Result'
            });

        if (dbError) {
            return NextResponse.json({ error: 'Failed to save file link to database', details: dbError }, { status: 500 });
        }

        return NextResponse.json({ success: true, url: fileUrlData.publicUrl });

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
