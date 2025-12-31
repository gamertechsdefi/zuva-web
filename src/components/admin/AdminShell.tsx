"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Menu, Zap } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative w-full">
           
           {/* Mobile Header */}
           <div className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" fill="currentColor" />
                    </div>
                    <span className="font-bold text-lg tracking-wide text-gray-900">Zuva Admin</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="h-6 w-6" />
                </button>
           </div>

           {/* Scrollable Page Content */}
           <div className="flex-1 overflow-auto bg-gray-50">
              {children}
           </div>
        </div>
      </div>
  );
}
