/**
 * Auth utilities for Appwrite sessions
 * Uses fetch directly → guaranteed Edge Runtime compatible on Cloudflare Pages
 *
 * Appwrite session cookies are stored as the raw "a_session_PROJECT_ID" cookie value.
 * We send them back to Appwrite as Cookie: a_session_PROJECT_ID=VALUE
 */

export const SESSION_COOKIE = 'appwrite-session';

const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

/** Validate a session cookie and return the Appwrite user, or null if invalid */
export async function getSessionUser(
    sessionValue: string | undefined
): Promise<AppwriteUser | null> {
    if (!sessionValue) return null;
    try {
        const res = await fetch(`${ENDPOINT}/account`, {
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': PROJECT_ID,
                // Send the stored value as the Appwrite session cookie
                'Cookie': `a_session_${PROJECT_ID}=${sessionValue}`,
            },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

/** Minimal Appwrite user type returned by GET /account */
export interface AppwriteUser {
    $id:    string;
    email:  string;
    name:   string;
    labels: string[];
    prefs:  Record<string, unknown>;
}
