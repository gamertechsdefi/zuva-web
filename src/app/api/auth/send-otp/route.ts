import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { transporter } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Generate 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Store in Firestore
    await adminDb.collection("verification_codes").doc(email).set({
      code: otp,
      expiresAt,
      createdAt: Date.now(),
    });

    // Send Email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your Zuva Network Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1a2e; text-align: center;">Welcome to Zuva Network! ${name ? `Hi ${name},` : ""}</h2>
            <p style="text-align: center; color: #555;">Please verify your email address to complete your registration.</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4a90e2; background: #e6f2ff; padding: 10px 20px; border-radius: 5px;">${otp}</span>
            </div>
            <p style="text-align: center; color: #777; font-size: 14px;">This code expires in 10 minutes.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; color: #999; font-size: 12px;">If you didn't sign up for Zuva Network, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP", error: error.message },
      { status: 500 }
    );
  }
}
