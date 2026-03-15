#!/usr/bin/env node

/**
 * Appwrite CLI Helper
 * Use Appwrite SDK directly from Node.js CLI scripts
 * 
 * Usage:
 *   node cli-appwrite-helper.js
 */

const { Client, Databases, Storage, Account, Teams } = require('appwrite');
const fs = require('fs');
const path = require('path');

// Load .env.local
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
        throw new Error('.env.local not found');
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim()) {
            const value = valueParts.join('=').trim();
            env[key.trim()] = value;
        }
    });
    
    return env;
}

// Initialize Appwrite client
function initializeClient(env) {
    const endpoint = env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    
    if (!endpoint || !projectId) {
        throw new Error('Missing Appwrite configuration in .env.local');
    }
    
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId);
    
    return {
        client,
        databases: new Databases(client),
        storage: new Storage(client),
        account: new Account(client),
        teams: new Teams(client),
        config: {
            endpoint,
            projectId,
            apiKey: env.APPWRITE_API_KEY || null
        }
    };
}

// Display help
function showHelp() {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                    APPWRITE CLI HELPER - USAGE GUIDE                     ║
╚═══════════════════════════════════════════════════════════════════════════╝

APPWRITE IN THIS CLI ENVIRONMENT ✅

Import and use Appwrite in your Node.js scripts:

  const { Client, Databases } = require('appwrite');
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('69b4aef600060e6a944e');
  
  const databases = new Databases(client);

AVAILABLE MODULES:

  • Databases: Create/manage databases and collections
  • Storage:   File upload and management  
  • Account:   User account operations
  • Teams:     Team management

GETTING STARTED:

1. Create a script (e.g., my-appwrite-script.js):
   
   const { Client, Databases } = require('appwrite');
   
   const client = new Client()
     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
   
   const db = new Databases(client);
   
   async function main() {
     try {
       // Your code here
     } catch (e) {
       console.error(e);
     }
   }
   
   main();

2. Load environment:
   
   export $(cat .env.local | grep -v '^#' | xargs)

3. Run script:
   
   node my-appwrite-script.js

ADMIN OPERATIONS:

For create/update/delete operations, you need an API key:

1. Generate in Appwrite console: Settings → API Keys
2. Add to .env.local:
   APPWRITE_API_KEY=your_key_here
3. Use in client:
   client.setKey('your_key_here');

═══════════════════════════════════════════════════════════════════════════
    `);
}

// Main
async function main() {
    try {
        const env = loadEnv();
        const appwrite = initializeClient(env);
        
        console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                    APPWRITE CLI - INITIALIZED ✅                        ║
╚═══════════════════════════════════════════════════════════════════════════╝

Configuration:
  Endpoint:  ${appwrite.config.endpoint}
  Project:   ${appwrite.config.projectId}
  API Key:   ${appwrite.config.apiKey ? '✓ Set' : '✗ Not set (read-only)'}

Available Objects:
  appwrite.client      - Core client
  appwrite.databases   - Database operations
  appwrite.storage     - File storage
  appwrite.account     - User account
  appwrite.teams       - Team management

Usage:
  const { Client, Databases } = require('appwrite');
  const appwrite = require('./cli-appwrite-helper');
  
  Or see: node cli-appwrite-helper.js --help

═══════════════════════════════════════════════════════════════════════════
        `);
        
        // Export for use in other scripts
        module.exports = appwrite;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    if (process.argv[2] === '--help' || process.argv[2] === '-h') {
        showHelp();
    } else {
        main();
    }
}
