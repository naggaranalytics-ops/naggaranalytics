import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;

    if (session) {
        // Delete the session in Appwrite (fire and forget — don't block on failure)
        fetch(
            `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/current`,
            {
                method:  'DELETE',
                headers: {
                    'X-Appwrite-Project': process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
                    'X-Appwrite-Session': session,
                },
            }
        ).catch(() => {});
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE);
    return response;
}
