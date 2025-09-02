// app/(public)/buscar/page.js
import { Suspense } from 'react';
import ResultadosBusqueda from '@/components/ResultadosBusqueda';

// Pequeño componente para obtener el query en el servidor y pasarlo al título
function TituloBusqueda({ query }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">
        Resultados para: <span className="text-primary">{query}</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Buscando productos que coincidan con tu consulta...
      </p>
    </>
  )
}

export default function BusquedaPage({ searchParams }) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto p-4 md:p-8">
      {query ? (
        <>
          <TituloBusqueda query={query} />
          <Suspense fallback={<p>Cargando resultados...</p>}>
            <ResultadosBusqueda />
          </Suspense>
        </>
      ) : (
        <h1 className="text-3xl font-bold mb-2">
          Por favor, ingresá un término de búsqueda.
        </h1>
      )}
    </div>
  );
}