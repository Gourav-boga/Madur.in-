"use server";

import mysql from "@/lib/mysql";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only-change-this";
const OTP_EXPIRY_MINUTES = 10;

// SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendOtpAction(email: string) {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save to MySQL
    await mysql.insert("otps", {
      email,
      code: otp,
      expires_at: expiresAt.toISOString().slice(0, 19).replace('T', ' ')
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Madur.in Auth" <auth@madur.in>',
      to: email,
      subject: "Your Verification Code - Madur.in",
      text: `Your verification code is: ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Welcome to Madur.in</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; margin: 20px 0;">${otp}</div>
          <p>This code will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error("OTP send error:", error);
    return { success: false, error: error.message || "Failed to send OTP" };
  }
}

export async function verifyOtpAction(email: string, code: string) {
  try {
    // Check code in database
    const results = await mysql.query(
      `SELECT * FROM otps WHERE email = ? AND code = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [email, code]
    );

    if (!results || results.length === 0) {
      return { success: false, error: "Invalid or expired code." };
    }

    const data = results[0];

    // Code is valid! Create JWT
    const token = jwt.sign(
      { email, sub: email }, // Standard claims
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Cleanup: Remove used OTP
    await mysql.remove("otps", "id", data.id);

    return { success: true };
  } catch (error: any) {
    console.error("OTP verify error:", error);
    return { success: false, error: error.message || "Verification failed" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}
