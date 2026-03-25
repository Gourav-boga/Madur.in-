import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';

export async function GET() {
  try {
    const reviews = await mysql.query('SELECT * FROM reviews WHERE status = "approved" ORDER BY created_at DESC');
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await mysql.insert('reviews', {
      customer_name: data.customer_name,
      rating: data.rating || 5,
      comment: data.comment,
      status: 'approved'
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Review Save Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  try {
    await mysql.remove('reviews', 'id', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
