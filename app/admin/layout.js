
import HeaderAdmin from '@/components/HeaderAdmin';

export default function AdminLayout({ children }) {
  return (
    <div>
      <HeaderAdmin />
      {/* Aquí se renderizará el contenido de cada página del admin */}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}