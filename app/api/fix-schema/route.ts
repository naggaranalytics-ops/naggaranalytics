export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';

export async function GET() {
    try {
        const { databases } = createAdminClient();

        // Check and add attributes if missing
        const attributes = [
            { key: 'customer_id', size: 255, type: 'string' },
            { key: 'degree_type', size: 255, type: 'string' },
            { key: 'nda_signature', size: 500, type: 'string' },
            { key: 'nda_signed_at', size: 255, type: 'string' },
            { key: 'nda_agreed', type: 'boolean' },
            { key: 'technician_id', size: 255, type: 'string' },
            { key: 'quoted_price', size: 255, type: 'string' },
            { key: 'delivery_url', size: 2048, type: 'string' },
        ];

        const results = [];

        for (const attr of attributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(
                        DATABASE_ID,
                        COLLECTIONS.PROJECTS,
                        attr.key,
                        attr.size || 255,
                        false, // not required
                        undefined
                    );
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(
                        DATABASE_ID,
                        COLLECTIONS.PROJECTS,
                        attr.key,
                        false, // not required
                        false // default
                    );
                }
                results.push({ key: attr.key, status: 'added' });
            } catch (err: any) {
                if (err.message?.includes('already exists')) {
                    results.push({ key: attr.key, status: 'already_exists' });
                } else {
                    results.push({ key: attr.key, status: 'error', error: err.message });
                }
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
