// lib/mongodb.js
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // En modo de desarrollo, usamos una variable global para preservar el valor
  // a través de las recargas en caliente (hot reloads).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // En producción, es más simple.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Exportamos una promesa del cliente de MongoDB.
// Esto nos permite ser agnósticos al framework y usarlo en cualquier lugar.
export default clientPromise