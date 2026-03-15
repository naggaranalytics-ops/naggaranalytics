import { NextRequest, NextResponse } from 'next/server';
import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = 'naggar_analytics';
const USERS_COLLECTION = 'users';

export async function GET(request: NextRequest) {
    try {
        // Get current user
        const user = await account.get();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Get user document
        const userDoc = await databases.getDocument(
            DATABASE_ID,
            USERS_COLLECTION,
            user.$id
        );

        return NextResponse.json({
            status: 'success',
            user: {
                id: user.$id,
                email: user.email,
                name: user.name,
                role: userDoc.role,
                subscription_status: userDoc.subscription_status,
                created_at: userDoc.created_at
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error('Get user error:', error.message);

        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        );
    }
}
