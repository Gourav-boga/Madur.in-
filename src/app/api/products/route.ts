import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';
import { products as staticProducts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  try {
    let sql = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      sql += ` AND c.name = ?`;
      params.push(category);
    }

    if (search) {
      sql += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY p.created_at DESC`;

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(parseInt(limit));
    }

    const products = await mysql.query(sql, params);
    
    // If no products found in DB (especially in local dev), use static data
    if (Array.isArray(products) && products.length === 0) {
      console.log('No products in DB, falling back to static data');
      let filtered = [...staticProducts];
      if (category) filtered = filtered.filter(p => p.category === category);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
      }
      return NextResponse.json(limit ? filtered.slice(0, parseInt(limit)) : filtered);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Products Error:', error);
    // Fallback on total failure (like connection error)
    return NextResponse.json(limit ? staticProducts.slice(0, parseInt(limit)) : staticProducts);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await mysql.insert('products', {
      name: data.name,
      category_id: data.category_id,
      price: data.price,
      image_url: data.image_url,
      description: data.description,
      unit: data.unit,
      is_available: !data.is_out_of_stock
    });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Products POST Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}

// We'll use a dynamic segment for PUT/DELETE usually, but for simplicity we can check for ID in params or body
// Actually, let's keep it clean and use this for PATCH as well if needed
export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const result = await mysql.update('products', {
      name: updateData.name,
      category_id: updateData.category_id,
      price: updateData.price,
      image_url: updateData.image_url,
      description: updateData.description,
      unit: updateData.unit,
      is_available: !updateData.is_out_of_stock
    }, 'id', id);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Products PATCH Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  try {
    await mysql.remove('products', 'id', id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Products DELETE Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}

