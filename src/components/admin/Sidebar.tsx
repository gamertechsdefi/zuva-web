"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Newspaper, 
  CheckSquare, 
  Users, 
  Settings,
  LogOut,
  Zap
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "News / Articles", href: "/admin/news", icon: Newspaper },
  { name: "Tasks / Mining", href: "/admin/tasks", icon: CheckSquare },
  { name: "Users", href: "/admin/users", icon: Users },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();


  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div className={clsx(
        "bg-gray-900 border-r border-gray-800 text-gray-100",
        "flex flex-col h-full w-64",
        "fixed md:static inset-y-0 left-0 z-40",
        "transition-transform duration-300 ease-in-out",
        !isOpen && "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-800 shrink-0">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-wide">Zuva Admin</span>
          
          {/* Mobile Close Button */}
          <button onClick={onClose} className="ml-auto md:hidden text-gray-400 hover:text-white">
             {/* <X className="h-5 w-5" /> - Can add X icon later if needed, but tap outside works */}
          </button>
        </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose} // Auto-close on mobile nav
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className={clsx("h-5 w-5", isActive ? "text-indigo-400" : "text-gray-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 shrink-0">
        <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
        >
            <LogOut className="h-5 w-5" />
            Sign Out
        </button>  
        <div className="mt-4 px-3 text-xs text-gray-600">
          v1.0.0 &copy; Zuva Network
        </div>
      </div>
      </div>
    </>
  );
}
