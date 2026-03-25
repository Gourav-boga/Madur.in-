"use server";

import mysql from "@/lib/mysql";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only-change-this";

export async function placeOrderAction(orderData: {
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
    unit?: string;
  }[];
}) {
  try {
    // 1. Get user email from session cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) throw new Error("You must be logged in to place an order.");
    
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const email = decoded.email.toLowerCase();

    // 2. Insert Order
    const orderResult: any = await mysql.insert('orders', {
      user_email: email,
      total_amount: orderData.total_amount,
      shipping_address: orderData.shipping_address,
      payment_method: orderData.payment_method,
      status: "pending"
    });

    const orderId = orderResult.insertId;

    // 3. Insert Order Items
    for (const item of orderData.items) {
      await mysql.insert('order_items', {
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit
      });
    }

    return { success: true, orderId: orderId.toString() };
  } catch (error: any) {
    console.error("Place order action error:", error);
    return { success: false, error: error.message || "Failed to place order." };
  }
}

