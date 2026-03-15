import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * POST /api/auth/magic-url
 * Body: { email, lang }
 *
 * Sends a magic-link email via Appwrite.
 * The link will point back to /api/auth/magic-url/confirm?userId=x&secret=y&lang=z
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

        // The URL Appwrite will redirect the user to after clicking the magic link
        const confirmUrl = `${origin}/api/auth/magic-url/confirm?lang=${lang}`;

        // Create a magic URL token via Appwrite REST API
        const res = await fetch(`${endpoint}/account/tokens/magic-url`, {
            method: 'POST',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
            },
            body: JSON.stringify({
                userId: 'unique()',
                email,
                url: confirmUrl,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json(
                { error: err.message || 'Failed to send magic link.' },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
