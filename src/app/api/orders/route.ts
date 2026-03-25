import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    let query = 'SELECT * FROM orders';
    const params: any[] = [];

    if (email) {
      query += ' WHERE user_email = ?';
      params.push(email);
    }

    query += ' ORDER BY created_at DESC';
    const orders = await mysql.query(query, params);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await mysql.insert('orders', {
      user_email: data.user_email,
      total_amount: data.total_amount,
      status: data.status || 'pending',
      items: JSON.stringify(data.items || []),
      shipping_address: typeof data.shipping_address === 'string' ? data.shipping_address : JSON.stringify(data.shipping_address || {})
    });
    return NextResponse.json({ id: (result as any).insertId });
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
