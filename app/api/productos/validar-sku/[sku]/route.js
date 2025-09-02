// app/api/productos/validar-sku/[sku]/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    const { sku } = params;
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const productoExistente = await db.collection("productos").findOne({ sku: sku });

    // Si encontramos un producto, significa que el SKU ya existe
    return NextResponse.json({ existe: !!productoExistente });

  } catch (e) {
    return NextResponse.json({ error: 'Error al validar SKU' }, { status: 500 });
  }
}