"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
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
        setLoading(false); 
      } else {
        setUser(null);
        destroyCookie(null, "session");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true); // Manually set loading for popup UX
    try {
      const provider = new GoogleAuthProvider();
      // Force account selection every time
      provider.setCustomParameters({
        prompt: "select_account"
      });
      
      await signInWithPopup(auth, provider);
      // Success is handled by onIdTokenChanged
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/popup-blocked') {
         toast.error("Popup blocked! Please allow popups for this site in your browser URL bar.", { duration: 6000 });
      } else if (error.code === 'auth/popup-closed-by-user') {
         toast.error("Login cancelled.");
      } else {
         toast.error(error.message || "Login failed");
      }
      setLoading(false); // Stop loading on error
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Call server route to strictly clear the cookie
      await fetch("/api/clear-session");
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
