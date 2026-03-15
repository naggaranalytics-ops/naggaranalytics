/**
 * Appwrite Database Setup for Naggar Analytics Dashboard
 *
 * Uses: node-appwrite v22+ (server SDK) with setKey()
 * Run:  node setup-db-fixed.js
 *
 * Creates:
 *   - Database:    analytics_db
 *   - Collections: 12
 *   - Buckets:     client_uploads, delivery_files
 */

const { Client, Databases, Storage } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// ─── Load .env.local ─────────────────────────────────────────────────────────
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const idx = trimmed.indexOf('=');
        if (idx === -1) return;
        env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    });
    return env;
}

const env = loadEnv();

if (!env.APPWRITE_API_KEY || !env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    console.error('❌  Missing required env vars in .env.local:');
    console.error('    APPWRITE_API_KEY');
    console.error('    NEXT_PUBLIC_APPWRITE_ENDPOINT');
    console.error('    NEXT_PUBLIC_APPWRITE_PROJECT_ID');
    process.exit(1);
}

const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(env.APPWRITE_API_KEY);      // ← server SDK: setKey(), NOT setDevKey()

const databases = new Databases(client);
const storage   = new Storage(client);
const DB_ID     = 'analytics_db';

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function safe(fn, label) {
    try {
        await fn();
        console.log(`   ✓  ${label}`);
    } catch (e) {
        if (e.message?.toLowerCase().includes('already exist')) {
            console.log(`   –  ${label} (already exists)`);
        } else {
            console.warn(`   ⚠  ${label}: ${e.message}`);
        }
    }
}

// node-appwrite v22+ uses object params
const coll = (collectionId, name) =>
    safe(() => databases.createCollection({ databaseId: DB_ID, collectionId, name }), `collection: ${name}`);

const str  = (collectionId, key, size = 255, required = false) =>
    safe(() => databases.createStringAttribute({ databaseId: DB_ID, collectionId, key, size, required }), key);

const num  = (collectionId, key, required = false) =>
    safe(() => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId, key, required }), key);

const flt  = (collectionId, key, required = false) =>
    safe(() => databases.createFloatAttribute({ databaseId: DB_ID, collectionId, key, required }), key);

const bol  = (collectionId, key, required = false) =>
    safe(() => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId, key, required }), key);

const dt   = (collectionId, key, required = false) =>
    safe(() => databases.createDatetimeAttribute({ databaseId: DB_ID, collectionId, key, required }), key);

// ─── Main ─────────────────────────────────────────────────────────────────────

async function setup() {
    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║   Naggar Analytics — Appwrite Database Setup     ║');
    console.log('╚══════════════════════════════════════════════════╝\n');

    // Database
    console.log('📦  Database');
    await safe(() => databases.create({ databaseId: DB_ID, name: 'Analytics Database' }), 'analytics_db');

    // ── 1. users ──────────────────────────────────────────────────────────────
    console.log('\n1️⃣   users');
    await coll('users', 'Users');
    await str('users', 'user_id', 255, true);
    await str('users', 'email', 255, true);
    await str('users', 'name', 255, true);
    await str('users', 'role', 50, true);      // customer | admin
    await str('users', 'phone', 20);
    await str('users', 'avatar_url', 500);
    await str('users', 'status', 50, true);    // active | inactive

    // ── 2. customers ──────────────────────────────────────────────────────────
    console.log('\n2️⃣   customers');
    await coll('customers', 'Customers');
    await str('customers', 'user_id', 255, true);
    await str('customers', 'company_name', 255);
    await str('customers', 'industry', 100);
    await str('customers', 'country', 100);
    await str('customers', 'degree_type', 50);
    await str('customers', 'field_of_study', 255);
    await str('customers', 'budget_range', 50);
    await str('customers', 'marketing_list_id', 255);
    await str('customers', 'status', 50, true);
    await dt('customers',  'created_at', true);
    await dt('customers',  'updated_at', true);

    // ── 3. projects ───────────────────────────────────────────────────────────
    console.log('\n3️⃣   projects');
    await coll('projects', 'Projects');
    await str('projects', 'customer_id', 255, true);
    await str('projects', 'admin_id', 255);
    await str('projects', 'title', 500, true);
    await str('projects', 'description', 5000);
    await str('projects', 'degree_type', 50);
    await str('projects', 'field_of_study', 255);
    await str('projects', 'status', 50, true);    // inquiry|quoted|paid|in_progress|completed
    await str('projects', 'payment_status', 50);
    await flt('projects', 'quoted_price');
    await flt('projects', 'final_price');
    await str('projects', 'pricing_tier_id', 255);
    await dt('projects',  'deadline');
    await dt('projects',  'started_date');
    await dt('projects',  'completed_date');
    await dt('projects',  'created_at', true);
    await dt('projects',  'updated_at', true);

    // ── 4. files ──────────────────────────────────────────────────────────────
    console.log('\n4️⃣   files');
    await coll('files', 'Files');
    await str('files', 'project_id', 255, true);
    await str('files', 'uploader_id', 255, true);
    await str('files', 'file_name', 255, true);
    await num('files', 'file_size', true);
    await str('files', 'file_type', 100);
    await str('files', 'storage_bucket_id', 255, true);
    await str('files', 'storage_file_id', 255, true);
    await num('files', 'file_version');
    await str('files', 'file_purpose', 50);       // inquiry|work|result|feedback
    await str('files', 'notes', 5000);
    await str('files', 'status', 50);
    await dt('files',  'uploaded_at');
    await dt('files',  'created_at', true);

    // ── 5. messages ───────────────────────────────────────────────────────────
    console.log('\n5️⃣   messages');
    await coll('messages', 'Messages');
    await str('messages', 'project_id', 255, true);
    await str('messages', 'sender_id', 255, true);
    await str('messages', 'sender_role', 50, true);
    await str('messages', 'message', 5000, true);
    await str('messages', 'message_type', 50, true);
    await str('messages', 'file_id', 255);
    await bol('messages', 'read', true);
    await dt('messages',  'created_at', true);

    // ── 6. notifications ──────────────────────────────────────────────────────
    console.log('\n6️⃣   notifications');
    await coll('notifications', 'Notifications');
    await str('notifications', 'user_id', 255, true);
    await str('notifications', 'type', 50, true);
    await str('notifications', 'title', 255, true);
    await str('notifications', 'message', 1000, true);
    await str('notifications', 'related_project_id', 255);
    await str('notifications', 'action_url', 500);
    await bol('notifications', 'read', true);
    await dt('notifications',  'created_at', true);

    // ── 7. payments ───────────────────────────────────────────────────────────
    console.log('\n7️⃣   payments');
    await coll('payments', 'Payments');
    await str('payments', 'project_id', 255, true);
    await str('payments', 'customer_id', 255, true);
    await num('payments', 'amount', true);
    await str('payments', 'currency', 10, true);
    await str('payments', 'status', 50, true);
    await str('payments', 'payment_method', 50);
    await str('payments', 'stripe_payment_id', 255);
    await str('payments', 'stripe_invoice_id', 255);
    await str('payments', 'transaction_id', 255);
    await str('payments', 'notes', 500);
    await dt('payments',  'paid_at');
    await dt('payments',  'created_at', true);
    await dt('payments',  'updated_at', true);

    // ── 8. pricing_tiers ──────────────────────────────────────────────────────
    console.log('\n8️⃣   pricing_tiers');
    await coll('pricing_tiers', 'Pricing Tiers');
    await str('pricing_tiers', 'name', 100, true);
    await str('pricing_tiers', 'description', 1000);
    await str('pricing_tiers', 'degree_type', 50, true);
    await str('pricing_tiers', 'field_of_study', 255);
    await num('pricing_tiers', 'base_price', true);
    await flt('pricing_tiers', 'rush_price_multiplier');
    await str('pricing_tiers', 'includes', 2000);
    await bol('pricing_tiers', 'is_active');
    await dt('pricing_tiers',  'created_at', true);
    await dt('pricing_tiers',  'updated_at', true);

    // ── 9. marketing_lists ────────────────────────────────────────────────────
    console.log('\n9️⃣   marketing_lists');
    await coll('marketing_lists', 'Marketing Lists');
    await str('marketing_lists', 'name', 255, true);
    await str('marketing_lists', 'description', 1000);
    await num('marketing_lists', 'customer_count', true);
    await dt('marketing_lists',  'created_at', true);
    await dt('marketing_lists',  'updated_at', true);

    // ── 10. email_campaigns ───────────────────────────────────────────────────
    console.log('\n🔟  email_campaigns');
    await coll('email_campaigns', 'Email Campaigns');
    await str('email_campaigns', 'marketing_list_id', 255, true);
    await str('email_campaigns', 'subject', 255, true);
    await str('email_campaigns', 'html_content', 10000, true);
    await str('email_campaigns', 'status', 50, true);
    await num('email_campaigns', 'open_count', true);
    await num('email_campaigns', 'click_count', true);
    await dt('email_campaigns',  'sent_at');
    await dt('email_campaigns',  'created_at', true);
    await dt('email_campaigns',  'updated_at', true);

    // ── 11. career_applications ───────────────────────────────────────────────
    console.log('\n1️⃣1️⃣  career_applications');
    await coll('career_applications', 'Career Applications');
    await str('career_applications', 'job_title', 255, true);
    await str('career_applications', 'full_name', 255, true);
    await str('career_applications', 'email', 255, true);
    await str('career_applications', 'whatsapp', 50, true);
    await str('career_applications', 'why_join', 5000, true);
    await str('career_applications', 'status', 50);  // pending|reviewed|hired|rejected
    await dt('career_applications',  'created_at', true);

    // ── 12. subscribers ───────────────────────────────────────────────────────
    console.log('\n1️⃣2️⃣  subscribers');
    await coll('subscribers', 'Subscribers');
    await str('subscribers', 'email', 255, true);
    await str('subscribers', 'name', 255);
    await str('subscribers', 'status', 50);  // active | unsubscribed
    await dt('subscribers',  'created_at', true);

    // ── Storage Buckets ───────────────────────────────────────────────────────
    console.log('\n🪣  Storage buckets');
    await safe(() => storage.createBucket({ bucketId: 'client_uploads', name: 'Client Uploads' }),   'bucket: client_uploads');
    await safe(() => storage.createBucket({ bucketId: 'delivery_files', name: 'Delivery Files' }),   'bucket: delivery_files');

    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║               ✅  SETUP COMPLETE                 ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log('\n  Database   : analytics_db');
    console.log('  Collections: 12');
    console.log('  Buckets    : 2\n');
    console.log('  Next steps:');
    console.log('  1. Visit https://cloud.appwrite.io → Databases → verify');
    console.log('  2. Auth → Users → create your account (sign up on the app)');
    console.log('  3. After signup, go to Appwrite Console → Auth → Users →');
    console.log('     select your user → Labels → add label: admin');
    console.log('  4. npm run dev — your app is ready!\n');
}

setup().catch(err => {
    console.error('\n❌  Setup failed:', err.message);
    process.exit(1);
});
