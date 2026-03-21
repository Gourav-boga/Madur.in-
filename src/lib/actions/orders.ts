"use server";

import { supabase } from "@/lib/supabase";
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
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_email: email,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        payment_method: orderData.payment_method,
        status: "pending"
      })
      .select()
      .single();

    if (orderError) throw new Error(`Order placement error: ${orderError.message}`);

    // 3. Insert Order Items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      unit: item.unit
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw new Error(`Order items error: ${itemsError.message}`);

    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Place order action error:", error);
    return { success: false, error: error.message || "Failed to place order." };
  }
}
