/**
 * Enhanced Appwrite Database Setup for Naggar Analytics Dashboard
 * 
 * Creates analytics_db with 10 collections for the customer dashboard platform:
 * 1. users
 * 2. customers
 * 3. projects
 * 4. files
 * 5. messages
 * 6. notifications
 * 7. payments
 * 8. pricing_tiers
 * 9. marketing_lists
 * 10. email_campaigns
 * 
 * REQUIRES: APPWRITE_API_KEY in .env.local
 * 
 * Usage:
 *   1. Add APPWRITE_API_KEY to .env.local
 *   2. Run: node setup-dashboard-db.js
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
        .setDevKey(env.APPWRITE_API_KEY);
    
    return new Databases(client);
}

// Helper to create string attribute
async function createStringAttr(db, dbId, collId, key, size = 255, required = false) {
    try {
        await db.createStringAttribute(dbId, collId, key, size, required);
    } catch (e) {
        if (!e.message.includes('attribute already exists')) throw e;
    }
}

// Helper to create integer attribute
async function createIntAttr(db, dbId, collId, key, required = false) {
    try {
        await db.createIntegerAttribute(dbId, collId, key, required);
    } catch (e) {
        if (!e.message.includes('attribute already exists')) throw e;
    }
}

// Helper to create float attribute
async function createFloatAttr(db, dbId, collId, key, required = false) {
    try {
        await db.createFloatAttribute(dbId, collId, key, required);
    } catch (e) {
        if (!e.message.includes('attribute already exists')) throw e;
    }
}

// Helper to create boolean attribute
async function createBoolAttr(db, dbId, collId, key, required = false) {
    try {
        await db.createBooleanAttribute(dbId, collId, key, required);
    } catch (e) {
        if (!e.message.includes('attribute already exists')) throw e;
    }
}

// Helper to create datetime attribute
async function createDatetimeAttr(db, dbId, collId, key, required = false) {
    try {
        await db.createDatetimeAttribute(dbId, collId, key, required);
    } catch (e) {
        if (!e.message.includes('attribute already exists')) throw e;
    }
}

// Helper to create collection
async function createCollection(db, dbId, collId, collName) {
    try {
        return await db.createCollection(dbId, collId, collName);
    } catch (e) {
        if (e.message.includes('already exists')) {
            console.log(`  ℹ️  Collection "${collName}" already exists, updating attributes...`);
            return { $id: collId };
        }
        throw e;
    }
}

// Database setup
async function setupDatabase() {
    try {
        const env = loadEnv();
        const databases = initializeClient(env);
        
        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║   SETTING UP DASHBOARD DATABASE - NAGGAR ANALYTICS        ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');
        
        const dbId = 'analytics_db';
        const dbName = 'analytics_db';
        
        // Try to create database, or get existing one
        let db;
        try {
            db = await databases.create(dbId, dbName);
            console.log('✅ Database created:', db.$id, '\n');
        } catch (e) {
            if (e.message.includes('already exists')) {
                console.log('ℹ️  Database already exists, updating collections...\n');
                db = { $id: dbId };
            } else {
                throw e;
            }
        }
        
        console.log('Creating Collections...\n');
        
        // Collection 1: users
        console.log('1️⃣  Creating "users" collection...');
        await createCollection(databases, db.$id, 'users', 'users');
        await createStringAttr(databases, db.$id, 'users', 'email', 255, true);
        await createStringAttr(databases, db.$id, 'users', 'name', 255, true);
        await createStringAttr(databases, db.$id, 'users', 'role', 50, true);
        await createStringAttr(databases, db.$id, 'users', 'kinde_id', 255);
        await createStringAttr(databases, db.$id, 'users', 'profile_image_url', 500);
        await createStringAttr(databases, db.$id, 'users', 'phone', 20);
        await createStringAttr(databases, db.$id, 'users', 'subscription_status', 50);
        await createDatetimeAttr(databases, db.$id, 'users', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'users', 'updated_at');
        console.log('✅ users collection created\n');
        
        // Collection 2: customers
        console.log('2️⃣  Creating "customers" collection...');
        await createCollection(databases, db.$id, 'customers', 'customers');
        await createStringAttr(databases, db.$id, 'customers', 'user_id', 255, true);
        await createStringAttr(databases, db.$id, 'customers', 'academic_level', 50);
        await createStringAttr(databases, db.$id, 'customers', 'field_of_study', 255);
        await createStringAttr(databases, db.$id, 'customers', 'uploaded_cv_file_id', 255);
        await createStringAttr(databases, db.$id, 'customers', 'location', 255);
        await createStringAttr(databases, db.$id, 'customers', 'budget_range', 100);
        await createStringAttr(databases, db.$id, 'customers', 'preferred_communication', 50);
        await createStringAttr(databases, db.$id, 'customers', 'status', 50);
        await createStringAttr(databases, db.$id, 'customers', 'notes', 1000);
        await createDatetimeAttr(databases, db.$id, 'customers', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'customers', 'updated_at');
        console.log('✅ customers collection created\n');
        
        // Collection 3: projects
        console.log('3️⃣  Creating "projects" collection...');
        await createCollection(databases, db.$id, 'projects', 'projects');
        await createStringAttr(databases, db.$id, 'projects', 'customer_id', 255, true);
        await createStringAttr(databases, db.$id, 'projects', 'admin_id', 255);
        await createStringAttr(databases, db.$id, 'projects', 'title', 500, true);
        await createStringAttr(databases, db.$id, 'projects', 'description', 2000);
        await createStringAttr(databases, db.$id, 'projects', 'status', 50);
        await createStringAttr(databases, db.$id, 'projects', 'pricing_tier_id', 255);
        await createFloatAttr(databases, db.$id, 'projects', 'quoted_price');
        await createFloatAttr(databases, db.$id, 'projects', 'final_price');
        await createStringAttr(databases, db.$id, 'projects', 'payment_status', 50);
        await createStringAttr(databases, db.$id, 'projects', 'payment_id', 255);
        await createDatetimeAttr(databases, db.$id, 'projects', 'started_date');
        await createDatetimeAttr(databases, db.$id, 'projects', 'deadline');
        await createDatetimeAttr(databases, db.$id, 'projects', 'completed_date');
        await createDatetimeAttr(databases, db.$id, 'projects', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'projects', 'updated_at');
        console.log('✅ projects collection created\n');
        
        // Collection 4: files
        console.log('4️⃣  Creating "files" collection...');
        await createCollection(databases, db.$id, 'files', 'files');
        await createStringAttr(databases, db.$id, 'files', 'project_id', 255, true);
        await createStringAttr(databases, db.$id, 'files', 'uploader_id', 255, true);
        await createStringAttr(databases, db.$id, 'files', 'file_name', 255, true);
        await createIntAttr(databases, db.$id, 'files', 'file_size', true);
        await createStringAttr(databases, db.$id, 'files', 'file_type', 100);
        await createStringAttr(databases, db.$id, 'files', 'storage_bucket_id', 255, true);
        await createStringAttr(databases, db.$id, 'files', 'storage_file_id', 255, true);
        await createIntAttr(databases, db.$id, 'files', 'file_version');
        await createStringAttr(databases, db.$id, 'files', 'file_purpose', 50);
        await createDatetimeAttr(databases, db.$id, 'files', 'uploaded_at');
        await createDatetimeAttr(databases, db.$id, 'files', 'created_at');
        console.log('✅ files collection created\n');
        
        // Collection 5: messages
        console.log('5️⃣  Creating "messages" collection...');
        await createCollection(databases, db.$id, 'messages', 'messages');
        await createStringAttr(databases, db.$id, 'messages', 'project_id', 255, true);
        await createStringAttr(databases, db.$id, 'messages', 'sender_id', 255, true);
        await createStringAttr(databases, db.$id, 'messages', 'message_text', 2000);
        await createStringAttr(databases, db.$id, 'messages', 'attached_file_id', 255);
        await createStringAttr(databases, db.$id, 'messages', 'message_type', 50);
        await createBoolAttr(databases, db.$id, 'messages', 'is_system_message');
        await createDatetimeAttr(databases, db.$id, 'messages', 'created_at');
        console.log('✅ messages collection created\n');
        
        // Collection 6: notifications
        console.log('6️⃣  Creating "notifications" collection...');
        await createCollection(databases, db.$id, 'notifications', 'notifications');
        await createStringAttr(databases, db.$id, 'notifications', 'user_id', 255, true);
        await createStringAttr(databases, db.$id, 'notifications', 'project_id', 255);
        await createStringAttr(databases, db.$id, 'notifications', 'title', 255, true);
        await createStringAttr(databases, db.$id, 'notifications', 'message', 1000, true);
        await createStringAttr(databases, db.$id, 'notifications', 'type', 50);
        await createBoolAttr(databases, db.$id, 'notifications', 'read');
        await createStringAttr(databases, db.$id, 'notifications', 'action_url', 500);
        await createDatetimeAttr(databases, db.$id, 'notifications', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'notifications', 'expires_at');
        console.log('✅ notifications collection created\n');
        
        // Collection 7: payments
        console.log('7️⃣  Creating "payments" collection...');
        await createCollection(databases, db.$id, 'payments', 'payments');
        await createStringAttr(databases, db.$id, 'payments', 'project_id', 255, true);
        await createStringAttr(databases, db.$id, 'payments', 'customer_id', 255, true);
        await createFloatAttr(databases, db.$id, 'payments', 'amount', true);
        await createStringAttr(databases, db.$id, 'payments', 'currency', 10);
        await createStringAttr(databases, db.$id, 'payments', 'status', 50);
        await createStringAttr(databases, db.$id, 'payments', 'stripe_payment_id', 255);
        await createStringAttr(databases, db.$id, 'payments', 'stripe_invoice_id', 255);
        await createStringAttr(databases, db.$id, 'payments', 'payment_method', 50);
        await createDatetimeAttr(databases, db.$id, 'payments', 'paid_at');
        await createDatetimeAttr(databases, db.$id, 'payments', 'receipt_sent_at');
        await createDatetimeAttr(databases, db.$id, 'payments', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'payments', 'updated_at');
        console.log('✅ payments collection created\n');
        
        // Collection 8: pricing_tiers
        console.log('8️⃣  Creating "pricing_tiers" collection...');
        await createCollection(databases, db.$id, 'pricing_tiers', 'pricing_tiers');
        await createStringAttr(databases, db.$id, 'pricing_tiers', 'admin_id', 255, true);
        await createStringAttr(databases, db.$id, 'pricing_tiers', 'tier_name', 255, true);
        await createStringAttr(databases, db.$id, 'pricing_tiers', 'description', 1000);
        await createFloatAttr(databases, db.$id, 'pricing_tiers', 'base_price', true);
        await createStringAttr(databases, db.$id, 'pricing_tiers', 'price_unit', 50);
        await createIntAttr(databases, db.$id, 'pricing_tiers', 'turnaround_days');
        await createBoolAttr(databases, db.$id, 'pricing_tiers', 'is_active');
        await createDatetimeAttr(databases, db.$id, 'pricing_tiers', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'pricing_tiers', 'updated_at');
        console.log('✅ pricing_tiers collection created\n');
        
        // Collection 9: marketing_lists
        console.log('9️⃣  Creating "marketing_lists" collection...');
        await createCollection(databases, db.$id, 'marketing_lists', 'marketing_lists');
        await createStringAttr(databases, db.$id, 'marketing_lists', 'admin_id', 255, true);
        await createStringAttr(databases, db.$id, 'marketing_lists', 'list_name', 255, true);
        await createStringAttr(databases, db.$id, 'marketing_lists', 'description', 1000);
        await createStringAttr(databases, db.$id, 'marketing_lists', 'tag', 100);
        await createIntAttr(databases, db.$id, 'marketing_lists', 'customer_count');
        await createStringAttr(databases, db.$id, 'marketing_lists', 'last_sent_campaign_id', 255);
        await createDatetimeAttr(databases, db.$id, 'marketing_lists', 'created_at');
        await createDatetimeAttr(databases, db.$id, 'marketing_lists', 'updated_at');
        console.log('✅ marketing_lists collection created\n');
        
        // Collection 10: email_campaigns
        console.log('🔟 Creating "email_campaigns" collection...');
        await createCollection(databases, db.$id, 'email_campaigns', 'email_campaigns');
        await createStringAttr(databases, db.$id, 'email_campaigns', 'admin_id', 255, true);
        await createStringAttr(databases, db.$id, 'email_campaigns', 'marketing_list_id', 255, true);
        await createStringAttr(databases, db.$id, 'email_campaigns', 'subject_line', 255, true);
        await createStringAttr(databases, db.$id, 'email_campaigns', 'email_template_id', 255);
        await createStringAttr(databases, db.$id, 'email_campaigns', 'body_html', 5000, true);
        await createStringAttr(databases, db.$id, 'email_campaigns', 'status', 50);
        await createIntAttr(databases, db.$id, 'email_campaigns', 'recipients_count');
        await createIntAttr(databases, db.$id, 'email_campaigns', 'opened_count');
        await createIntAttr(databases, db.$id, 'email_campaigns', 'clicked_count');
        await createDatetimeAttr(databases, db.$id, 'email_campaigns', 'scheduled_for');
        await createDatetimeAttr(databases, db.$id, 'email_campaigns', 'sent_at');
        await createDatetimeAttr(databases, db.$id, 'email_campaigns', 'created_at');
        console.log('✅ email_campaigns collection created\n');
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ DASHBOARD DATABASE SETUP COMPLETE!\n');
        console.log('Database: analytics_db');
        console.log('Collections: 10');
        console.log('\nCollections Created:');
        console.log('  1. users              - Customer & admin accounts');
        console.log('  2. customers          - Customer profiles');
        console.log('  3. projects           - Project records');
        console.log('  4. files              - File uploads with versioning');
        console.log('  5. messages           - Project communication');
        console.log('  6. notifications      - In-app notifications');
        console.log('  7. payments           - Payment records');
        console.log('  8. pricing_tiers      - Service pricing');
        console.log('  9. marketing_lists    - Customer segments');
        console.log('  10. email_campaigns   - Email marketing\n');
        
        console.log('═══════════════════════════════════════════════════════════\n');
        
        console.log('📝 Next Steps:\n');
        console.log('1. ✅ Database schema created');
        console.log('2. Next: Create TypeScript types for collections');
        console.log('3. Next: Create API routes for CRUD operations');
        console.log('4. Next: Build React hooks for data fetching');
        console.log('5. Next: Integrate with dashboard components\n');
        
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
