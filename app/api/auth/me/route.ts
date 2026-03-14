import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, getSessionUser } from '@/lib/appwrite-auth';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    const user    = await getSessionUser(session);

    if (!user) {
        return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    }

    return NextResponse.json(user);
}
