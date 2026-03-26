import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import mysql from "@/lib/mysql";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id, // This is our internal database order ID
      type = 'order',
      amount
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        if (type === 'subscription') {
          try {
            await mysql.query(`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(255)`);
            await mysql.query(`ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10, 2)`);
          } catch(e) {}

          await mysql.update('subscriptions', { 
            status: 'active',
            razorpay_payment_id: razorpay_payment_id,
           ...(amount && { amount_paid: amount })
          }, 'id', order_id);
        } else {
          await mysql.update('orders', { 
            payment_status: 'paid',
            status: 'processing'
          }, 'id', order_id);
        }
      } catch (dbError: any) {
        console.error("Database update error after payment verification:", dbError);
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Verification failed" },
      { status: 500 }
    );
  }
}
