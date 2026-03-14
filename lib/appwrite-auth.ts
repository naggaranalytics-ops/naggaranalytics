/**
 * Auth utilities for Appwrite sessions
 * Uses fetch directly → guaranteed Edge Runtime compatible on Cloudflare Pages
 */

export const SESSION_COOKIE = 'appwrite-session';

const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

function appwriteHeaders(sessionSecret?: string): HeadersInit {
    const h: Record<string, string> = {
        'Content-Type':      'application/json',
        'X-Appwrite-Project': PROJECT_ID,
    };
    if (sessionSecret) h['X-Appwrite-Session'] = sessionSecret;
    return h;
}

/** Validate a session cookie and return the Appwrite user, or null if invalid */
export async function getSessionUser(
    sessionSecret: string | undefined
): Promise<AppwriteUser | null> {
    if (!sessionSecret) return null;
    try {
        const res = await fetch(`${ENDPOINT}/account`, {
            headers: appwriteHeaders(sessionSecret),
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
