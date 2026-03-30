import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';

export async function GET() {
  try {
    const slides = await mysql.query('SELECT * FROM hero_slides WHERE active = TRUE ORDER BY created_at DESC');
    // Fallback if empty
    if (slides.length === 0) {
      return NextResponse.json([
        { image_url: "/hero/hero-1.png" },
        { image_url: "/hero/hero-2.png" },
        { image_url: "/hero/hero-3.png" },
        { image_url: "/hero/hero-4.png" },
        { image_url: "/hero/hero-5.png" },
      ]);
    }
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await mysql.insert('hero_slides', {
      image_url: data.image_url,
      title: data.title || '',
      subtitle: data.subtitle || '',
      active: true
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  try {
    await mysql.remove('hero_slides', 'id', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

