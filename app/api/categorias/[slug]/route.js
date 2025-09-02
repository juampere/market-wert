import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// --- Función DELETE: Para eliminar una categoría por su slug ---
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const resultado = await db.collection("categorias").deleteOne({ slug: slug });

    if (resultado.deletedCount === 0) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: "Categoría eliminada" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al eliminar la categoría' }, { status: 500 });
  }
}