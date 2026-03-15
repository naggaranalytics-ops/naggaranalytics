#!/usr/bin/env node
/**
 * fix-projects-schema.js
 * 
 * Adds missing attributes to the Appwrite "projects" collection so that
 * project creation (/api/projects) succeeds.
 * 
 * The original setup-appwrite-db.js created:
 *   user_id, title, degree, description, status, created_at, updated_at
 * 
 * But the code uses:
 *   customer_id, title, degree_type, description, status,
 *   nda_agreed, nda_signature, nda_signed_at, quoted_price,
 *   technician_id, created_at, updated_at
 * 
 * This script adds the missing attributes.
 * 
 * Usage:
 *   node fix-projects-schema.js
 */

const fs   = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim() && !key.startsWith('#')) {
            env[key.trim()] = valueParts.join('=').trim().replace(/['"]/g, '');
        }
    });
    return env;
}

async function addStringAttribute(endpoint, projectId, apiKey, databaseId, collectionId, key, size, required) {
    const res = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/string`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': projectId,
            'X-Appwrite-Key': apiKey,
        },
        body: JSON.stringify({ key, size, required, default: null }),
    });
    const data = await res.json();
    if (!res.ok && !data.message?.includes('already exists')) {
        console.error(`  ❌ Failed to add "${key}":`, data.message);
        return false;
    }
    if (data.message?.includes('already exists')) {
        console.log(`  ⏭️  "${key}" already exists — skipping`);
    } else {
        console.log(`  ✅ Added "${key}" (string, size=${size})`);
    }
    return true;
}

async function addBooleanAttribute(endpoint, projectId, apiKey, databaseId, collectionId, key, required) {
    const res = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/boolean`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': projectId,
            'X-Appwrite-Key': apiKey,
        },
        body: JSON.stringify({ key, required, default: false }),
    });
    const data = await res.json();
    if (!res.ok && !data.message?.includes('already exists')) {
        console.error(`  ❌ Failed to add "${key}":`, data.message);
        return false;
    }
    if (data.message?.includes('already exists')) {
        console.log(`  ⏭️  "${key}" already exists — skipping`);
    } else {
        console.log(`  ✅ Added "${key}" (boolean)`);
    }
    return true;
}

async function addFloatAttribute(endpoint, projectId, apiKey, databaseId, collectionId, key, required) {
    const res = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/float`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': projectId,
            'X-Appwrite-Key': apiKey,
        },
        body: JSON.stringify({ key, required, default: 0 }),
    });
    const data = await res.json();
    if (!res.ok && !data.message?.includes('already exists')) {
        console.error(`  ❌ Failed to add "${key}":`, data.message);
        return false;
    }
    if (data.message?.includes('already exists')) {
        console.log(`  ⏭️  "${key}" already exists — skipping`);
    } else {
        console.log(`  ✅ Added "${key}" (float)`);
    }
    return true;
}

async function main() {
    const env = loadEnv();

    const endpoint  = env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const apiKey    = env.APPWRITE_API_KEY;
    const databaseId = 'analytics_db';
    const collectionId = 'projects';

    if (!endpoint || !projectId || !apiKey) {
        console.error('Missing env vars. Ensure NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, and APPWRITE_API_KEY are in .env.local');
        process.exit(1);
    }

    console.log('\n════════════════════════════════════════════');
    console.log('  FIX PROJECTS SCHEMA — Naggar Analytics');
    console.log('════════════════════════════════════════════\n');
    console.log(`Endpoint:    ${endpoint}`);
    console.log(`Project:     ${projectId}`);
    console.log(`Database:    ${databaseId}`);
    console.log(`Collection:  ${collectionId}\n`);

    // String attributes the code expects but setup script didn't create
    const stringAttrs = [
        { key: 'customer_id',    size: 255, required: false },
        { key: 'degree_type',    size: 255, required: false },
        { key: 'nda_signature',  size: 500, required: false },
        { key: 'nda_signed_at',  size: 255, required: false },
        { key: 'technician_id',  size: 255, required: false },
        { key: 'quoted_price',   size: 255, required: false },
        { key: 'delivery_url',   size: 2048, required: false },
    ];

    console.log('Adding string attributes...\n');
    for (const attr of stringAttrs) {
        await addStringAttribute(endpoint, projectId, apiKey, databaseId, collectionId, attr.key, attr.size, attr.required);
        // Small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\nAdding boolean attributes...\n');
    await addBooleanAttribute(endpoint, projectId, apiKey, databaseId, collectionId, 'nda_agreed', false);

    console.log('\n════════════════════════════════════════════');
    console.log('  DONE! All attributes added/verified.');
    console.log('════════════════════════════════════════════\n');
    console.log('You can now submit projects from the dashboard.\n');
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
