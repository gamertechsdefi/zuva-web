"use client";

import { useAuth } from "@/context/AuthContext";
import { Bell } from "lucide-react";

export function AdminHeader({ title }: { title: string }) {
  const { user } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{user?.displayName || "Admin"}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            {user?.photoURL ? (
                <img 
                    src={user.photoURL} 
                    alt="Avatar" 
                    className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200"
                />
            ) : (
                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user?.email?.[0].toUpperCase()}
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
