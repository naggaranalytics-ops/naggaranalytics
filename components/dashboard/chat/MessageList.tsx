'use client';

import { useState } from 'react';
import { Message } from '@/lib/appwrite-types';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  loading: boolean;
}

export function MessageList({ messages, currentUserId, loading }: MessageListProps) {
  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-primary animate-spin" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
        <p>No messages yet.</p>
        <p className="text-sm">Send a message to start the conversation.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isMine = message.sender_id === currentUserId;

        if (message.is_system_message) {
          return (
            <div key={message.$id} className="flex justify-center my-4">
              <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                {message.message_text}
              </span>
            </div>
          );
        }

        return (
          <div
            key={message.$id}
            className={`flex flex-col max-w-[80%] ${
              isMine ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${
                isMine
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-muted text-foreground rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.message_text}</p>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 mx-1">
              {new Date(message.$createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}
