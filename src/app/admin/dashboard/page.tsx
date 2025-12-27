"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Welcome, {user?.displayName || "Admin"}
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                You have successfully authenticated via Google and verified your
                admin status against the secure whitelist.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Manage Users (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
