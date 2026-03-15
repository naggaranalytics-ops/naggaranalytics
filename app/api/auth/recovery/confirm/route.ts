export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/recovery/confirm
 * Body: { userId, secret, password }
 *
 * Confirms the password recovery by setting a new password.
 */
export async function POST(req: NextRequest) {
    try {
        const { userId, secret, password } = await req.json();

        if (!userId || !secret || !password) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
        }

        const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

        const res = await fetch(`${endpoint}/account/recovery`, {
            method: 'PUT',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
            },
            body: JSON.stringify({
                userId,
                secret,
                password,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json(
                { error: err.message || 'Failed to reset password.' },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
