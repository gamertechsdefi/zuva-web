"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { NewsForm } from "@/components/admin/NewsForm";
import { NewsService, NewsArticle } from "@/services/news.service";

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadArticle(params.id as string);
    }
  }, [params.id]);

  const loadArticle = async (id: string) => {
    try {
      const data = await NewsService.getById(id);
      if (!data) {
        toast.error("Article not found");
        router.push("/admin/news");
        return;
      }
      setNews(data);
    } catch (error) {
      toast.error("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="p-6">
       <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Article</h1>
        <p className="text-gray-500">Update content, fix typos, or change the image.</p>
      </div>
      <NewsForm initialData={news} />
    </div>
  );
}
