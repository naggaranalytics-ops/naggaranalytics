import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { job_title, full_name, email, whatsapp, why_join } = body;

        if (!job_title || !full_name || !email || !whatsapp || !why_join) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase
            .from("career_applications")
            .insert([{ job_title, full_name, email, whatsapp, why_join }]);

        if (error) {
            console.error("Supabase insert error:", error.message);
            return NextResponse.json({ error: "Failed to save application." }, { status: 500 });
        }

        // Send email notification to Admin via Resend REST API (if configured)
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if (RESEND_API_KEY && ADMIN_EMAIL) {
            try {
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${RESEND_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'Naggar Analytics <onboarding@resend.dev>',
                        to: [ADMIN_EMAIL],
                        subject: `New Career Application: ${job_title}`,
                        html: `
                            <h2>New Job Application Received</h2>
                            <p><strong>Position:</strong> ${job_title}</p>
                            <p><strong>Name:</strong> ${full_name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                            <br/>
                            <p><strong>Why join us:</strong></p>
                            <p>${why_join}</p>
                        `
                    })
                });
            } catch (emailErr) {
                console.error("Failed to send email notification:", emailErr);
                // We don't fail the submission if email fails
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("API error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
