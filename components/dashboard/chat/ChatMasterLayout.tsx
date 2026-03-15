'use client';

import { useState } from 'react';
import { Project } from '@/lib/appwrite-types';
import { ChatWindow } from './ChatWindow';
import { MessageSquare, FolderKanban } from 'lucide-react';

interface ChatMasterLayoutProps {
  projects: Project[];
  currentUserId: string;
}

export function ChatMasterLayout({ projects, currentUserId }: ChatMasterLayoutProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.$id === selectedProjectId) || null;

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-background border rounded-xl overflow-hidden shadow-sm">
      {/* Sidebar: Projects List */}
      <div className="w-80 flex-shrink-0 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b bg-card">
          <h2 className="font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Active Conversations
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Select a project to chat</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-2">
            {projects.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">
                <p className="text-sm">No active projects found.</p>
              </div>
            ) : (
              projects.map(project => (
                <button
                  key={project.$id}
                  onClick={() => setSelectedProjectId(project.$id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-start gap-3 ${
                    selectedProjectId === project.$id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-accent/50 text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-full mt-0.5 ${
                    selectedProjectId === project.$id ? "bg-primary-foreground/20" : "bg-muted"
                  }`}>
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{project.title}</p>
                    <p className={`text-xs truncate mt-1 ${
                      selectedProjectId === project.$id ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      Status: {project.status.replace('_', ' ')}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0 relative bg-background">
        <ChatWindow 
          project={activeProject} 
          currentUserId={currentUserId} 
        />
      </div>
    </div>
  );
}
