// app/(public)/productos/[slug]/page.js

import ProductGrid from '@/components/ProductGrid.js';
import ProductoDetalleView from '@/components/ProductoDetalleView';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

// Esta es la función "inteligente" que decide qué mostrar.
async function getPageData(slug) {
  // Primero, buscamos la lista de categorías desde la API para estar seguros.
  const categoriasRes = await fetch(`${API_URL}/categorias`, { cache: 'no-store' });
  if (!categoriasRes.ok) {
    // Si la API de categorías falla, no podemos saber si es una categoría.
    // Asumimos que podría ser un producto.
    return { esCategoria: false };
  }
  const todasLasCategorias = await categoriasRes.json();
  
  // 1. Verificamos si el 'slug' de la URL coincide con alguna categoría existente.
  const categoriaActual = todasLasCategorias.find(cat => cat.slug === slug);
  
  if (categoriaActual) {
    // Si es una categoría, marcamos que lo es y devolvemos su información.
    return { esCategoria: true, categoria: categoriaActual };
  }

  // 2. Si no es una categoría, asumimos que es un ID de producto.
  return { esCategoria: false };
}

export default async function PaginaDinamica({ params }) {
  const { slug } = params;
  const { esCategoria, categoria } = await getPageData(slug);

  if (esCategoria) {
    // SI ES UNA CATEGORÍA: Muestra la grilla de productos filtrados.
    const productosRes = await fetch(`${API_URL}/productos`, { cache: 'no-store' });
    const data = await productosRes.json();
    const productosFiltrados = data.productos.filter(p => p.categorias && p.categorias.includes(slug));
    
    return (
      <>
        <div className="text-center p-12 bg-gray-50">
          <h1 className="text-4xl font-bold text-text-main">{categoria.nombre}</h1>
        </div>
        <ProductGrid productos={productosFiltrados} />
      </>
    );
  } else {
    // SI NO ES UNA CATEGORÍA (ES UN PRODUCTO): Muestra la vista de detalle.
    const productoRes = await fetch(`${API_URL}/productos/${slug}`, { cache: 'no-store' });
    
    if (productoRes.ok) {
      const productoActual = await productoRes.json();
      return <ProductoDetalleView producto={productoActual} />;
    } else {
      // Si tampoco lo encuentra como producto, muestra error.
      return (
        <div className="container mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold">Página no encontrada</h1>
          <p className="mt-4">El contenido que buscás no existe o fue movido.</p>
        </div>
      );
    }
  }
}