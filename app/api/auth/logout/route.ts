import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const sessionValue = req.cookies.get(SESSION_COOKIE)?.value;
    const projectId    = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

    if (sessionValue) {
        // Delete the session in Appwrite (fire and forget)
        fetch(
            `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/current`,
            {
                method:  'DELETE',
                headers: {
                    'X-Appwrite-Project': projectId,
                    'Cookie': `a_session_${projectId}=${sessionValue}`,
                },
            }
        ).catch(() => {});
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE);
    return response;
}
