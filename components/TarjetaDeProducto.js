// components/TarjetaDeProducto.js
import Image from 'next/image';
import Link from 'next/link';

export default function TarjetaDeProducto({ producto }) {
  const imagenPrincipal = producto.imagenes && producto.imagenes.length > 0 
    ? producto.imagenes[0] 
    : 'https://placehold.co/600x400/E8D8C4/4D4D4D.png?text=Sin+Imagen';

  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <Link 
      href={`/productos/${producto._id}`} 
      className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Contenedor de la Imagen */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
        <Image
          src={imagenPrincipal}
          alt={`Imagen de ${producto.nombre}`}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        
        {/* --- Badge de Oferta --- */}
        {producto.precioPromocional > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
            ¡OFERTA!
          </div>
        )}
      </div>

      {/* Contenedor del Texto */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-main leading-tight mb-2 flex-grow" title={producto.nombre}>
          {producto.nombre}
        </h3>
        
        {/* Lógica de Precios */}
        <div className="mt-2 mb-4 h-12">
          {producto.precioPromocional > 0 ? (
            <div>
              <p className="text-md text-gray-500 line-through">
                {formatPrice(producto.precio)}
              </p>
              <p className="text-2xl font-bold text-accent">
                {formatPrice(producto.precioPromocional)}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-text-main">
              {formatPrice(producto.precio)}
            </p>
          )}
        </div>
        
        {/* Botón/Llamada a la acción */}
        <div 
          className={`w-full text-center mt-auto px-4 py-2 rounded-md text-white font-bold transition-colors duration-300 ${
            producto.isQuotable 
              ? 'bg-primary group-hover:bg-primary-dark' 
              : 'bg-green-600 group-hover:bg-green-700'
          }`}
        >
          {producto.isQuotable ? 'Ver y Cotizar' : 'Comprar Ahora'}
        </div>
      </div>
    </Link>
  );
}