import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BSON } from 'mongodb';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- FUNCIÓN GET---
export async function GET(request, { params }) {
  try {
    const { id } = params;
    if (!BSON.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID de producto inválido' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("catalogoDB");
    const producto = await db.collection("productos").findOne({ _id: new BSON.ObjectId(id) });
    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json(producto);
  } catch (e) {
    return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
  }
}

// --- FUNCIÓN PUT ---
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json(); // Los datos actualizados del producto
    if (!BSON.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID de producto inválido' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("catalogoDB");
    const resultado = await db.collection("productos").updateOne(
      { _id: new BSON.ObjectId(id) },
      { $set: body } // Le decimos a MongoDB que actualice el producto con los datos del body
    );
    return NextResponse.json(resultado);
  } catch (e) {
    return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 });
  }
}


// --- FUNCIÓN DELETE ---
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    if (!BSON.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID de producto inválido' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("catalogoDB");

    // 1. Antes de borrar, buscamos el producto para obtener sus imágenes
    const productoAEliminar = await db.collection("productos").findOne({ _id: new BSON.ObjectId(id) });

    if (!productoAEliminar) {
      return NextResponse.json({ error: 'Producto no encontrado para eliminar' }, { status: 404 });
    }

    // 2. Si el producto tiene imágenes, las borramos de Cloudinary
    if (productoAEliminar.imagenes && productoAEliminar.imagenes.length > 0) {
      // Extraemos el 'public_id' de cada URL para decirle a Cloudinary qué borrar
      const publicIds = productoAEliminar.imagenes.map(url => {
        // Ejemplo de URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/productos/imagen.jpg
        // El public_id es "productos/imagen"
        const parts = url.split('/');
        const publicIdWithExtension = parts.slice(parts.indexOf('productos')).join('/');
        return publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
      });

      // Damos la orden de eliminar todas esas imágenes
      await cloudinary.api.delete_resources(publicIds);
    }

    // 3. Ahora sí, eliminamos el producto de MongoDB
    const resultado = await db.collection("productos").deleteOne({ _id: new BSON.ObjectId(id) });

    return NextResponse.json({ message: "Producto y sus imágenes eliminados", resultado });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
  }
}