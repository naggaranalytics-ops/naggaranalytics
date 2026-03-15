/**
 * Example: Using Appwrite in CLI Scripts
 * 
 * Run with:
 *   node example-appwrite-cli-usage.js
 */

const { Client, Databases, Storage } = require('appwrite');
const fs = require('fs');
const path = require('path');

// Load .env.local
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

async function main() {
    try {
        const env = loadEnv();
        
        // Initialize client
        const client = new Client()
            .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        
        const databases = new Databases(client);
        const storage = new Storage(client);
        
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║     APPWRITE CLI EXAMPLE - Basic Operations              ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');
        
        console.log('✅ Appwrite Client Initialized\n');
        
        console.log('📝 Example Operations:\n');
        
        console.log('1. LIST DATABASES:');
        console.log('   const databases = new Databases(client);');
        console.log('   const list = await databases.list();\n');
        
        console.log('2. CREATE DATABASE:');
        console.log('   const db = await databases.create(ID.unique(), "my-db");\n');
        
        console.log('3. CREATE COLLECTION:');
        console.log('   const col = await databases.createCollection(');
        console.log('     "db-id",');
        console.log('     ID.unique(),');
        console.log('     "my-collection"');
        console.log('   );\n');
        
        console.log('4. CREATE DOCUMENT:');
        console.log('   const doc = await databases.createDocument(');
        console.log('     "db-id",');
        console.log('     "collection-id",');
        console.log('     ID.unique(),');
        console.log('     { name: "John", email: "john@example.com" }');
        console.log('   );\n');
        
        console.log('5. UPLOAD FILE:');
        console.log('   const file = await storage.createFile(');
        console.log('     "bucket-id",');
        console.log('     ID.unique(),');
        console.log('     fileBlob');
        console.log('   );\n');
        
        console.log('═══════════════════════════════════════════════════════════\n');
        
        console.log('📌 IMPORTANT: Admin Operations\n');
        console.log('Most operations require API Key. To use:');
        console.log('');
        console.log('1. Create API Key in Appwrite console');
        console.log('   Settings → API Keys → Create API Key');
        console.log('');
        console.log('2. Add to .env.local:');
        console.log('   APPWRITE_API_KEY=your_key');
        console.log('');
        console.log('3. Use in code:');
        console.log('   client.setKey(process.env.APPWRITE_API_KEY);');
        console.log('\n');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
