/**
 * Appwrite Migration: Add technician_id attribute to Projects collection
 * 
 * This script adds the 'technician_id' string attribute to the existing
 * 'projects' collection in 'analytics_db'. Run this once before using
 * the Technician Dashboard feature.
 * 
 * REQUIRES: APPWRITE_API_KEY in .env.local
 * 
 * Usage:
 *   node add-technician-id.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};

    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim() && !key.startsWith('#')) {
            const value = valueParts.join('=').trim().replace(/['"]/g, '');
            env[key.trim()] = value;
        }
    });

    return env;
}

async function addTechnicianId() {
    try {
        const env = loadEnv();

        const endpoint  = env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
        const projectId = env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
        const apiKey    = env.APPWRITE_API_KEY;

        if (!apiKey) {
            throw new Error('APPWRITE_API_KEY not found in .env.local');
        }

        const databaseId   = 'analytics_db';
        const collectionId = 'projects';

        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║   ADDING technician_id ATTRIBUTE TO PROJECTS COLLECTION   ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        // Create a string attribute via Appwrite REST API
        const url = `${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/string`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':       'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key':     apiKey,
            },
            body: JSON.stringify({
                key:      'technician_id',
                size:     255,
                required: false,
                default:  null,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            if (err.message?.includes('already exists')) {
                console.log('⚠️  Attribute "technician_id" already exists. No action needed.\n');
                return;
            }
            throw new Error(err.message || `HTTP ${res.status}`);
        }

        const result = await res.json();
        console.log('✅ Attribute "technician_id" created successfully!\n');
        console.log('   Key:      ', result.key);
        console.log('   Type:     ', result.type);
        console.log('   Required: ', result.required);
        console.log('   Status:   ', result.status);
        console.log('\n📝 Next Steps:\n');
        console.log('   1. Go to Appwrite Console → analytics_db → projects');
        console.log('   2. Assign a technician_id to a project manually to test');
        console.log('   3. Add the "technician" label to an Appwrite user');
        console.log('   4. Log in as that user and visit /technician\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addTechnicianId();
