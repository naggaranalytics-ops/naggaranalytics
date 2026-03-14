/**
 * TypeScript Types for Appwrite Database Collections
 * Generated from dashboard schema
 */

// Base document type with Appwrite fields
export interface AppwriteDocument {
    $id: string;
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
}

// 1. Users Collection
export interface User extends AppwriteDocument {
    email: string;
    name: string;
    role: 'customer' | 'admin';
    kinde_id?: string;
    profile_image_url?: string;
    phone?: string;
    subscription_status?: 'free' | 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

// 2. Customers Collection
export interface Customer extends AppwriteDocument {
    user_id: string;
    academic_level?: 'masters' | 'phd' | 'other';
    field_of_study?: string;
    uploaded_cv_file_id?: string;
    location?: string;
    budget_range?: string;
    preferred_communication?: 'email' | 'dashboard' | 'both';
    status: 'active' | 'inactive' | 'archived';
    notes?: string;
    created_at: string;
    updated_at: string;
}

// 3. Projects Collection
export interface Project extends AppwriteDocument {
    customer_id: string;
    admin_id?: string;
    title: string;
    description?: string;
    status: 'inquiry' | 'quoted' | 'paid' | 'in_progress' | 'completed';
    pricing_tier_id?: string;
    quoted_price?: number;
    final_price?: number;
    payment_status?: 'pending' | 'partial' | 'completed';
    payment_id?: string;
    started_date?: string;
    deadline?: string;
    completed_date?: string;
    created_at: string;
    updated_at: string;
}

// 4. Files Collection
export interface FileRecord extends AppwriteDocument {
    project_id: string;
    uploader_id: string;
    file_name: string;
    file_size: number;
    file_type: string;
    storage_bucket_id: string;
    storage_file_id: string;
    file_version: number;
    file_purpose: 'inquiry' | 'work' | 'result' | 'feedback';
    uploaded_at: string;
    created_at: string;
}

// 5. Messages Collection
export interface Message extends AppwriteDocument {
    project_id: string;
    sender_id: string;
    message_text?: string;
    attached_file_id?: string;
    message_type: 'text' | 'file_upload' | 'price_offer' | 'payment_notice' | 'system';
    is_system_message: boolean;
    created_at: string;
}

// 6. Notifications Collection
export interface Notification extends AppwriteDocument {
    user_id: string;
    project_id?: string;
    title: string;
    message: string;
    type: 'file_uploaded' | 'price_offered' | 'payment_received' | 'work_started' | 'result_ready' | 'custom';
    read: boolean;
    action_url?: string;
    created_at: string;
    expires_at?: string;
}

// 7. Payments Collection
export interface Payment extends AppwriteDocument {
    project_id: string;
    customer_id: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    stripe_payment_id?: string;
    stripe_invoice_id?: string;
    payment_method?: 'card' | 'bank_transfer';
    paid_at?: string;
    receipt_sent_at?: string;
    created_at: string;
    updated_at: string;
}

// 8. Pricing Tiers Collection
export interface PricingTier extends AppwriteDocument {
    admin_id: string;
    tier_name: string;
    description?: string;
    base_price: number;
    price_unit?: 'per_page' | 'per_project' | 'per_hour' | 'fixed';
    turnaround_days?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// 9. Marketing Lists Collection
export interface MarketingList extends AppwriteDocument {
    admin_id: string;
    list_name: string;
    description?: string;
    tag: string;
    customer_count: number;
    last_sent_campaign_id?: string;
    created_at: string;
    updated_at: string;
}

// 10. Email Campaigns Collection
export interface EmailCampaign extends AppwriteDocument {
    admin_id: string;
    marketing_list_id: string;
    subject_line: string;
    email_template_id?: string;
    body_html: string;
    status: 'draft' | 'scheduled' | 'sent' | 'failed';
    recipients_count: number;
    opened_count: number;
    clicked_count: number;
    scheduled_for?: string;
    sent_at?: string;
    created_at: string;
}

// Request/Response types
export interface CreateUserRequest {
    email: string;
    name: string;
    role: 'customer' | 'admin';
    kinde_id?: string;
}

export interface CreateProjectRequest {
    customer_id: string;
    title: string;
    description?: string;
    pricing_tier_id?: string;
}

export interface CreatePaymentRequest {
    project_id: string;
    customer_id: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP';
}

export interface PriceOfferRequest {
    project_id: string;
    quoted_price: number;
    notes?: string;
}

// Database config
export const DATABASE_ID = 'analytics_db';

export const COLLECTIONS = {
    USERS: 'users',
    CUSTOMERS: 'customers',
    PROJECTS: 'projects',
    FILES: 'files',
    MESSAGES: 'messages',
    NOTIFICATIONS: 'notifications',
    PAYMENTS: 'payments',
    PRICING_TIERS: 'pricing_tiers',
    MARKETING_LISTS: 'marketing_lists',
    EMAIL_CAMPAIGNS: 'email_campaigns',
} as const;
