import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

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
    console.log("AdminLayout: Verifying session token...");
    const decodedToken = await adminAuth.verifyIdToken(session);
    const email = decodedToken.email;
    console.log(`AdminLayout: Token verified for email: ${email}`);

    if (!email) {
      console.error("AdminLayout: No email found in token");
      throw new Error("No email in token");
    }

    console.log(`AdminLayout: Checking Firestore whitelist for: ${email}`);
    const adminDoc = await adminDb.collection("admins").doc(email).get();
    console.log(`AdminLayout: Whitelist result for ${email}: ${adminDoc.exists}`);

    if (!adminDoc.exists) {
      console.warn(`Unauthorized access attempt by: ${email}`);
      redirect("/login?error=unauthorized"); 
    }

    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Admin verification failed", error);
    redirect("/api/clear-session");
  }
}
