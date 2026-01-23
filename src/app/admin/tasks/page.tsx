"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Link as LinkIcon, ExternalLink, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import { AdminHeader } from "@/components/admin/Header";
import { TasksService, Task } from "@/services/tasks.service";

export default function TasksListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await TasksService.getAll();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    setDeletingId(id);
    try {
      await TasksService.delete(id);
      toast.success("Task deleted");
      setTasks(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (task: Task) => {
      // Optimistic update
      const newData = !task.isActive;
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, isActive: newData } : t));
      
      try {
          await TasksService.update(task.id, { isActive: newData });
          toast.success(`Task ${newData ? 'activated' : 'deactivated'}`);
      } catch (error) {
          // Revert
          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, isActive: task.isActive } : t));
          toast.error("Update failed");
      }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <AdminHeader title="Tasks & Mining" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Management</h2>
            <p className="text-gray-500 text-sm">Manage social, daily, and partner tasks for the app.</p>
          </div>
          <Link 
            href="/admin/tasks/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Create Task
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
            <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
            <p className="text-gray-500 mt-1">Create tasks for your users to complete.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 transition-colors shadow-sm flex items-center justify-between group"
              >
                {/* Left: Info */}
                <div className="flex items-center gap-4">
                    {/* Icon Placeholder based on category */}
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        item.category === 'Daily' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                        item.category === 'Social' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30' :
                        'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                    }`}>
                         {item.category === 'Daily' ? <RefreshCw className="w-5 h-5"/> : <LinkIcon className="w-5 h-5"/>}
                    </div>
                
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${item.isSpecial ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                                {item.title}
                            </h3>
                            {item.isSpecial && (
                                <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded uppercase">Special</span>
                            )}
                            {!item.isActive && (
                                <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded uppercase">Inactive</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                             <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                {item.category}
                             </span>
                             <span className="font-mono text-indigo-500 font-bold">
                                +{item.reward} pts
                             </span>
                             {item.actionUrl && (
                                 <a href={item.actionUrl} target="_blank" className="flex items-center gap-1 hover:text-indigo-400">
                                    <ExternalLink className="w-3 h-3"/> Link
                                 </a>
                             )}
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                   <button 
                        onClick={() => handleToggleActive(item)}
                        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                            item.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                   >
                       {item.isActive ? "Active" : "Disabled"}
                   </button>
                    
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                  <Link
                    href={`/admin/tasks/${item.id}`}
                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
