"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AdminHeader } from "@/components/admin/Header";
import { TaskForm } from "@/components/admin/TaskForm";
import { TasksService, Task } from "@/services/tasks.service";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [params.id]);

  const loadTask = async () => {
    try {
      const data = await TasksService.getById(params.id as string);
      if (!data) {
        toast.error("Task not found");
        router.push("/admin/tasks");
        return;
      }
      setTask(data);
    } catch (error) {
      toast.error("Error loading task");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <AdminHeader title="Edit Task" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Task</h1>
            <p className="text-gray-500">Update task details and rewards.</p>
        </div>
        {task && <TaskForm initialData={task} />}
      </main>
    </div>
  );
}
