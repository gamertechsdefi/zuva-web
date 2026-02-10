import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    // Check code in Firestore
    const docRef = adminDb.collection("verification_codes").doc(email);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { message: "Verification code not found or expired" },
        { status: 404 }
      );
    }

    const data = docSnap.data();

    if (!data) {
      return NextResponse.json(
        { message: "Invalid verification data" },
        { status: 500 }
      );
    }

    if (data.code !== code) {
      return NextResponse.json({ message: "Invalid code" }, { status: 400 });
    }

    if (Date.now() > data.expiresAt) {
      await docRef.delete(); // Delete expired code
      return NextResponse.json(
        { message: "Verification code expired" },
        { status: 400 }
      );
    }

    // Valid code: Verify user email
    const userRecord = await adminAuth.getUserByEmail(email);
    await adminAuth.updateUser(userRecord.uid, {
      emailVerified: true,
    });

    // Delete verification code
    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Verification failed", error: error.message },
      { status: 500 }
    );
  }
}
