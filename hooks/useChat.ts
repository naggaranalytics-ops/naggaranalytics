import { useState, useEffect, useCallback, useRef } from 'react';
import { client, databases } from '@/lib/appwrite';
import { ID, Query, Models } from 'appwrite';
import { Message, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-types';

export function useChat(projectId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Realtime subscription unsubscribe function reference
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // 1. Fetch historical messages
  const fetchMessages = useCallback(async () => {
    if (!projectId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        [
          Query.equal('project_id', projectId),
          Query.orderAsc('$createdAt'), // Fetch oldest to newest for chat UI
          Query.limit(100)
        ]
      );
      // Explicitly map as the defined Message type
      setMessages(response.documents as unknown as Message[]);
    } catch (err: any) {
      console.error('Failed to load messages:', err);
      setError(err.message || 'Error loading messages');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // 2. Subscribe to Realtime updates
  useEffect(() => {
    fetchMessages();

    if (!projectId) return;

    // The channel to listen for all documents in the messages collection
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTIONS.MESSAGES}.documents`;

    const unsubscribe = client.subscribe<Models.Document>(channel, response => {
        // Appwrite Realtime Payloads have event types.
        // E.g., 'databases.*.collections.*.documents.*.create'
        
        const eventType = response.events[0];
        const newDoc = response.payload as unknown as Message;
        
        // Ensure this realtime event actually belongs to the active project
        if (newDoc.project_id === projectId) {
            
            // Handle Create (New Message)
            if (eventType.includes('.create')) {
                setMessages(prev => [...prev, newDoc]);
            }
            
            // Handle Delete (if a message is removed)
            if (eventType.includes('.delete')) {
                setMessages(prev => prev.filter(m => m.$id !== newDoc.$id));
            }

             // Handle Update (if a message is edited)
            if (eventType.includes('.update')) {
                setMessages(prev => prev.map(m => m.$id === newDoc.$id ? newDoc : m));
            }
        }
    });

    unsubscribeRef.current = unsubscribe;

    // Cleanup subscription on unmount or when changing active project
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [projectId, fetchMessages]);

  // 3. Send a new message
  const sendMessage = async (
    text: string, 
    senderId: string, 
    attachedFileId?: string, 
    isSystemMessage = false,
    messageType: Message['message_type'] = 'text'
   ) => {
    if (!projectId) throw new Error("A project must be selected to send a message.");

    try {
      // Optimistically we could add it to local state, but relying on realtime is safer
      // for single-source-of-truth.
      
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        ID.unique(),
        {
          project_id: projectId, // will store 'general_support' or 'complaints'
          sender_id: senderId,
          message_text: text,
          attached_file_id: attachedFileId,
          message_type: messageType,
          is_system_message: isSystemMessage,
          created_at: new Date().toISOString()
        }
      );

      // Trigger email and in-app notifications
      fetch('/api/messages/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              sender_id: senderId,
              project_id: projectId,
              message_text: text,
          })
      }).catch(err => console.error('Failed to trigger message notification:', err));

      return response as unknown as Message;
    } catch (err: any) {
      console.error('Failed to send message:', err);
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    refetch: fetchMessages
  };
}
