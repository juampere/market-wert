// app/admin/page.js
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta para ir a crear un nuevo producto */}
        <Link 
          href="/admin/productos/nuevo"
          className="block p-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <h2 className="text-2xl font-bold">Crear Nuevo Producto</h2>
          <p className="mt-2">Agregar un item al catálogo.</p>
        </Link>

        <Link 
          href="/admin/productos"
          className="block p-6 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-2xl font-bold">Gestionar Productos</h2>
          <p className="mt-2">Ver, editar o eliminar todos los productos.</p>
        </Link>

        {/* Placeholder para futuras tarjetas */}
        <div className="p-6 bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-500">Ver Órdenes</h2>
          <p className="mt-2 text-gray-400">(Próximamente)</p>
        </div>
      </div>
    </div>
  );
}