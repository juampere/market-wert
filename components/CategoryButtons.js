// components/CategoryButtons.js
import Link from 'next/link';
import { iconMap } from '@/lib/iconMap';

async function getCategoriasDestacadas() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categorias?filtrar=home`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error al cargar categorías destacadas:", error);
    return [];
  }
}

export default async function CategoryButtons() {
  const categorias = await getCategoriasDestacadas();

  if (!Array.isArray(categorias)) return null;

  return (
    <section className="p-4 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categorias.map((categoria) => {
          const Icono = iconMap[categoria.icono]; 

          return (
            <Link
              key={categoria._id}
              href={`/productos/${categoria.slug}`}
              // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
              className="block p-6 bg-white border border-gray-200 rounded-lg text-center font-bold text-text-main hover:bg-gray-100 hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {Icono && (
                <div className="flex justify-center mb-2">
                  <Icono className="w-16 h-16" />
                </div>
              )}
              {categoria.nombre}
            </Link>
          );
        })}
      </div>
    </section>
  );
}