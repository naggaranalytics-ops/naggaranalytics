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
            
            {/* General Chat / Complaints */}
            <div className="mb-4 space-y-2 border-b pb-4">
              <button
                  onClick={() => setSelectedProjectId('general_support')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-start gap-3 ${
                    selectedProjectId === 'general_support'
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-accent/50 text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-full mt-0.5 ${
                    selectedProjectId === 'general_support' ? "bg-primary-foreground/20" : "bg-muted"
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">Contact Customer Service</p>
                    <p className={`text-xs truncate mt-1 ${
                      selectedProjectId === 'general_support' ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      General inquiries & help
                    </p>
                  </div>
              </button>
              <button
                  onClick={() => setSelectedProjectId('complaints')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-start gap-3 flex-row ${
                    selectedProjectId === 'complaints'
                      ? "bg-red-500 text-white shadow-sm" 
                      : "hover:bg-red-500/10 text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-full mt-0.5 ${
                    selectedProjectId === 'complaints' ? "bg-white/20" : "bg-red-500/10 text-red-500"
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">Complaints & Issues</p>
                    <p className={`text-xs truncate mt-1 ${
                      selectedProjectId === 'complaints' ? "text-white/80" : "text-muted-foreground"
                    }`}>
                      Report a problem
                    </p>
                  </div>
              </button>
            </div>

            <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">Your Projects</h3>
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
          selectedPseudoId={['general_support', 'complaints'].includes(selectedProjectId ?? '') ? selectedProjectId : null}
        />
      </div>
    </div>
  );
}
