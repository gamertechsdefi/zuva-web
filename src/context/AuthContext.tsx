"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Safety Timeout: Force stop loading after 8 seconds if Firebase hangs
    timeoutId = setTimeout(() => {
      setLoading((prev) => {
        if (prev) {
          console.warn("AuthContext: Safety timeout triggered. Force stopping loading.");
          return false;
        }
        return prev;
      });
    }, 8000);

    // 1. Listen for Auth State Changes
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      console.log("AuthContext: onIdTokenChanged triggered. User:", user?.email);
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setCookie(null, "session", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setLoading(false); // User found, stop loading immediately
        clearTimeout(timeoutId);
      } else {
        setUser(null);
        destroyCookie(null, "session");
        // Don't stop loading here yet! Wait for getRedirectResult.
        // UNLESS we are sure there is no redirect pending? It's hard to know.
        // We rely on the Timeout or getRedirectResult to clear this.
      }
    });

    // 2. Check for Redirect Result (Handles the page reload after Google login)
    getRedirectResult(auth)
      .then((result) => {
        console.log("AuthContext: getRedirectResult resolved. Result:", result);
        // If no redirect calculation happened (result is null) AND no user, stop loading.
        if (!result && !auth.currentUser) {
          console.log("AuthContext: No redirect result and no user. Stop loading.");
          setLoading(false);
          clearTimeout(timeoutId);
        }
      })
      .catch((error) => {
        console.error("AuthContext: Redirect Login Error:", error);
        toast.error(error.message || "Login failed");
        setLoading(false);
        clearTimeout(timeoutId);
      });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error.message || "Login failed");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
