import ProductGrid from '@/components/ProductGrid.js';
import CategoryButtons from '@/components/CategoryButtons.js';
import SearchBanner from '@/components/SearchBanner.js';
import ServiciosSection from '@/components/ServiciosSection.js'; // Importamos la sección

async function getProductos() {
  const res = await fetch('http://localhost:3000/api/productos', { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Falló la carga de productos');
  }
  const data = await res.json();
  return data.productos;
}

export default async function HomePage() {
  const productos = await getProductos();
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