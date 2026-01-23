"use client";

import { NewsForm } from "@/components/admin/NewsForm";

export default function CreateNewsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Article</h1>
        <p className="text-gray-500">Draft your story and share it with the world.</p>
      </div>
      <NewsForm />
    </div>
  );
}
