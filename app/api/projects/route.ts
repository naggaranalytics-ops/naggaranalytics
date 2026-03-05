export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // Max execution time for vercel/cloudflare

export async function POST(request: Request) {
    try {
        const { getUser, isAuthenticated } = getKindeServerSession();
        if (!(await isAuthenticated())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const user = await getUser();
        if (!user || !user.id) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        const formData = await request.formData();

        // Parse Form Data
        const degree = formData.get('degree') as string;
        const thesisTitle = formData.get('thesisTitle') as string;
        const tasksStr = formData.get('tasks') as string;
        const totalStr = formData.get('total') as string;
        const paymentPhase = formData.get('paymentPhase') as string;
        const receiptFile = formData.get('receipt') as File | null;

        if (!degree || !thesisTitle || !tasksStr || !totalStr || !receiptFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const tasks = JSON.parse(tasksStr);
        const total = parseFloat(totalStr);

        // Upload Receipt
        const receiptExt = receiptFile.name.split('.').pop();
        const receiptPath = `receipts/${user.id}/${crypto.randomUUID()}.${receiptExt}`;

        const { error: receiptError } = await supabase.storage
            .from('client_uploads')
            .upload(receiptPath, receiptFile);

        if (receiptError) {
            console.error("Receipt upload error:", receiptError);
            return NextResponse.json({ error: 'Failed to upload receipt', details: receiptError }, { status: 500 });
        }

        const { data: receiptUrlData } = supabase.storage
            .from('client_uploads')
            .getPublicUrl(receiptPath);

        // Create Project in Database
        const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                thesis_title: thesisTitle,
                degree: degree,
                selected_tasks: tasks,
                total_price: total,
                payment_phase: paymentPhase,
                receipt_url: receiptUrlData.publicUrl,
                status: 'Pending',
                is_verified: false
            })
            .select('id')
            .single();

        if (projectError) {
            console.error("Project insert error:", projectError);
            return NextResponse.json({ error: 'Failed to create project record', details: projectError }, { status: 500 });
        }

        const projectId = projectData.id;

        // Process Additional Files (Raw Data & Docs)
        const allFiles = formData.getAll('files') as File[];

        for (const file of allFiles) {
            const fileExt = file.name.split('.').pop();
            const filePath = `project_data/${user.id}/${projectId}/${crypto.randomUUID()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

            const { error: uploadError } = await supabase.storage
                .from('client_uploads')
                .upload(filePath, file);

            if (uploadError) {
                console.error(`Failed to upload file ${file.name}:`, uploadError);
                continue; // Skip database entry if upload fails, but continue other files
            }

            const { data: fileUrlData } = supabase.storage
                .from('client_uploads')
                .getPublicUrl(filePath);

            await supabase
                .from('project_files')
                .insert({
                    project_id: projectId,
                    file_url: fileUrlData.publicUrl,
                    file_type: 'Raw Data', // Defaulting to raw data for now
                    uploaded_by: user.id
                });
        }

        return NextResponse.json({ success: true, projectId });

    } catch (error: any) {
        console.error("Submission Error:", error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
