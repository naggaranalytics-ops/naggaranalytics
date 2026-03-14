import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
        }

        const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

        const res = await fetch(`${endpoint}/account/sessions/email`, {
            method: 'POST',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json(
                { error: err.message || 'Invalid email or password.' },
                { status: 401 }
            );
        }

        // Appwrite sends the session cookie value in X-Fallback-Cookies header
        // Format: {"a_session_PROJECT_ID": "BASE64_SESSION_VALUE"}
        const fallbackCookies = res.headers.get('X-Fallback-Cookies');
        let sessionValue = '';

        if (fallbackCookies) {
            try {
                const parsed = JSON.parse(fallbackCookies);
                sessionValue = parsed[`a_session_${projectId}`] ?? '';
            } catch { /* ignore parse errors */ }
        }

        if (!sessionValue) {
            return NextResponse.json({ error: 'Failed to establish session.' }, { status: 500 });
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
