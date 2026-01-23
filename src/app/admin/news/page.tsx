"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Calendar, FileText, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { AdminHeader } from "@/components/admin/Header";
import { NewsDetailView } from "@/components/admin/NewsDetailView";
import { NewsService, NewsArticle } from "@/services/news.service";

export default function NewsListPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await NewsService.getAll();
      setNews(data);
    } catch (error) {
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    setDeletingId(id);
    try {
      await NewsService.delete(id);
      toast.success("Article deleted");
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="News & Articles" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Manage your blog posts and announcements.</p>
          <Link 
            href="/admin/news/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Article
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
            <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No articles yet</h3>
            <p className="text-gray-500 mt-1">Get started by creating your first post.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {news.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedArticle(item)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
              >
                {/* Image Preview */}
                <div className="h-40 bg-gray-100 relative">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.isPublished ? "PUBLISHED" : "DRAFT"}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2" title={item.title}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                    {item.excerpt || "No excerpt..."}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <Calendar className="h-3 w-3" />
                    {format(item.publishedAt, "MMM d, yyyy")}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                    <Link
                      href={`/admin/news/${item.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === item.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent"/>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail View Overlay */}
      <NewsDetailView 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
}
