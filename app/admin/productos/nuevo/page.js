// app/admin/productos/nuevo/page.js
import FormularioProducto from '@/components/FormularioProducto';

export default function NuevoProductoPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Producto</h1>
      <FormularioProducto />
    </div>
  );
}