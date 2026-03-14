import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, ID } from '@/lib/appwrite-server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { job_title, full_name, email, whatsapp, why_join } = body;

        if (!job_title || !full_name || !email || !whatsapp || !why_join) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const { databases } = createAdminClient();

        await databases.createDocument({
            databaseId:   DATABASE_ID,
            collectionId: COLLECTIONS.CAREER_APPLICATIONS,
            documentId:   ID.unique(),
            data: {
                job_title,
                full_name,
                email,
                whatsapp,
                why_join,
                status:     'pending',
                created_at: new Date().toISOString(),
            },
        });

        // Email notification (Resend)
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;

        if (RESEND_API_KEY && ADMIN_EMAIL) {
            fetch('https://api.resend.com/emails', {
                method:  'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({
                    from:    'Naggar Analytics <onboarding@resend.dev>',
                    to:      [ADMIN_EMAIL],
                    subject: `New Career Application: ${job_title}`,
                    html: `
                        <h2>New Job Application</h2>
                        <p><strong>Position:</strong> ${job_title}</p>
                        <p><strong>Name:</strong> ${full_name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                        <p><strong>Why join:</strong><br/>${why_join}</p>
                    `,
                }),
            }).catch(() => {}); // don't block response on email failure
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('apply error:', message);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
