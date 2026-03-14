import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
        }

        const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
        const headers   = { 'Content-Type': 'application/json', 'X-Appwrite-Project': projectId };

        // 1. Create account
        const createRes = await fetch(`${endpoint}/account`, {
            method:  'POST',
            headers,
            body: JSON.stringify({ userId: 'unique()', email, password, name }),
        });

        if (!createRes.ok) {
            const err = await createRes.json();
            return NextResponse.json({ error: err.message }, { status: createRes.status });
        }

        // 2. Create session automatically
        const sessionRes = await fetch(`${endpoint}/account/sessions/email`, {
            method:  'POST',
            headers,
            body: JSON.stringify({ email, password }),
        });

        if (!sessionRes.ok) {
            // Account created but auto-login failed — client should redirect to login
            return NextResponse.json({ success: true, message: 'Account created. Please log in.' });
        }

        const session = await sessionRes.json();

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, session.secret, {
            httpOnly: true,
            secure:   process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge:   60 * 60 * 24 * 30,
            path:     '/',
        });

        return response;
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
