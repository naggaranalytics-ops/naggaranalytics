export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export async function POST(request: NextRequest) {
    try {
        // Delete current session
        await account.deleteSession('current');

        return NextResponse.json({
            status: 'success',
            message: 'Logged out successfully'
        }, { status: 200 });

    } catch (error: any) {
        console.error('Logout error:', error.message);

        return NextResponse.json(
            { error: error.message || 'Logout failed' },
            { status: 500 }
        );
    }
}
