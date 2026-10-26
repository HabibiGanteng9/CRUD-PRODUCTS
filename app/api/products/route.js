import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db'; 

export async function GET() {
  try {
    const pool = getPool();
    const query = `
      SELECT p.*, c.name_category 
      FROM products p 
      LEFT JOIN categories c ON p.id_category = c.id 
      ORDER BY p.id DESC
    `;
    const [rows] = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, id_category, price } = body;

    if (!id_category) {
      return NextResponse.json({ error: 'Kategori produk wajib dipilih!' }, { status: 400 });
    }

    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO products (name, description, id_category, price) VALUES (?, ?, ?, ?)',
      [name, description, id_category, price]
    );

    return NextResponse.json({ id: result.insertId, ...body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}