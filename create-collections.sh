#!/bin/bash

# Appwrite Configuration
ENDPOINT="https://fra.cloud.appwrite.io/v1"
PROJECT_ID="69b4aef600060e6a944e"
API_KEY="standard_cffd7806d09123f43a4d29b050659ad88d37e5fcb29dbbae31f7f585925dd1df65d664cc3c8e4b9520b0656cb948089eccca96ad94465e8489089dbb0d87986873f5f58cc1528e35f9b3fe4ee42e5a701814e931d6dd1f6af353bb863d3873f73c13f2d804ae907c2d49aea4a0877cc1b2df376762f97a9ddfee76ca09d765c1"
DATABASE_ID="analytics_db"

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   CREATING DASHBOARD COLLECTIONS                          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Helper function to create collection
create_collection() {
    local coll_id=$1
    local coll_name=$2
    
    echo "📂 Creating collection: $coll_name..."
    
    curl -s -X POST "$ENDPOINT/databases/$DATABASE_ID/collections" \
      -H "Content-Type: application/json" \
      -H "X-Appwrite-Project: $PROJECT_ID" \
      -H "X-Appwrite-Key: $API_KEY" \
      -d "{
        \"collectionId\": \"$coll_id\",
        \"name\": \"$coll_name\"
      }" > /dev/null
    
    echo "   ✅ $coll_name"
}

# Helper function to create attribute
create_attr() {
    local coll_id=$1
    local attr_key=$2
    local attr_name=$3
    local attr_type=$4
    local size=$5
    local required=$6
    
    case $attr_type in
        "string")
            curl -s -X POST "$ENDPOINT/databases/$DATABASE_ID/collections/$coll_id/attributes/string" \
              -H "Content-Type: application/json" \
              -H "X-Appwrite-Project: $PROJECT_ID" \
              -H "X-Appwrite-Key: $API_KEY" \
              -d "{
                \"key\": \"$attr_key\",
                \"size\": $size,
                \"required\": $required
              }" > /dev/null 2>&1
            ;;
        "integer")
            curl -s -X POST "$ENDPOINT/databases/$DATABASE_ID/collections/$coll_id/attributes/integer" \
              -H "Content-Type: application/json" \
              -H "X-Appwrite-Project: $PROJECT_ID" \
              -H "X-Appwrite-Key: $API_KEY" \
              -d "{
                \"key\": \"$attr_key\",
                \"required\": $required
              }" > /dev/null 2>&1
            ;;
        "boolean")
            curl -s -X POST "$ENDPOINT/databases/$DATABASE_ID/collections/$coll_id/attributes/boolean" \
              -H "Content-Type: application/json" \
              -H "X-Appwrite-Project: $PROJECT_ID" \
              -H "X-Appwrite-Key: $API_KEY" \
              -d "{
                \"key\": \"$attr_key\",
                \"required\": $required
              }" > /dev/null 2>&1
            ;;
        "datetime")
            curl -s -X POST "$ENDPOINT/databases/$DATABASE_ID/collections/$coll_id/attributes/datetime" \
              -H "Content-Type: application/json" \
              -H "X-Appwrite-Project: $PROJECT_ID" \
              -H "X-Appwrite-Key: $API_KEY" \
              -d "{
                \"key\": \"$attr_key\",
                \"required\": $required
              }" > /dev/null 2>&1
            ;;
    esac
}

# 1. Users Collection
create_collection "users" "Users"
create_attr "users" "user_id" "User ID" "string" 255 true
create_attr "users" "email" "Email" "string" 255 true
create_attr "users" "name" "Name" "string" 255 true
create_attr "users" "role" "Role" "string" 50 true
create_attr "users" "phone" "Phone" "string" 20 false
create_attr "users" "avatar_url" "Avatar URL" "string" 500 false
create_attr "users" "status" "Status" "string" 50 true

# 2. Customers Collection
create_collection "customers" "Customers"
create_attr "customers" "user_id" "User ID" "string" 255 true
create_attr "customers" "company_name" "Company Name" "string" 255 false
create_attr "customers" "industry" "Industry" "string" 100 false
create_attr "customers" "country" "Country" "string" 100 false
create_attr "customers" "degree_type" "Degree Type" "string" 50 false
create_attr "customers" "field_of_study" "Field of Study" "string" 255 false
create_attr "customers" "budget_range" "Budget Range" "string" 50 false
create_attr "customers" "marketing_list_id" "Marketing List ID" "string" 255 false
create_attr "customers" "status" "Status" "string" 50 true
create_attr "customers" "created_at" "Created At" "datetime" 0 true
create_attr "customers" "updated_at" "Updated At" "datetime" 0 true

# 3. Projects Collection
create_collection "projects" "Projects"
create_attr "projects" "customer_id" "Customer ID" "string" 255 true
create_attr "projects" "title" "Title" "string" 255 true
create_attr "projects" "description" "Description" "string" 5000 false
create_attr "projects" "degree_type" "Degree Type" "string" 50 true
create_attr "projects" "field_of_study" "Field of Study" "string" 255 true
create_attr "projects" "deadline" "Deadline" "datetime" 0 false
create_attr "projects" "status" "Status" "string" 50 true
create_attr "projects" "price_offered" "Price Offered" "integer" 0 false
create_attr "projects" "price_accepted" "Price Accepted" "integer" 0 false
create_attr "projects" "created_at" "Created At" "datetime" 0 true
create_attr "projects" "updated_at" "Updated At" "datetime" 0 true

# 4. Files Collection
create_collection "files" "Files"
create_attr "files" "project_id" "Project ID" "string" 255 true
create_attr "files" "file_name" "File Name" "string" 255 true
create_attr "files" "file_type" "File Type" "string" 50 true
create_attr "files" "file_size" "File Size" "integer" 0 true
create_attr "files" "file_version" "File Version" "integer" 0 true
create_attr "files" "uploaded_by" "Uploaded By" "string" 50 true
create_attr "files" "storage_bucket_id" "Storage Bucket ID" "string" 255 true
create_attr "files" "storage_file_id" "Storage File ID" "string" 255 true
create_attr "files" "status" "Status" "string" 50 true
create_attr "files" "notes" "Notes" "string" 5000 false
create_attr "files" "created_at" "Created At" "datetime" 0 true
create_attr "files" "updated_at" "Updated At" "datetime" 0 true

# 5. Messages Collection
create_collection "messages" "Messages"
create_attr "messages" "project_id" "Project ID" "string" 255 true
create_attr "messages" "sender_id" "Sender ID" "string" 255 true
create_attr "messages" "sender_role" "Sender Role" "string" 50 true
create_attr "messages" "message" "Message" "string" 5000 true
create_attr "messages" "message_type" "Message Type" "string" 50 true
create_attr "messages" "file_id" "File ID" "string" 255 false
create_attr "messages" "read" "Read" "boolean" 0 true
create_attr "messages" "created_at" "Created At" "datetime" 0 true

# 6. Notifications Collection
create_collection "notifications" "Notifications"
create_attr "notifications" "user_id" "User ID" "string" 255 true
create_attr "notifications" "type" "Type" "string" 50 true
create_attr "notifications" "title" "Title" "string" 255 true
create_attr "notifications" "message" "Message" "string" 1000 true
create_attr "notifications" "related_project_id" "Related Project ID" "string" 255 false
create_attr "notifications" "read" "Read" "boolean" 0 true
create_attr "notifications" "created_at" "Created At" "datetime" 0 true

# 7. Payments Collection
create_collection "payments" "Payments"
create_attr "payments" "project_id" "Project ID" "string" 255 true
create_attr "payments" "customer_id" "Customer ID" "string" 255 true
create_attr "payments" "amount" "Amount" "integer" 0 true
create_attr "payments" "currency" "Currency" "string" 10 true
create_attr "payments" "status" "Status" "string" 50 true
create_attr "payments" "payment_method" "Payment Method" "string" 50 true
create_attr "payments" "stripe_payment_id" "Stripe Payment ID" "string" 255 false
create_attr "payments" "stripe_invoice_id" "Stripe Invoice ID" "string" 255 false
create_attr "payments" "transaction_id" "Transaction ID" "string" 255 false
create_attr "payments" "notes" "Notes" "string" 500 false
create_attr "payments" "created_at" "Created At" "datetime" 0 true
create_attr "payments" "updated_at" "Updated At" "datetime" 0 true

# 8. Pricing Tiers Collection
create_collection "pricing_tiers" "Pricing Tiers"
create_attr "pricing_tiers" "name" "Name" "string" 100 true
create_attr "pricing_tiers" "description" "Description" "string" 1000 false
create_attr "pricing_tiers" "degree_type" "Degree Type" "string" 50 true
create_attr "pricing_tiers" "field_of_study" "Field of Study" "string" 255 false
create_attr "pricing_tiers" "base_price" "Base Price" "integer" 0 true
create_attr "pricing_tiers" "rush_price_multiplier" "Rush Price Multiplier" "string" 10 false
create_attr "pricing_tiers" "includes" "Includes" "string" 2000 false
create_attr "pricing_tiers" "created_at" "Created At" "datetime" 0 true
create_attr "pricing_tiers" "updated_at" "Updated At" "datetime" 0 true

# 9. Marketing Lists Collection
create_collection "marketing_lists" "Marketing Lists"
create_attr "marketing_lists" "name" "Name" "string" 255 true
create_attr "marketing_lists" "description" "Description" "string" 1000 false
create_attr "marketing_lists" "customer_count" "Customer Count" "integer" 0 true
create_attr "marketing_lists" "created_at" "Created At" "datetime" 0 true
create_attr "marketing_lists" "updated_at" "Updated At" "datetime" 0 true

# 10. Email Campaigns Collection
create_collection "email_campaigns" "Email Campaigns"
create_attr "email_campaigns" "marketing_list_id" "Marketing List ID" "string" 255 true
create_attr "email_campaigns" "subject" "Subject" "string" 255 true
create_attr "email_campaigns" "html_content" "HTML Content" "string" 10000 true
create_attr "email_campaigns" "status" "Status" "string" 50 true
create_attr "email_campaigns" "sent_at" "Sent At" "datetime" 0 false
create_attr "email_campaigns" "open_count" "Open Count" "integer" 0 true
create_attr "email_campaigns" "click_count" "Click Count" "integer" 0 true
create_attr "email_campaigns" "created_at" "Created At" "datetime" 0 true
create_attr "email_campaigns" "updated_at" "Updated At" "datetime" 0 true

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                  ✅ SETUP COMPLETE!                       ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Database: analytics_db"
echo "📂 Collections: 10 created"
echo "📋 Attributes: ~100 created"
echo ""
echo "👉 Next steps:"
echo "   1. Go to https://cloud.appwrite.io/"
echo "   2. Check Databases → analytics_db"
echo "   3. Verify all 10 collections are present"
echo ""
