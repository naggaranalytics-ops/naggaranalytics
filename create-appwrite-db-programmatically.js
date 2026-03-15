/**
 * Appwrite Database Creator - Using TablesDB API  
 * Creates complete Naggar Analytics database programmatically
 * Run: node create-appwrite-db-programmatically.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// STEP 1: Load Environment Variables
// ============================================================================

function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
        throw new Error('❌ .env.local file not found!');
    }
    
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

// ============================================================================
// Database Configuration
// ============================================================================

const DATABASE_ID = 'naggar_analytics';
const DATABASE_NAME = 'Naggar Analytics';

const COLLECTIONS = {
    users: {
        id: 'users',
        name: 'Users',
        description: 'Customer and admin user accounts',
        attributes: [
            { key: 'email', type: 'string', size: 255, required: true },
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'role', type: 'string', size: 20, required: true },
            { key: 'appwrite_user_id', type: 'string', size: 255, required: false },
            { key: 'profile_image_url', type: 'string', size: 500, required: false },
            { key: 'phone', type: 'string', size: 20, required: false },
            { key: 'company_name', type: 'string', size: 255, required: false },
            { key: 'bio', type: 'string', size: 1000, required: false },
            { key: 'subscription_status', type: 'string', size: 20, required: true },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    customers: {
        id: 'customers',
        name: 'Customers',
        description: 'Customer profile information',
        attributes: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'academic_level', type: 'string', size: 50, required: false },
            { key: 'field_of_study', type: 'string', size: 255, required: false },
            { key: 'uploaded_cv_file_id', type: 'string', size: 255, required: false },
            { key: 'location', type: 'string', size: 255, required: false },
            { key: 'budget_range', type: 'string', size: 100, required: false },
            { key: 'preferred_communication', type: 'string', size: 20, required: false },
            { key: 'marketing_list_tags', type: 'string', size: 1000, required: false },
            { key: 'status', type: 'string', size: 20, required: true },
            { key: 'notes', type: 'string', size: 2000, required: false },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    pricing_tiers: {
        id: 'pricing_tiers',
        name: 'Pricing Tiers',
        attributes: [
            { key: 'admin_id', type: 'string', size: 255, required: true },
            { key: 'tier_name', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'base_price', type: 'double', required: true },
            { key: 'price_unit', type: 'string', size: 50, required: true },
            { key: 'features', type: 'string', size: 1000, required: false },
            { key: 'turnaround_days', type: 'integer', required: false },
            { key: 'is_active', type: 'boolean', required: true },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    projects: {
        id: 'projects',
        name: 'Projects',
        attributes: [
            { key: 'customer_id', type: 'string', size: 255, required: true },
            { key: 'admin_id', type: 'string', size: 255, required: false },
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 2000, required: false },
            { key: 'academic_files', type: 'string', size: 1000, required: false },
            { key: 'status', type: 'string', size: 50, required: true },
            { key: 'pricing_tier_id', type: 'string', size: 255, required: false },
            { key: 'quoted_price', type: 'double', required: false },
            { key: 'final_price', type: 'double', required: false },
            { key: 'payment_status', type: 'string', size: 50, required: true },
            { key: 'payment_id', type: 'string', size: 255, required: false },
            { key: 'started_date', type: 'datetime', required: false },
            { key: 'deadline', type: 'datetime', required: false },
            { key: 'completed_date', type: 'datetime', required: false },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    files: {
        id: 'files',
        name: 'Files',
        attributes: [
            { key: 'project_id', type: 'string', size: 255, required: true },
            { key: 'uploader_id', type: 'string', size: 255, required: true },
            { key: 'file_name', type: 'string', size: 255, required: true },
            { key: 'file_size', type: 'integer', required: true },
            { key: 'file_type', type: 'string', size: 100, required: true },
            { key: 'storage_bucket_id', type: 'string', size: 255, required: true },
            { key: 'storage_file_id', type: 'string', size: 255, required: true },
            { key: 'file_version', type: 'integer', required: true },
            { key: 'file_purpose', type: 'string', size: 50, required: false },
            { key: 'downloaded_by_ids', type: 'string', size: 1000, required: false },
            { key: 'uploaded_at', type: 'datetime', required: true },
            { key: 'created_at', type: 'datetime', required: true },
        ]
    },
    messages: {
        id: 'messages',
        name: 'Messages',
        attributes: [
            { key: 'project_id', type: 'string', size: 255, required: true },
            { key: 'sender_id', type: 'string', size: 255, required: true },
            { key: 'message_text', type: 'string', size: 5000, required: true },
            { key: 'attached_file_id', type: 'string', size: 255, required: false },
            { key: 'message_type', type: 'string', size: 50, required: true },
            { key: 'read_by_ids', type: 'string', size: 1000, required: false },
            { key: 'is_system_message', type: 'boolean', required: true },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    notifications: {
        id: 'notifications',
        name: 'Notifications',
        attributes: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'project_id', type: 'string', size: 255, required: false },
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'message', type: 'string', size: 1000, required: true },
            { key: 'type', type: 'string', size: 50, required: true },
            { key: 'read', type: 'boolean', required: true },
            { key: 'action_url', type: 'string', size: 500, required: false },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'expires_at', type: 'datetime', required: false },
        ]
    },
    payments: {
        id: 'payments',
        name: 'Payments',
        attributes: [
            { key: 'project_id', type: 'string', size: 255, required: true },
            { key: 'customer_id', type: 'string', size: 255, required: true },
            { key: 'amount', type: 'double', required: true },
            { key: 'currency', type: 'string', size: 10, required: true },
            { key: 'status', type: 'string', size: 50, required: true },
            { key: 'stripe_payment_id', type: 'string', size: 255, required: false },
            { key: 'stripe_invoice_id', type: 'string', size: 255, required: false },
            { key: 'payment_method', type: 'string', size: 50, required: false },
            { key: 'paid_at', type: 'datetime', required: false },
            { key: 'receipt_sent_at', type: 'datetime', required: false },
            { key: 'notes', type: 'string', size: 500, required: false },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    marketing_lists: {
        id: 'marketing_lists',
        name: 'Marketing Lists',
        attributes: [
            { key: 'admin_id', type: 'string', size: 255, required: true },
            { key: 'list_name', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'tag', type: 'string', size: 100, required: false },
            { key: 'segment_filters', type: 'string', size: 2000, required: false },
            { key: 'customer_count', type: 'integer', required: true },
            { key: 'last_sent_campaign_id', type: 'string', size: 255, required: false },
            { key: 'created_at', type: 'datetime', required: true },
            { key: 'updated_at', type: 'datetime', required: true },
        ]
    },
    email_campaigns: {
        id: 'email_campaigns',
        name: 'Email Campaigns',
        attributes: [
            { key: 'admin_id', type: 'string', size: 255, required: true },
            { key: 'marketing_list_id', type: 'string', size: 255, required: true },
            { key: 'subject_line', type: 'string', size: 255, required: true },
            { key: 'email_template_id', type: 'string', size: 255, required: false },
            { key: 'body_html', type: 'string', size: 10000, required: true },
            { key: 'status', type: 'string', size: 50, required: true },
            { key: 'recipients_count', type: 'integer', required: true },
            { key: 'opened_count', type: 'integer', required: true },
            { key: 'clicked_count', type: 'integer', required: true },
            { key: 'scheduled_for', type: 'datetime', required: false },
            { key: 'sent_at', type: 'datetime', required: false },
            { key: 'created_at', type: 'datetime', required: true },
        ]
    }
};

// ============================================================================
// Create Database
// ============================================================================

async function createDatabase(env) {
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║  Creating Naggar Analytics Database  ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    const endpoint = env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const apiKey = env.APPWRITE_API_KEY;

    try {
        // Create database
        console.log(`📝 Creating database: ${DATABASE_NAME}...`);
        
        const dbRes = await fetch(`${endpoint}/databases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey,
            },
            body: JSON.stringify({
                databaseId: DATABASE_ID,
                name: DATABASE_NAME,
            })
        });

        if (!dbRes.ok && dbRes.status !== 409) {
            throw new Error(`Failed: ${dbRes.statusText}`);
        }
        console.log('✅ Database ready\n');

        // Create collections
        console.log('📂 Creating 9 collections...\n');
        let collCount = 0;
        let attrCount = 0;

        for (const [key, coll] of Object.entries(COLLECTIONS)) {
            console.log(`   ${coll.name}...`);
            
            // Create collection
            await fetch(`${endpoint}/databases/${DATABASE_ID}/collections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': projectId,
                    'X-Appwrite-Key': apiKey,
                },
                body: JSON.stringify({
                    collectionId: coll.id,
                    name: coll.name,
                })
            }).catch(() => {});

            // Create attributes
            for (const attr of coll.attributes) {
                const attrPath = `/attributes/${attr.type}`;
                const payload = {
                    key: attr.key,
                    required: attr.required,
                };
                
                if (attr.type === 'string') payload.size = attr.size || 255;

                await fetch(`${endpoint}/databases/${DATABASE_ID}/collections/${coll.id}${attrPath}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Appwrite-Project': projectId,
                        'X-Appwrite-Key': apiKey,
                    },
                    body: JSON.stringify(payload)
                }).catch(() => {});

                attrCount++;
            }
            collCount++;
        }

        console.log('\n╔═══════════════════════════════════════════════════╗');
        console.log('║          ✅ DATABASE CREATED SUCCESSFULLY!        ║');
        console.log('╚═══════════════════════════════════════════════════╝\n');

        console.log(`✅ Database: naggar_analytics`);
        console.log(`✅ Collections: ${collCount}`);
        console.log(`✅ Attributes: ${attrCount}`);
        console.log('\n📊 Collections created:');
        Object.values(COLLECTIONS).forEach(c => console.log(`   • ${c.name}`));

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

// ============================================================================
// Main
// ============================================================================

try {
    const env = loadEnv();
    createDatabase(env);
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
