"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { TasksService, Task, TaskCategory } from "@/services/tasks.service";

interface TaskFormProps {
  initialData?: Task;
}

const CATEGORIES: TaskCategory[] = ["One Time", "Daily", "Social", "Games & Products"];

export function TaskForm({ initialData }: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<Partial<Task>>({
    defaultValues: initialData || {
      isActive: true,
      isSpecial: false,
      buttonText: "Claim",
      order: 0,
    }
  });

  const onSubmit = async (data: Partial<Task>) => {
    setLoading(true);
    try {
      const payload: any = {
          ...data,
          reward: Number(data.reward) || 0,
          order: Number(data.order) || 0,
      };

      if (initialData?.id) {
        await TasksService.update(initialData.id, payload);
        toast.success("Task updated!");
      } else {
        await TasksService.create(payload);
        toast.success("Task created!");
      }
      router.push("/admin/tasks");
      router.refresh(); // Refresh server lists
    } catch (error) {
      console.error(error);
      toast.error("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link 
            href="/admin/tasks"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Task Details</h3>
                
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        placeholder="e.g. Follow us on X"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Button Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input
                            {...register("buttonText", { required: "Button text is required" })}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-gray-400"
                            placeholder="e.g. Claim"
                        />
                    </div>
                </div>

                 {/* Action Link */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
                    <input
                        {...register("actionUrl")}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-gray-400"
                        placeholder="https://twitter.com/..."
                    />
                </div>
            </div>
        </div>

        {/* Sidebar Config */}
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration</h3>

                {/* Reward */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward (Points)</label>
                    <input
                        type="number"
                        {...register("reward", { required: true, min: 0 })}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none font-mono placeholder:text-gray-400"
                        placeholder="500"
                    />
                </div>

                {/* Order */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                    <input
                        type="number"
                        {...register("order")}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-gray-400"
                        placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">lower numbers appear first</p>
                </div>

                <hr className="border-gray-200 my-4"/>

                {/* Is Active */}
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Is Active?</label>
                    <input 
                        type="checkbox"
                        {...register("isActive")}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                </div>

                {/* Is Special */}
                <div className="flex items-center justify-between">
                    <div className="mr-4">
                        <label className="text-sm font-medium text-gray-700 block">Special Highlight</label>
                        <p className="text-xs text-gray-500">Shows as primary color in Hub</p>
                    </div>
                    <input 
                        type="checkbox"
                        {...register("isSpecial")}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                </div>

            </div>
        </div>
      </div>
    </form>
  );
}
