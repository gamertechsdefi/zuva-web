"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
             <span className="text-2xl">⚡</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Zuva Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            For authorized personnel only.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <button
            onClick={signInWithGoogle}
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l2.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.36c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </span>
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
           Protected by Google Cloud Identity & Cloud Firestore.
        </div>
      </div>
    </div>
  );
}
