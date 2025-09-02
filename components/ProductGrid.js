// components/ProductGrid.js
import TarjetaDeProducto from '@/components/TarjetaDeProducto';

// Este componente recibirá un título y una lista de productos para mostrar
export default function ProductGrid({ titulo, productos }) {
  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {titulo}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {productos.map(producto => (
          <TarjetaDeProducto key={producto._id} producto={producto} />
        ))}
      </div>
    </section>
  );
}