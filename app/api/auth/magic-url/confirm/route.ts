import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

/**
 * GET /api/auth/magic-url/confirm?userId=xxx&secret=yyy&lang=en
 *
 * Called when the user clicks the magic link in their email.
 * Appwrite appends userId and secret as query params.
 * We create a session, store it as an HTTP-only cookie, and redirect to dashboard.
 */
export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    const secret = req.nextUrl.searchParams.get('secret');
    const lang   = req.nextUrl.searchParams.get('lang') || 'en';
    const origin = req.nextUrl.origin;

    if (!userId || !secret) {
        return NextResponse.redirect(`${origin}/${lang}/login?error=invalid_link`);
    }

    const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

    try {
        // Create a session from the magic URL token
        const res = await fetch(`${endpoint}/account/sessions/magic-url`, {
            method: 'PUT',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
            },
            body: JSON.stringify({ userId, secret }),
        });

        if (!res.ok) {
            return NextResponse.redirect(`${origin}/${lang}/login?error=magic_link_expired`);
        }

        // Extract session value from X-Fallback-Cookies header
        const fallbackCookies = res.headers.get('X-Fallback-Cookies');
        let sessionValue = '';

        if (fallbackCookies) {
            try {
                const parsed = JSON.parse(fallbackCookies);
                sessionValue = parsed[`a_session_${projectId}`] ?? '';
            } catch { /* ignore parse errors */ }
        }

        if (!sessionValue) {
            return NextResponse.redirect(`${origin}/${lang}/login?error=session_failed`);
        }

        // Set the session cookie and redirect to dashboard
        const response = NextResponse.redirect(`${origin}/${lang}/dashboard`);
        response.cookies.set(SESSION_COOKIE, sessionValue, {
            httpOnly: true,
            secure:   process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge:   60 * 60 * 24 * 30, // 30 days
            path:     '/',
        });

        return response;
    } catch {
        return NextResponse.redirect(`${origin}/${lang}/login?error=magic_link_failed`);
    }
}
