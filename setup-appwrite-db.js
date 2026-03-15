/**
 * Appwrite Database Setup Script for Naggar Analytics
 * 
 * Creates "analytics_db" database with all collections and attributes
 * 
 * REQUIRES: APPWRITE_API_KEY in .env.local
 * 
 * Usage:
 *   1. Add APPWRITE_API_KEY to .env.local
 *   2. Run: node setup-appwrite-db.js
 */

const { Client, Databases, ID } = require('appwrite');
const fs = require('fs');
const path = require('path');

// Load environment variables
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

// Initialize Appwrite client
function initializeClient(env) {
    if (!env.APPWRITE_API_KEY) {
        throw new Error('APPWRITE_API_KEY not found in .env.local');
    }

    const client = new Client()
        .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(env.APPWRITE_API_KEY);

    return new Databases(client);
}

// Database setup
async function setupDatabase() {
    try {
        const env = loadEnv();
        const databases = initializeClient(env);

        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║       SETTING UP APPWRITE DATABASE - NAGGAR ANALYTICS      ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        const dbId = ID.unique();
        const dbName = 'analytics_db';

        // Step 1: Create Database
        console.log('Step 1️⃣  Creating database: ' + dbName);
        const db = await databases.create(dbId, dbName);
        console.log('✅ Database created:', db.$id, '\n');

        // Step 2: Create Collections
        console.log('Step 2️⃣  Creating collections...\n');

        // Collection 1: Users
        console.log('  Creating "users" collection...');
        const usersCol = await databases.createCollection(
            db.$id,
            'users',
            'users'
        );

        // Add users attributes
        const userAttrs = [
            { key: 'email', type: 'string', required: true, array: false },
            { key: 'name', type: 'string', required: true, array: false },
            { key: 'kinde_id', type: 'string', required: false, array: false },
            { key: 'created_at', type: 'datetime', required: false, array: false },
            { key: 'updated_at', type: 'datetime', required: false, array: false }
        ];

        for (const attr of userAttrs) {
            await databases.createStringAttribute(
                db.$id,
                'users',
                attr.key,
                255,
                attr.required
            );
        }
        console.log('  ✅ users collection created\n');

        // Collection 2: Projects
        console.log('  Creating "projects" collection...');
        const projectsCol = await databases.createCollection(
            db.$id,
            'projects',
            'projects'
        );

        const projectAttrs = [
            { key: 'user_id', type: 'string', required: true },
            { key: 'title', type: 'string', required: true },
            { key: 'degree', type: 'string', required: true },
            { key: 'description', type: 'string', required: false },
            { key: 'status', type: 'string', required: true },
            { key: 'created_at', type: 'datetime', required: false },
            { key: 'updated_at', type: 'datetime', required: false }
        ];

        for (const attr of projectAttrs) {
            await databases.createStringAttribute(
                db.$id,
                'projects',
                attr.key,
                attr.key === 'title' || attr.key === 'description' ? 1000 : 255,
                attr.required
            );
        }
        console.log('  ✅ projects collection created\n');

        // Collection 3: Files
        console.log('  Creating "files" collection...');
        const filesCol = await databases.createCollection(
            db.$id,
            'files',
            'files'
        );

        const fileAttrs = [
            { key: 'project_id', type: 'string', required: true },
            { key: 'user_id', type: 'string', required: true },
            { key: 'file_name', type: 'string', required: true },
            { key: 'file_size', type: 'integer', required: true },
            { key: 'file_type', type: 'string', required: true },
            { key: 'storage_bucket', type: 'string', required: true },
            { key: 'uploaded_at', type: 'datetime', required: false }
        ];

        for (const attr of fileAttrs) {
            if (attr.type === 'integer') {
                await databases.createIntegerAttribute(
                    db.$id,
                    'files',
                    attr.key,
                    attr.required
                );
            } else {
                await databases.createStringAttribute(
                    db.$id,
                    'files',
                    attr.key,
                    255,
                    attr.required
                );
            }
        }
        console.log('  ✅ files collection created\n');

        // Collection 4: Tasks
        console.log('  Creating "tasks" collection...');
        const tasksCol = await databases.createCollection(
            db.$id,
            'tasks',
            'tasks'
        );

        const taskAttrs = [
            { key: 'project_id', type: 'string', required: true },
            { key: 'title', type: 'string', required: true },
            { key: 'description', type: 'string', required: false },
            { key: 'status', type: 'string', required: true },
            { key: 'due_date', type: 'datetime', required: false },
            { key: 'created_at', type: 'datetime', required: false },
            { key: 'updated_at', type: 'datetime', required: false }
        ];

        for (const attr of taskAttrs) {
            await databases.createStringAttribute(
                db.$id,
                'tasks',
                attr.key,
                attr.key === 'description' ? 1000 : 255,
                attr.required
            );
        }
        console.log('  ✅ tasks collection created\n');

        // Collection 5: Payments
        console.log('  Creating "payments" collection...');
        const paymentsCol = await databases.createCollection(
            db.$id,
            'payments',
            'payments'
        );

        const paymentAttrs = [
            { key: 'user_id', type: 'string', required: true },
            { key: 'project_id', type: 'string', required: false },
            { key: 'amount', type: 'double', required: true },
            { key: 'currency', type: 'string', required: true },
            { key: 'status', type: 'string', required: true },
            { key: 'transaction_id', type: 'string', required: false },
            { key: 'created_at', type: 'datetime', required: false },
            { key: 'updated_at', type: 'datetime', required: false }
        ];

        for (const attr of paymentAttrs) {
            if (attr.type === 'double') {
                await databases.createFloatAttribute(
                    db.$id,
                    'payments',
                    attr.key,
                    attr.required
                );
            } else {
                await databases.createStringAttribute(
                    db.$id,
                    'payments',
                    attr.key,
                    255,
                    attr.required
                );
            }
        }
        console.log('  ✅ payments collection created\n');

        console.log('═══════════════════════════════════════════════════════════\n');
        console.log('✅ DATABASE SETUP COMPLETE!\n');
        console.log('Database ID: ' + db.$id);
        console.log('Database Name: ' + dbName);
        console.log('\nCollections Created:');
        console.log('  1. users     - User accounts & profiles');
        console.log('  2. projects  - Research/analytics projects');
        console.log('  3. files     - Uploaded files');
        console.log('  4. tasks     - Project tasks');
        console.log('  5. payments  - Payment records');
        console.log('\n═══════════════════════════════════════════════════════════\n');

        console.log('📝 Next Steps:\n');
        console.log('1. Update your Next.js app to use this database:');
        console.log('   • Import Databases from lib/appwrite.ts');
        console.log('   • Use ID: ' + db.$id + '\n');

        console.log('2. Create indexes (optional, for performance):');
        console.log('   • Index user_id in projects collection');
        console.log('   • Index project_id in files/tasks collections\n');

        console.log('3. Configure permissions (optional):');
        console.log('   • Users read/write own projects');
        console.log('   • Admins read everything\n');

        return db.$id;

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('APPWRITE_API_KEY')) {
            console.log('\n📌 SETUP FAILED: Missing API Key\n');
            console.log('Steps to fix:');
            console.log('1. Go to: https://cloud.appwrite.io/');
            console.log('2. Select "Naggar Analytics" project');
            console.log('3. Settings → API Keys → Create API Key');
            console.log('4. Copy the key');
            console.log('5. Add to .env.local:');
            console.log('   APPWRITE_API_KEY=your_key_here');
            console.log('6. Run this script again\n');
        }
        process.exit(1);
    }
}

// Run setup
if (require.main === module) {
    setupDatabase();
}

module.exports = { setupDatabase };
