"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AdminHeader } from "@/components/admin/Header";
import { NewsService } from "@/services/news.service";
import { Newspaper, FileText, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const news = await NewsService.getAll();
      setStats({
        total: news.length,
        published: news.filter(n => n.isPublished).length,
        drafts: news.filter(n => !n.isPublished).length
      });
    } catch (error) {
      console.error("Failed to load stats", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Dashboard" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800">
                Welcome back, {user?.displayName?.split(" ")[0] || "Admin"}! 👋
            </h2>
            <p className="text-gray-500 mt-1">Here's what's happening with your content today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Newspaper className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Articles</p>
                    <p className="text-2xl font-bold text-gray-900">{loading ? "-" : stats.total}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Published</p>
                    <p className="text-2xl font-bold text-gray-900">{loading ? "-" : stats.published}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <FileText className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Drafts</p>
                    <p className="text-2xl font-bold text-gray-900">{loading ? "-" : stats.drafts}</p>
                </div>
            </div>
        </div>

        {/* Quick Actions / Recent (Placeholder) */}
        {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <p className="text-gray-400 text-sm">No recent activity logged.</p>
        </div> */}
      </main>
    </div>
  );
}
