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
    const decodedToken = await adminAuth.verifyIdToken(session);
    const email = decodedToken.email;

    if (!email) {
      throw new Error("No email in token");
    }

    const adminDoc = await adminDb.collection("admins").doc(email).get();

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
    redirect("/login");
  }
}
