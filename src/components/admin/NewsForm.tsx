"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { Loader2, Upload, Image as ImageIcon, Layout, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { NewsArticle, NewsService } from "@/services/news.service";
import { sendNewsNotificationAction } from "@/app/actions/notification.actions";
import { useAuth } from "@/context/AuthContext";
import { clsx } from "clsx";

interface NewsFormProps {
  initialData?: NewsArticle;
}

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Partial<NewsArticle>>({
    defaultValues: initialData || {
      title: "",
      excerpt: "",
      content: "",
      isPublished: true,
    }
  });

  const content = watch("content");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Instant Preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setSelectedFile(file); // Store for later upload
    // toast.success("Image selected");
  };

  const onSubmit = async (data: Partial<NewsArticle>) => {
    if (!user) return;
    setLoading(true);
      
    try {
      let finalImageUrl = data.imageUrl || initialData?.imageUrl;

      // 1. Perform Upload if file selected
      if (selectedFile) {
          try {
              finalImageUrl = await NewsService.uploadImage(selectedFile);
          } catch (error) {
              console.error(error);
              toast.error("Image upload failed. Article not saved.");
              setLoading(false);
              return;
          }
      }

      // Fallback if still no URL
      if (!finalImageUrl) {
          finalImageUrl = "https://placehold.co/800x600?text=No+Image";
      }

      if (initialData?.id) {
        // Update existing article
        const wasPublished = initialData.isPublished;
        const isNowPublished = data.isPublished;
        
        await NewsService.update(initialData.id, { ...data, imageUrl: finalImageUrl });
        
        // Send notification if article is being published (wasn't published before, but is now)
        if (!wasPublished && isNowPublished) {
          try {
            const result = await sendNewsNotificationAction({
              newsId: initialData.id,
              title: data.title!,
              excerpt: data.excerpt,
              imageUrl: finalImageUrl,
            });

            if (result.success) {
              toast.success("Article published and notification sent!");
            } else {
              console.error("Notification failed:", result.error);
              toast.success("Article published (notification failed - check logs)");
            }
          } catch (error) {
            console.error('Failed to send notification:', error);
            toast.success("Article published (notification error)");
          }
        } else {
          toast.success("Article updated!");
        }
      } else {
        // Create new article
        const newArticleId = await NewsService.create({
          title: data.title!,
          excerpt: data.excerpt!,
          content: data.content!,
          imageUrl: finalImageUrl,
          isPublished: data.isPublished || false,
          author: {
            email: user.email!,
            name: user.displayName || "Admin",
            photoURL: user.photoURL || undefined,
          }
        });
        
        // Send notification if article is published
        if (data.isPublished) {
          try {
            const result = await sendNewsNotificationAction({
              newsId: newArticleId,
              title: data.title!,
              excerpt: data.excerpt,
              imageUrl: finalImageUrl,
            });

            if (result.success) {
              toast.success("Article published and notification sent!");
            } else {
              console.error("Notification failed:", result.error);
              toast.success("Article published (notification failed - check logs)");
            }
          } catch (error) {
            console.error('Failed to send notification:', error);
            toast.success("Article published (notification error)");
          }
        } else {
          toast.success("Draft saved!");
        }
      }
      router.push("/admin/news");
    } catch (error) {
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Edit Article" : "New Article"}
        </h2>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    id="published"
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    {...register("isPublished")} 
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish Immediately</label>
            </div>
            
            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {initialData ? "Update" : "Publish"}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold text-lg placeholder:text-gray-400 text-gray-900"
                    placeholder="Enter catchy headline..."
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description)</label>
                <textarea
                    {...register("excerpt", { required: "Excerpt is required" })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Brief summary for the card view..."
                />
            </div>

            {/* Editor (Split View) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-2 gap-4">
                    <button 
                        type="button" 
                        onClick={() => setIsPreviewMode(false)}
                        className={clsx("flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-colors", !isPreviewMode ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700")}
                    >
                        <Layout className="h-4 w-4" /> Write
                    </button>
                    <button 
                         type="button" 
                         onClick={() => setIsPreviewMode(true)}
                         className={clsx("flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-colors", isPreviewMode ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700")}
                    >
                        <Eye className="h-4 w-4" /> Preview
                    </button>
                </div>
                
                <div className="flex-1 relative">
                    {!isPreviewMode ? (
                        <textarea
                            {...register("content", { required: "Content is required" })}
                            className="absolute inset-0 w-full h-full p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 bg-transparent"
                            placeholder="# Write your masterpiece here..."
                        />
                    ) : (
                        <div className="prose prose-indigo max-w-none p-6 h-full overflow-auto bg-white rounded-xl">
                            <ReactMarkdown
                                components={{
                                    h1: ({node, ...props}) => <h1 className="text-gray-900 text-3xl font-bold mb-4 mt-2 !important" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-gray-900 text-2xl font-bold mb-3 mt-6 !important" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-gray-900 text-xl font-bold mb-2 mt-4 !important" {...props} />,
                                    p: ({node, ...props}) => <p className="text-gray-800 mb-4 leading-relaxed !important" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2 !important" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2 !important" {...props} />,
                                    li: ({node, ...props}) => <li className="text-gray-800 pl-1 !important" {...props} />,
                                    strong: ({node, ...props}) => <strong className="text-gray-900 font-bold !important" {...props} />,
                                    blockquote: ({node, ...props}) => <blockquote className="text-gray-600 border-l-4 border-gray-300 pl-4 py-1 my-4 italic bg-gray-50 rounded-r-lg" {...props} />,
                                    a: ({node, ...props}) => <a className="text-indigo-600 hover:underline font-medium" {...props} />,
                                }}
                            >
                                {content || "*Nothing to preview*"}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
            
            {/* Featured Image */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative group cursor-pointer">
                     <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     
                     {imagePreview ? (
                        <div className="relative aspect-video rounded overflow-hidden">
                             <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
                                Change Image
                             </div>
                        </div>
                     ) : (
                        <div className="py-8 text-gray-400">
                             <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                             <span className="text-sm">Click to upload</span>
                        </div>
                     )}
                </div>
            </div>

            {/* Author Info (Read Only) */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-sm font-medium text-gray-700 mb-3">Author</h3>
                 <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                        <img src={user.photoURL} className="h-10 w-10 rounded-full" />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {user?.email?.[0]}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-900">{user?.displayName || "Admin"}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{user?.email}</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </form>
  );
}
