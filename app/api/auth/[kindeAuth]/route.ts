// Kinde auth has been removed. Auth is now handled by Appwrite.
// See: /api/auth/login, /api/auth/logout, /api/auth/register, /api/auth/me
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json({ error: 'Auth endpoint removed. Use /api/auth/login.' }, { status: 410 });
}
