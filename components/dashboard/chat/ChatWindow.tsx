'use client';

import { Suspense } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Project } from '@/lib/appwrite-types';

interface ChatWindowProps {
  project: Project | null;
  currentUserId: string;
}

export function ChatWindow({ project, currentUserId }: ChatWindowProps) {
  // If no project is selected, useChat handles null gracefully
  const { messages, loading, sendMessage } = useChat(project?.$id ?? null);

  const handleSendMessage = async (text: string) => {
    if (!project) return;
    await sendMessage(text, currentUserId);
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-r-xl border-l relative shadow-inner">
      {/* Chat Windows Header */}
      <div className="h-16 border-b flex items-center px-6 bg-card/50">
        {project ? (
          <div>
            <h2 className="font-semibold text-lg">{project.title}</h2>
            <p className="text-xs text-muted-foreground">
              Status: <span className="capitalize">{project.status.replace('_', ' ')}</span>
            </p>
          </div>
        ) : (
          <h2 className="text-muted-foreground">Select a project to view messages</h2>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-muted/10">
        {project ? (
          <MessageList 
            messages={messages} 
            currentUserId={currentUserId} 
            loading={loading} 
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
            <div className="max-w-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Your Messages</h3>
              <p className="mt-2 text-sm">Select an active project from the sidebar to view your conversation history or start a new message.</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={!project} 
      />
    </div>
  );
}
