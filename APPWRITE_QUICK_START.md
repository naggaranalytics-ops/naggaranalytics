# ⚡ Appwrite Quick Start - 3 Steps to Running Everything

**Estimated Time: 30 minutes**

---

## Step 1️⃣: Create Database (5 minutes)

Run this command in your terminal:

```bash
cd "/Users/muhammedelnaggar/Desktop/Naggar Analytics /naggaranalytics"

node create-appwrite-db-programmatically.js
```

**Expected Output:**

```
╔═══════════════════════════════════════════════════╗
║  Creating Naggar Analytics Database  ║
╚═══════════════════════════════════════════════════╝

📝 Creating database: Naggar Analytics...
✅ Database ready

📂 Creating 9 collections...
   Users...
   Customers...
   [... more collections ...]

╔═══════════════════════════════════════════════════╗
║          ✅ DATABASE CREATED SUCCESSFULLY!        ║
╚═══════════════════════════════════════════════════╝

✅ Database: naggar_analytics
✅ Collections: 9
✅ Attributes: 100+
```

**✅ If you see this, continue to Step 2**

---

## Step 2️⃣: Start Your App (2 minutes)

```bash
# Make sure you're in the right folder
cd "/Users/muhammedelnaggar/Desktop/Naggar Analytics /naggaranalytics"

# Install dependencies (only if you haven't done this before)
npm install

# Start the development server
npm run dev
```

**Expected Output:**

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000

✓ Ready in 1.2s
```

**✅ Your app is now running at <http://localhost:3000>**

---

## Step 3️⃣: Test Authentication (20 minutes)

### **Test A: Create an Account (Signup)**

Open a **new terminal** (keep the other one running) and run:

```bash
curl -X POST http://localhost:3000/api/auth/appwrite/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecurePassword123",
    "name": "John Doe"
  }'
```

**Expected Response:**

```json
{
  "status": "success",
  "message": "Account created successfully",
  "user": {
    "id": "abc123xyz",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**⚠️ Important:** Save the `id` value (we'll use it next)

---

### **Test B: Login**

Using the same email and password:

```bash
curl -X POST http://localhost:3000/api/auth/appwrite/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecurePassword123"
  }'
```

**Expected Response:**

```json
{
  "status": "success",
  "message": "Login successful",
  "user": {
    "id": "abc123xyz",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "customer"
  },
  "session": "session123xyz"
}
```

**⚠️ Important:** Save the `session` value

---

### **Test C: Get Current User**

Using the session from Test B:

```bash
curl http://localhost:3000/api/auth/appwrite/me \
  -H "Cookie: appwrite-session=session123xyz"
```

Replace `session123xyz` with the session you got above.

**Expected Response:**

```json
{
  "status": "success",
  "user": {
    "id": "abc123xyz",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "customer",
    "created_at": "2024-03-14T..."
  }
}
```

---

### **Test D: Logout**

```bash
curl -X POST http://localhost:3000/api/auth/appwrite/logout \
  -H "Cookie: appwrite-session=session123xyz"
```

Replace `session123xyz` with your session.

**Expected Response:**

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

## ✅ Verification Checklist

All tests passed? Check these boxes:

- [ ] Database creation script completed successfully
- [ ] `npm run dev` starts without errors
- [ ] Signup creates account (you get user ID)
- [ ] Login authenticates user (you get session ID)
- [ ] Get /me returns current user
- [ ] Logout works

**✅ All checked? You're done!**

---

## 🎉 What's Next?

Now that everything is working:

1. **View Your Database**
   - Go to <https://fra.cloud.appwrite.io>
   - Login
   - Click Databases → naggar_analytics
   - See your 9 collections and the user you created

2. **Build UI Pages** (Optional but recommended)
   - Create a signup form
   - Create a login form
   - Create a dashboard
   - Connect them to your API routes

3. **Deploy to Production**

   ```bash
   git add .
   git commit -m "Add Appwrite setup"
   git push origin main
   # Cloudflare automatically deploys
   ```

---

## 🚨 Troubleshooting

### **Problem: "API Key not found" error**

Check your `.env.local` file:

```bash
cat .env.local
```

You should see:

```
APPWRITE_API_KEY=your_key_here
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=69b4aef600060e6a944e
```

### **Problem: "CORS error" or "connection refused"**

Run the test from same machine where app is running:

```bash
# Terminal 1: App is running
npm run dev

# Terminal 2: Run tests
curl http://localhost:3000/api/auth/appwrite/register ...
```

### **Problem: "Database not found"**

Run the database creation script again:

```bash
node create-appwrite-db-programmatically.js
```

### **Problem: npm command not found**

Install Node.js from <https://nodejs.org/>

---

## 📚 More Information

For detailed guides, see:

- **README_START_HERE.md** - Navigation hub
- **BEGINNER_STEP_BY_STEP.md** - Complete step-by-step guide
- **TESTING_GUIDE_LOCAL.md** - Detailed testing procedures
- **MIGRATION_KINDE_SUPABASE_TO_APPWRITE.md** - If migrating from other systems

---

## 💡 Key Points to Remember

1. **Keep Terminal Running**: The `npm run dev` terminal must stay open
2. **Use New Terminal for Tests**: Open a new terminal window for curl commands
3. **Replace Values**: When copying commands, replace placeholders with actual values
4. **No Spaces in Paths**: Be careful with directory names that have spaces
5. **Save IDs**: Write down user IDs and session IDs from responses

---

**You're all set! 🚀**

Start with Step 1, follow through to Step 3, then read BEGINNER_STEP_BY_STEP.md for the full implementation.
