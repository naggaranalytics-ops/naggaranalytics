'use client';

import { useState, KeyboardEvent } from 'react';
import { SendHorizontal, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || isSending || disabled) return;

    try {
      setIsSending(true);
      await onSendMessage(text);
      setText('');
    } catch (error) {
      console.error('Failed to send message', error);
      // Optional: Add toast notification here
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        {/* Optional Attachment Button */}
        <button 
          type="button" 
          disabled={disabled}
          className="shrink-0 rounded-full h-10 w-10 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
          title="Attach file (Coming soon)"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isSending}
            placeholder={disabled ? "Select a project to chat" : "Type your message..."}
            className="w-full min-h-[44px] max-h-32 p-3 pb-3 bg-muted/50 rounded-2xl resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary border-0 scrollbar-thin"
            rows={1}
            style={{ height: 'auto' }}
            // Auto-resize logic could go here
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!text.trim() || isSending || disabled}
          className="shrink-0 rounded-full h-11 w-11 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all font-medium"
        >
          {isSending ? (
            <div className="h-5 w-5 rounded-full border-t-2 border-primary-foreground animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
