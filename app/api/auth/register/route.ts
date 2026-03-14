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
            body: JSON.stringify({ userId: crypto.randomUUID(), email, password, name }),
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
            return NextResponse.json({ success: true, message: 'Account created. Please log in.' });
        }

        // Appwrite sends the session cookie value in X-Fallback-Cookies header
        const fallbackCookies = sessionRes.headers.get('X-Fallback-Cookies');
        let sessionValue = '';

        if (fallbackCookies) {
            try {
                const parsed = JSON.parse(fallbackCookies);
                sessionValue = parsed[`a_session_${projectId}`] ?? '';
            } catch { /* ignore parse errors */ }
        }

        if (!sessionValue) {
            return NextResponse.json({ success: true, message: 'Account created. Please log in.' });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, sessionValue, {
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
