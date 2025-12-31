"use client";

import { useEffect, useState } from "react";
import { X, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { NewsArticle } from "@/services/news.service";
import clsx from "clsx";

interface NewsDetailViewProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function NewsDetailView({ article, onClose }: NewsDetailViewProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation timing
  useEffect(() => {
    if (article) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [article]);

  // Don't render until active (but keep rendered during exit animation if we tracked previous article, complex for now)
  // Simplified: If no article, and not visible, null. 
  // But we want exit animation. So we need to delay unmount?
  // Let's rely on CSS transforms on a persistent container or condition on prop.
  
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end md:items-stretch items-end">
      {/* Backdrop */}
      <div 
        className={clsx(
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={clsx(
            "relative w-full md:w-[600px] lg:w-[800px] bg-white h-[90vh] md:h-full shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)", // Standard stylish ease
            // Mobile: Slide up from bottom
            "rounded-t-2xl md:rounded-none transform",
            isVisible ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"
        )}
      >
        {/* Header (Sticky) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 rounded-t-2xl md:rounded-none">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Article Preview
            </h2>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 md:p-10">
            {/* Meta */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 text-sm text-gray-500 mb-6">
                <span className={`self-start px-2 py-0.5 rounded font-bold text-xs ${article.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {article.isPublished ? "PUBLISHED" : "DRAFT"}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(article.publishedAt, "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author.name || "Admin"}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-8">
                {article.title}
            </h1>

            {/* Featured Image */}
            {article.imageUrl && (
                <div className="rounded-2xl overflow-hidden shadow-lg mb-8 aspect-video relative bg-gray-100">
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Markdown Content (Matched Styles) */}
            <div className="prose prose-indigo prose-lg max-w-none">
                 <ReactMarkdown
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-gray-900 text-3xl font-bold mb-4 mt-8" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-gray-900 text-2xl font-bold mb-4 mt-8" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-gray-900 text-xl font-bold mb-3 mt-6" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-800 mb-6 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-6 space-y-2 text-gray-800" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-gray-800" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="text-gray-900 font-bold" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-8 italic bg-indigo-50 text-indigo-900 rounded-r-lg" {...props} />,
                        a: ({node, ...props}) => <a className="text-indigo-600 hover:text-indigo-800 underline font-medium" {...props} />,
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>
        </div>
      </div>
    </div>
  );
}
