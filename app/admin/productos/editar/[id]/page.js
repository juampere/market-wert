// app/admin/productos/editar/[id]/page.js
import FormularioProducto from '@/components/FormularioProducto';

async function getProducto(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/productos/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function EditarProductoPage({ params }) {
  const { id } = params;
  const producto = await getProducto(id);

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Editar Producto</h1>
      <FormularioProducto productoExistente={producto} />
    </div>
  );
}