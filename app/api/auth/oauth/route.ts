import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * GET /api/auth/oauth?provider=google&lang=en
 *
 * Redirects the user to Appwrite's OAuth2 flow for the given provider.
 * After success, Appwrite redirects back to /api/auth/oauth/callback
 * with userId and secret as query params.
 */
export async function GET(req: NextRequest) {
    const provider = req.nextUrl.searchParams.get('provider');
    const lang     = req.nextUrl.searchParams.get('lang') || 'en';

    if (!provider) {
        return NextResponse.json({ error: 'Missing provider parameter' }, { status: 400 });
    }

    const endpoint  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

    // Build the origin from the request
    const origin = req.nextUrl.origin;

    const successUrl = `${origin}/api/auth/oauth/callback?lang=${lang}`;
    const failureUrl = `${origin}/${lang}/login?error=oauth_failed`;

    // Appwrite OAuth2 session creation endpoint
    const oauthUrl = `${endpoint}/account/sessions/oauth2/${provider}`
        + `?project=${projectId}`
        + `&success=${encodeURIComponent(successUrl)}`
        + `&failure=${encodeURIComponent(failureUrl)}`;

    return NextResponse.redirect(oauthUrl);
}
