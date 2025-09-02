// app/api/productos/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';


// --- Función GET ---
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("catalogoDB");
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');

    // Construimos la consulta a la base de datos
    const query = {};
    
    if (searchQuery) {
      // Busca tanto en el nombre como en el SKU
      query.$or = [
        { nombre: { $regex: searchQuery, $options: 'i' } },
        { sku: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    if (categoryQuery && categoryQuery !== 'todos') {
      query.categorias = categoryQuery;
    }

    const productos = await db
      .collection("productos")
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalProductos = await db.collection("productos").countDocuments(query);

    return NextResponse.json({ productos, totalProductos });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}

// --- FUNCIÓN POST! ---
export async function POST(request) {
  try {
    const nuevoProducto = await request.json(); // Leemos los datos que envía el formulario
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const resultado = await db.collection("productos").insertOne(nuevoProducto);

    // Devolvemos el producto insertado con su nuevo _id
    return NextResponse.json({ message: "Producto creado", producto: resultado }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear el producto' }, { status: 500 });
  }
}