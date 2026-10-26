import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db'; 

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, id_category, price } = body;

    if (!id_category) {
      return NextResponse.json({ error: 'Kategori produk wajib dipilih!' }, { status: 400 });
    }

    const pool = getPool();
    await pool.query(
      'UPDATE products SET name = ?, description = ?, id_category = ?, price = ? WHERE id = ?',
      [name, description, id_category, price, id]
    );

    return NextResponse.json({ message: 'Produk berhasil diupdate' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const pool = getPool();
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}