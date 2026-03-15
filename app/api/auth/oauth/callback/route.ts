import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

/**
 * GET /api/auth/oauth/callback?userId=xxx&secret=yyy&lang=en
 *
 * Called by Appwrite after a successful OAuth2 login.
 * Appwrite passes `userId` and `secret` as query params.
 * We store the secret in an HTTP-only cookie and redirect to the dashboard.
 */
export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');
    const lang   = req.nextUrl.searchParams.get('lang') || 'en';
    const origin = req.nextUrl.origin;

    if (!secret) {
        // No secret means OAuth failed or was cancelled
        return NextResponse.redirect(`${origin}/${lang}/login?error=oauth_failed`);
    }

    // Set the session cookie and redirect to dashboard
    const response = NextResponse.redirect(`${origin}/${lang}/dashboard`);
    response.cookies.set(SESSION_COOKIE, secret, {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge:   60 * 60 * 24 * 30, // 30 days
        path:     '/',
    });

    return response;
}
