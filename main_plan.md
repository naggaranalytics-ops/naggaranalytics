# Naggar Analytics - Phase 2 Development Plan

This document outlines the major architectural and functional enhancements required to make the Naggar Analytics platform more powerful, secure, and user-friendly for both clients and internal staff.

## 1. Non-Disclosure Agreement (NDA) Integration ✅ DONE
**Goal:** Build trust by requiring users to explicitly agree to an NDA before securely uploading their sensitive data.
*   **Status:** Implemented. NDA is Step 2 of the 5-step onboarding flow.
*   **DB Attributes Added:** `nda_agreed` (boolean), `nda_signature` (string), `nda_signed_at` (string).

## 2. Dynamic Quotation and Payment Receipt Flow
**Goal:** Replace fixed pricing with transparent price ranges. The customer selects services and sees estimated ranges. Admin reviews the data and sets the final quote based on effort, data complexity, and required tests.

### Service Catalog (Price Ranges shown to customer):
| Service | Price Range | Description |
|---------|------------|-------------|
| Data Cleaning & Preparation | $50 – $200 | Handling missing values, outliers, data restructuring. Price depends on dataset size and messiness. |
| Descriptive Statistics | $50 – $100 | Frequency tables, charts, summary statistics. Price depends on number of variables. |
| Inferential Statistics | $100 – $300 | T-Test, ANOVA, Chi-Square, Regression, etc. Price depends on number and complexity of tests. |
| Meta-Analysis | $100 – $300 | Systematic review data synthesis, forest plots, heterogeneity analysis. Price depends on number of studies. |
| Writing Results & Discussion | $50 – $150 | APA-style results chapter, interpretation, and discussion. Price depends on scope. |

### Updated Flow:
1. **Service Selection (Step 4):** Customer selects services and sees price ranges per service + estimated total range. A note explains: "Final price is determined after we review your data based on effort required, statistical tests needed, and data cleanliness."
2. **Submission:** Customer submits project **without paying**. Status → `awaiting_quote`.
3. **Admin Quotation:** Admin reviews uploaded files in Admin Dashboard, assesses complexity, and sets a final `quoted_price`.
4. **Payment Notification:** Customer sees the final price in their dashboard. They transfer the money and upload a payment receipt.
5. **Verification:** Admin reviews receipt → status changes to `in_progress`.

### Implementation Changes:
*   **Step 4 (Services):** Replace fixed prices with price ranges. Add "Meta-Analysis" as new service. Show estimated range total. Add explanatory note about quote-based pricing.
*   **Step 5 (Payment):** Remove upfront payment requirement. Replace with a "Submit for Review" flow. No receipt upload at submission time.
*   **OnboardingContext:** Add `metaAnalysis` to tasks. Remove `calculateTotal()` fixed pricing, replace with `calculateRange()` returning `{min, max}`.
*   **API Route:** Remove receipt requirement at submission. Set status to `awaiting_quote` instead of `inquiry`.
*   **Admin Dashboard:** (Future) Add quotation input to set final price per project.

## 3. Dedicated Technician Dashboard
**Goal:** Allow analysts/technicians to work on projects without exposing sensitive financial or customer data.
*   **Action Items:**
    *   Implement Role-Based Access Control (RBAC) in Appwrite (Admin vs. Technician vs. User).
    *   Build a new route (`/technician`) mirroring the Admin dashboard but strictly limited to:
        *   Viewing assigned project requirements.
        *   Downloading securely provided data files.
        *   Uploading draft or final result files for Admin review.
    *   Hide all pricing, customer names, and direct chat (unless explicitly enabled).

## 4. Customer Feedback and Revision Loop
**Goal:** Make it seamless for customers to request edits on delivered work.
*   **Action Items:**
    *   When an Admin/Technician delivers a file, the project status changes to `delivered_pending_review`.
    *   In the user dashboard, provide two clear CTAs: **"Accept Delivery"** or **"Request Edits"**.
    *   If "Request Edits" is chosen, reveal an upload zone for the customer to securely attach feedback documents or annotated files.
    *   Project status reverts to `revision_requested`, alerting the team to address the feedback.

## 5. Security and Infrastructure Enhancements
**Goal:** Ensure enterprise-grade security for file storage and user data.
*   **Action Items:**
    *   **Storage Buckets:** Configure strict Appwrite Storage bucket permissions (e.g., users can only read/write their own files; technicians can only read files assigned to them).
    *   **Validation:** Enhance client-side and server-side validation to restrict file types (PDF, CSV, XLSX, etc.) and enforce maximum file sizes.
    *   **Audit Logging:** Keep a robust log of file access and status changes for compliance and tracking.

## 6. Technical Implementation Details for Next Agent
This section is extremely important for the next AI agent to hit the ground running without needing to discover the architecture from scratch.
*   **Database Schema Updates (`analytics_db`):**
    *   **Projects Collection:**
        *   Add `nda_agreed` (boolean, required).
        *   Add `nda_signature` (string/document).
        *   Add `quoted_price` (double/float).
        *   Add `technician_id` (string, optional).
        *   Update `status` enum to include: `awaiting_quote`, `pending_payment`, `paid`, `in_progress`, `delivered_pending_review`, `revision_requested`, `completed`.
    *   **Files / Storage:**
        *   Ensure a distinct bucket/folder structure separating `initial_uploads`, `payment_receipts`, `technician_drafts`, `final_deliveries`, and `customer_feedback`.
*   **Target Files to Modify/Create:**
    *   **`/components/onboarding/OnboardingStepper.tsx`**: Insert the new NDA verification step.
    *   **`/app/[lang]/dashboard/new/page.tsx`**: Update the stepper flow and state management.
    *   **`/app/[lang]/dashboard/page.tsx`**: Update project status badges and introduce the "Upload Receipt" or "Request Revision" action buttons based on the new statuses.
    *   **`/app/[lang]/admin/page.tsx` & `AdminProjectActions`**: Add the inputs to submit a quotation price and assign a technician.
    *   **`[NEW] /app/[lang]/technician/page.tsx`**: Build out the scoped technician view using `Role` based Appwrite permissions.

---
*Generated by AI Agent context to guide future development iterations.*
