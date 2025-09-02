// components/ProductoDetalleView.js
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FormularioCotizacion from '@/components/FormularioCotizacion';

// Pequeño componente para la "miga de pan"
function Breadcrumbs({ producto }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-primary">Inicio</Link>
        </li>
        <li>
          <span>/</span>
        </li>
        <li>
          <Link href="/productos" className="hover:text-primary">Productos</Link>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="font-semibold text-gray-700" aria-current="page">
          {producto.nombre}
        </li>
      </ol>
    </nav>
  );
}

export default function ProductoDetalleView({ producto }) {
  const [imagenPrincipal, setImagenPrincipal] = useState(producto.imagenes?.[0] || '');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-AR', { 
      style: 'currency', currency: 'ARS',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs producto={producto} />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Columna de la Galería de Imágenes */}
        <div>
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg border">
            {imagenPrincipal && (
              <Image
                key={imagenPrincipal}
                src={imagenPrincipal}
                alt={`Imagen principal de ${producto.nombre}`}
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {producto.imagenes?.map((imagen, index) => (
              <button 
                key={index}
                onClick={() => setImagenPrincipal(imagen)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all
                  ${imagen === imagenPrincipal ? 'border-primary' : 'border-transparent hover:border-gray-400'}
                `}
              >
                <Image
                  src={imagen}
                  alt={`Miniatura ${index + 1} de ${producto.nombre}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Columna de la Información */}
        <div className="py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-main">{producto.nombre}</h1>
          {producto.sku && <p className="text-sm text-gray-500 mt-2">SKU: {producto.sku}</p>}
          
          <div className="my-4">
            {producto.precioPromocional > 0 ? (
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4">
                <p className="text-3xl font-bold text-accent">
                  {formatPrice(producto.precioPromocional)}
                </p>
                <p className="text-xl text-gray-500 line-through">
                  {formatPrice(producto.precio)}
                </p>
              </div>
            ) : (
              <p className="text-3xl font-semibold mt-4 text-text-main">
                {formatPrice(producto.precio)}
              </p>
            )}
          </div>

          <div className="mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-text-main">Descripción</h2>
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: producto.descripcion }} 
            />
          </div>

          {producto.isQuotable && (
            <div className="mt-8">
              {!mostrarFormulario ? (
                <button onClick={() => setMostrarFormulario(true)} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-primary-dark transition-colors duration-300">
                  Solicitar Cotización
                </button>
              ) : (
                <FormularioCotizacion productoNombre={producto.nombre} onClose={() => setMostrarFormulario(false)} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}