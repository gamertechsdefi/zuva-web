import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/login");
  }

  try {
    // 1. Verify Token
    const decodedToken = await adminAuth.verifyIdToken(session);
    const email = decodedToken.email;

    if (!email) {
      console.error("AdminLayout: No email found in token");
      throw new Error("No email in token");
    }

    // 2. Check Whitelist in Firestore
    const adminDoc = await adminDb.collection("admins").doc(email).get();

    if (!adminDoc.exists) {
      console.warn(`Unauthorized access attempt by: ${email}`);
      redirect("/login?error=unauthorized"); 
    }

    // Access Granted - Render Responsive Shell
    return (
      <AdminShell>
          {children}
      </AdminShell>
    );

  } catch (error) {
    console.error("Admin verification failed", error);
    redirect("/api/clear-session");
  }
}
