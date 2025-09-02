// components/Paginacion.js
"use client";

export default function Paginacion({ page, totalProductos, limit, setPage }) {
  const totalPaginas = Math.ceil(totalProductos / limit);

  if (totalPaginas <= 1) return null; // No muestra nada si solo hay una página

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button 
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-orange-200 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-gray-700">
        Página {page} de {totalPaginas}
      </span>

      <button 
        onClick={() => setPage(page + 1)}
        disabled={page === totalPaginas}
        className="px-4 py-2 bg-orange-200 rounded-md disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}