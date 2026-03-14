/**
 * Appwrite Server SDK — for use in API routes (Edge Runtime compatible)
 *
 * createAdminClient()   → uses API key, for admin-level DB/Storage operations
 * createSessionClient() → uses user session secret, for user-context operations
 */

import { Client, Databases, Account, Storage, ID, Query } from 'node-appwrite';

const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY    = process.env.APPWRITE_API_KEY!;

/** Admin client — full privileges, use only in server/API routes, never expose to browser */
export function createAdminClient() {
    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(API_KEY);

    return {
        databases: new Databases(client),
        account:   new Account(client),
        storage:   new Storage(client),
    };
}

/** Session client — acts on behalf of a logged-in user */
export function createSessionClient(sessionSecret: string) {
    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setSession(sessionSecret);

    return {
        account:   new Account(client),
        databases: new Databases(client),
    };
}

// Re-export useful SDK utilities
export { ID, Query };

// Database / collection constants
export const DATABASE_ID = 'analytics_db';

export const COLLECTIONS = {
    USERS:               'users',
    CUSTOMERS:           'customers',
    PROJECTS:            'projects',
    FILES:               'files',
    MESSAGES:            'messages',
    NOTIFICATIONS:       'notifications',
    PAYMENTS:            'payments',
    PRICING_TIERS:       'pricing_tiers',
    MARKETING_LISTS:     'marketing_lists',
    EMAIL_CAMPAIGNS:     'email_campaigns',
    CAREER_APPLICATIONS: 'career_applications',
    SUBSCRIBERS:         'subscribers',
} as const;

export const BUCKETS = {
    CLIENT_UPLOADS: 'client_uploads',
    DELIVERY_FILES: 'delivery_files',
} as const;

/** Build a public view URL for a file stored in Appwrite Storage */
export function getFileUrl(bucketId: string, fileId: string): string {
    return `${ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${PROJECT_ID}`;
}
