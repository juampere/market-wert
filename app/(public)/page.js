// app/(public)/page.js
import ProductGrid from '@/components/ProductGrid.js';
import CategoryButtons from '@/components/CategoryButtons.js';
import SearchBanner from '@/components/SearchBanner.js';
import ServiciosSection from '@/components/ServiciosSection.js';
import { getProductos } from '@/lib/data.js'; // <-- Importamos la función directa

export default async function HomePage() {
  // Obtenemos los productos directamente de la base de datos, sin fetch
  const { productos } = await getProductos();

  const productosDestacados = productos.filter(p => p.isFeatured === true).slice(0, 4);
  const productosNuevos = productos.filter(p => p.isNew === true).slice(0, 4);

  return (
    <>
      <SearchBanner />
      <div className="container mx-auto px-4">
        <CategoryButtons />
        <ProductGrid 
          titulo="Destacados" 
          productos={productosDestacados} 
        />
        <ServiciosSection />
        <ProductGrid 
          titulo="Novedades" 
          productos={productosNuevos} 
        />
      </div>
    </>
  );
}