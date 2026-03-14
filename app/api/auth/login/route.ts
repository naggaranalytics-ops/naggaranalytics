import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/email`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':       'application/json',
                    'X-Appwrite-Project': process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json(
                { error: err.message || 'Invalid email or password.' },
                { status: 401 }
            );
        }

        const session = await res.json();

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, session.secret, {
            httpOnly: true,
            secure:   process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge:   60 * 60 * 24 * 30, // 30 days
            path:     '/',
        });

        return response;
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
