import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, DATABASE_ID, COLLECTIONS, ID } from '@/lib/appwrite-server';
import { Project, User } from '@/lib/appwrite-types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sender_id, project_id, message_text } = body;

        if (!sender_id || !project_id || !message_text) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { databases } = createAdminClient();
        
        // 1. Determine recipient
        let recipient_id: string | null = null;
        let projectName = 'Customer Service';

        // Check if it's a pseudo project
        if (project_id.startsWith('general_') || project_id.startsWith('complaints_')) {
            const customerId = project_id.split('_').pop();
            // If sender is admin, recipient is the customer
            // If sender is customer, recipient is the admin (no specific admin assigned, but we can notify the global admin email)
            if (sender_id !== customerId) {
                recipient_id = customerId;
            }
            projectName = project_id.startsWith('complaints') ? 'Complaints & Issues' : 'Customer Service';
        } else {
            // Real project
            const project = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                project_id
            ) as unknown as Project;
            
            projectName = project.title;
            
            if (sender_id === project.customer_id) {
                // If the customer sent the message, notify the admin/technician if assigned
                recipient_id = project.admin_id || null;
            } else {
                // If the admin sent the message, notify the customer
                recipient_id = project.customer_id;
            }
        }

        // 2. Fetch recipient details
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        let recipientEmail = ADMIN_EMAIL;
        let recipientName = 'Admin';

        if (recipient_id) {
            try {
                const user = await databases.getDocument(
                    DATABASE_ID,
                    COLLECTIONS.USERS,
                    recipient_id
                ) as unknown as User;
                recipientEmail = user.email;
                recipientName = user.name;
                
                // 3. Create In-App Notification (only if there is a distinct user recipient)
                await databases.createDocument(
                    DATABASE_ID,
                    COLLECTIONS.NOTIFICATIONS,
                    ID.unique(),
                    {
                        user_id: recipient_id,
                        project_id: project_id.startsWith('general_') || project_id.startsWith('complaints_') ? null : project_id,
                        title: `New message in ${projectName}`,
                        message: message_text.length > 50 ? message_text.substring(0, 50) + '...' : message_text,
                        type: 'custom',
                        read: false,
                        created_at: new Date().toISOString()
                    }
                );
            } catch (userErr) {
                console.error("Could not fetch recipient user to notify:", userErr);
            }
        }

        // 4. Send Email Notification via Resend
        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (RESEND_API_KEY && recipientEmail) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Naggar Analytics <onboarding@resend.dev>',
                    to: [recipientEmail],
                    subject: `New Message: ${projectName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>You have a new message from Naggar Analytics</h2>
                            <p><strong>Project:</strong> ${projectName}</p>
                            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p style="margin: 0; font-style: italic;">"${message_text}"</p>
                            </div>
                            <p>Please log in to your dashboard to view and reply to this message.</p>
                        </div>
                    `,
                }),
            }).catch(() => {}); // Don't block
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: unknown) {
        console.error('Email notification error:', err);
        return NextResponse.json({ error: 'Failed to process notification' }, { status: 500 });
    }
}
