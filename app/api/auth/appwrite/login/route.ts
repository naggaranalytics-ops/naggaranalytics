export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = 'naggar_analytics';
const USERS_COLLECTION = 'users';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Create session
        const session = await account.createEmailPasswordSession(email, password);

        // Get user info
        const user = await account.get();

        // Get user document from database
        const userDoc = await databases.getDocument(
            DATABASE_ID,
            USERS_COLLECTION,
            user.$id
        );

        return NextResponse.json({
            status: 'success',
            message: 'Login successful',
            user: {
                id: user.$id,
                email: user.email,
                name: user.name,
                role: userDoc.role
            },
            session: session.$id
        }, { status: 200 });

    } catch (error: any) {
        console.error('Login error:', error.message);

        if (error.message.includes('Invalid credentials')) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
