import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Helper to get Razorpay client only at runtime
function getRazorpayClient() {
  const Razorpay = require("razorpay");
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_key",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
  });
}

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR" } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    // Initialize client only when needed
    const razorpay = getRazorpayClient();

    const options = {
      amount: amount * 100, // paise
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
