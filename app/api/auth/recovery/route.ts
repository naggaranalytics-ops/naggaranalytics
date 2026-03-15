export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/recovery
 * Body: { email, lang }
 *
 * Sends a password recovery email via Appwrite.
 */
export async function POST(req: NextRequest) {
    try {
        const { email, lang = 'en' } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
        const origin    = req.nextUrl.origin;

        // The URL Appwrite will redirect the user to after clicking the recovery link
        const recoveryUrl = `${origin}/${lang}/reset-password`;

        const res = await fetch(`${endpoint}/account/recovery`, {
            method: 'POST',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
            },
            body: JSON.stringify({
                email,
                url: recoveryUrl,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json(
                { error: err.message || 'Failed to send recovery email.' },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
