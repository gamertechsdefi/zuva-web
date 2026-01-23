"use client";

import { AdminHeader } from "@/components/admin/Header";
import { TaskForm } from "@/components/admin/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <AdminHeader title="Create Task" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Task</h1>
            <p className="text-gray-500">Add a new earning opportunity for users.</p>
        </div>
        <TaskForm />
      </main>
    </div>
  );
}
