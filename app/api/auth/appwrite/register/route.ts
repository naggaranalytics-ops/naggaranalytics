import { NextRequest, NextResponse } from 'next/server';
import { Client, Account, Databases, ID } from 'appwrite';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = 'naggar_analytics';
const USERS_COLLECTION = 'users';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Create auth account
        const authUser = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Create user document
        await databases.createDocument(
            DATABASE_ID,
            USERS_COLLECTION,
            authUser.$id,
            {
                email,
                name,
                appwrite_user_id: authUser.$id,
                role: 'customer',
                subscription_status: 'free',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
        );

        return NextResponse.json({
            status: 'success',
            message: 'Account created successfully',
            user: {
                id: authUser.$id,
                email: authUser.email,
                name: authUser.name
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration error:', error.message);

        if (error.message.includes('already exists')) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
