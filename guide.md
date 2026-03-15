# Admin & Technician Dashboard — Setup Guide

## 1️⃣ Appwrite Platform Registration

Every Cloudflare Pages preview deploy gets a unique subdomain (e.g., `abc123.naggaranalytics.pages.dev`).  
Appwrite blocks requests from unregistered domains.

**To fix:**
1. Go to [Appwrite Console](https://cloud.appwrite.io/) → Your Project → **Settings** → **Platforms**
2. Click **Add Platform** → **Web**
3. Add your **production domain**: `naggaranalytics.pages.dev`
4. Add `localhost` for local development

> **Note:** Appwrite does not support wildcard (`*`) domains. For preview deploys, you need to add each specific preview URL.

---

## 2️⃣ Admin Dashboard

### Who Can Access?
Users with **either**:
- The `admin` label in Appwrite (recommended)
- An email matching the `ADMIN_EMAIL` environment variable

### How to Grant Admin Access
1. Go to **Appwrite Console** → **Auth** → **Users**
2. Click the target user
3. Scroll to **Labels** → Add `admin`
4. Save

### Admin Capabilities
- View all customer projects
- Set quotations and assign technicians
- Upload final delivery files
- View career applications
- View newsletter subscribers

### URL
`https://your-domain.com/{en|ar}/admin`

---

## 3️⃣ Technician Dashboard

### Who Can Access?
Users with the `technician` label in Appwrite. Admins can also access it.

### Step-by-Step Setup

#### A. Add `technician_id` Attribute to Projects Collection
Run the migration script (one-time):
```bash
node add-technician-id.js
```
Or manually in **Appwrite Console** → **Databases** → `analytics_db` → `projects` collection:
- Add attribute: `technician_id` (String, size 255, not required)

#### B. Create a Technician User
1. **Appwrite Console** → **Auth** → **Users**
2. Either create a new user or select an existing one
3. **Labels** → Add `technician`
4. Copy their **User ID** (`$id`)

#### C. Assign a Project to the Technician
1. **Appwrite Console** → **Databases** → `analytics_db` → `projects`
2. Open the project document you want to assign
3. Set `technician_id` = the technician's User ID
4. Save

#### D. Technician Login
The technician logs in normally and navigates to:
```
https://your-domain.com/{en|ar}/technician
```

### Technician Capabilities
- View only their assigned projects
- See project title, degree type, status, and dates
- Upload result/draft files
- **Cannot see**: customer names, pricing, financial data, or admin controls

---

## 4️⃣ Language & Theme

Both dashboards support:
- **English (LTR)** — `/en/admin` or `/en/technician`
- **Arabic (RTL)** — `/ar/admin` or `/ar/technician`
- **Light/Dark theme** — toggleable from the sidebar (customer dashboard) or will follow the system default

---

## 5️⃣ Project Status Flow

```
awaiting_quote → quoted → paid → in_progress → completed
```

| Status | Who Sets It |
|--------|------------|
| `awaiting_quote` | Auto (on submission) |
| `quoted` | Admin (sets price) |
| `paid` | Admin (verifies payment) |
| `in_progress` | Admin (assigns technician) |
| `completed` | Admin (after review) |

---

## 6️⃣ Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API URL |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project ID |
| `APPWRITE_API_KEY` | Server-side API key |
| `ADMIN_EMAIL` | Fallback admin email check |
| `RESEND_API_KEY` | Email notifications (optional) |
