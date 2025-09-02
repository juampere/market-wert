import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// --- Función GET ---
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("catalogoDB");
    
    const { searchParams } = new URL(request.url);
    const filtro = searchParams.get('filtrar');

    const query = {};
    if (filtro === 'home') {
      query.mostrarEnHome = true;
    }

    const categorias = await db.collection("categorias").find(query).toArray();
    return NextResponse.json(categorias);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 });
  }
}

// --- Función POST: Para crear una nueva categoría ---
export async function POST(request) {
  try {
    const nuevaCategoria = await request.json();
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const resultado = await db.collection("categorias").insertOne(nuevaCategoria);
    return NextResponse.json({ message: "Categoría creada", categoria: resultado }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 });
  }
}