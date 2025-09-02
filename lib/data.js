// lib/data.js
import clientPromise from '@/lib/mongodb';
import { BSON } from 'mongodb';

export async function getProductos(query = {}) {
  try {
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const productos = await db
      .collection("productos")
      .find(query)
      .sort({ _id: -1 })
      .toArray();

    const totalProductos = await db.collection("productos").countDocuments(query);
    
    // Devolvemos los productos y el total. Importante convertir el _id a string.
    return { 
      productos: JSON.parse(JSON.stringify(productos)), 
      totalProductos 
    };

  } catch (e) {
    console.error(e);
    return { productos: [], totalProductos: 0 };
  }
}

export async function getProductoPorId(id) {
  try {
    if (!BSON.ObjectId.isValid(id)) {
      return null;
    }
    const client = await clientPromise;
    const db = client.db("catalogoDB");

    const producto = await db.collection("productos").findOne({ _id: new BSON.ObjectId(id) });
    
    if (!producto) return null;
    
    return JSON.parse(JSON.stringify(producto));

  } catch (e) {
    console.error(e);
    return null;
  }
}

