// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll('files');

  if (files.length === 0) {
    return NextResponse.json({ error: 'No se subieron archivos' }, { status: 400 });
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'productos' }, (err, result) => {
          if (err) {
            console.error('Error en Cloudinary:', err);
            reject(err);
          }
          resolve(result);
        }).end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map(result => result.secure_url);
    
    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    return NextResponse.json({ error: 'Error al subir imágenes' }, { status: 500 });
  }
}