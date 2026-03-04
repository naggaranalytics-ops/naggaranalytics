# Naggar Analytics - Project Handoff & Next Steps

This document serves as a "brain dump" for the next AI assistant or developer picking up this project. It outlines what has been accomplished, the technical hurdles encountered (and how we bypassed them), and what remains to be done.

## 🎯 Project Overview
We are building a **Project Management & Learning Dashboard** for students (Master’s/PhD) and businesses to submit statistical analysis requests, pay via regional methods, track progress, and access educational content.
- **Tech Stack:** Next.js (App Router), Kinde Auth, Supabase (Database + Storage Buckets), Tailwind CSS.
- **Hosting:** Set to be hosted on Cloudflare Pages.

---

## ✅ What is Completed
**Phase 1: Foundation & Architecture**
- Next.js scaffolding, Kinde Auth integration, and Supabase client setup.
- Designed the database schema (`profiles`, `projects`, `project_files`).

**Phase 2: Onboarding & Project Submission**
- Built a multi-step onboarding flow (`Step1Academic`, `Step2Files`, `Step3Tasks`, `Step4Payment`).
- Implemented **React Context** (`OnboardingContext.tsx`) for state management across the steps.
- Set up Supabase Storage file uploads (raw data, supporting docs) directly to the `client_uploads` bucket.
- Integrated dynamic pricing based on selected tasks (Data Cleaning, Descriptive Stats, etc.).

**Phase 3: Payments & Verification**
- Configured manual "Al Rajhi" bank transfer UI as the primary payment method.
- Allowed users to upload their payment receipt during the submission step.

**Phase 4: Project Management & Delivery**
- **User Dashboard** (`/dashboard`): Lists user's active/completed projects, current status, and provides a download button when the Admin uploads the final result.
- **Admin Dashboard** (`/admin`): Allows the admin to view all incoming projects, verify payments, advance statuses (e.g., Pending -> In Progress -> Review -> Completed), and upload the final result delivery files.

---

## 🚧 Known Issues & Failures Encountered
When continuing work, keep the following environment hurdles in mind:

1. **NPM Permissions / EPERM Errors:**
   - **The Error:** Running `npm install` frequently failed with `EPERM: operation not permitted` on `lstat` or `rename` inside `node_modules`.
   - **The Workaround:** We bypassed the broken local cache by forcing a temporary cache: `npm install --cache /tmp/empty-cache-X` (incrementing X).
   - *Note:* Do not casually run `npm install` without anticipating potential permission locks.

2. **State Management Pivot (Zustand -> Context):**
   - **The Issue:** Attempted to use `zustand` to govern the onboarding form state. NPM installation locked up repeatedly.
   - **The Fix:** Pivoted exclusively to standard React `useContext` (`OnboardingContext.tsx`), which works flawlessly and requires zero external dependencies.

3. **UUID Generation:**
   - **The Issue:** The `uuid` package had similar node_modules resolution issues.
   - **The Fix:** Swapped to the native Node.js/Browser `crypto.randomUUID()` API for generating unique file names before pushing them to Supabase Storage. Avoid installing third-party ID packages.

4. **TypeScript & Kinde Linting Warnings:**
   - You may see IDE lint errors regarding missing types for `@kinde-oss/kinde-auth-nextjs/server` or `next/link`. These are mostly local TypeScript server resolution glitches; the application compiles and runs correctly in Next.js.

---

## ⏳ What is Missing (The Plan for Next Session)
You are currently ready to begin **Phase 5: Educational Hub & Enhancements**. 

### Remaining Tasks:
1. **Video Gallery (Educational Hub):**
   - Build a layout to showcase unlisted YouTube webinars. 
   - Separate access control (e.g., Free vs. Premium tiers, if necessary). Currently, simple embedding will suffice.
2. **Resources Section:**
   - Create a page or section for downloadable PDFs (templates, structural guides).
3. **WhatsApp "Chat with Naggar" Widget:**
   - Integrate a floating WhatsApp API button (`https://wa.me/...`) so clients can contact support directly from any dashboard page.
4. **General Polish:**
   - Fix remaining accessibility (`aria-labels`) and TS linting warnings.
   - Test deploying to Cloudflare Pages via GitHub Actions (or natively linking the repo).

### Instructions for the Next AI:
When resuming this project, start by reading `app/dashboard/page.tsx` and `app/admin/page.tsx` to understand the data fetching architecture. Then, proceed directly to scoping out the Video Gallery and Resources sections for Phase 5.
