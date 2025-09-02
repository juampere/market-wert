// app/(public)/buscar/page.js
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';

export default function BusquedaPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); // Obtenemos el término de búsqueda de la URL

  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(true);

  useEffect(() => {
    // Esta función se ejecuta cada vez que el término de búsqueda (query) cambia
    if (query) {
      setBuscando(true);
      const fetchResultados = async () => {
        try {
          const res = await fetch(`/api/productos?search=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResultados(data.productos);
        } catch (error) {
          console.error("Error en la búsqueda:", error);
          setResultados([]);
        } finally {
          setBuscando(false);
        }
      };
      fetchResultados();
    } else {
      setBuscando(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      {query ? (
        <>
          <h1 className="text-3xl font-bold mb-2">
            Resultados para: <span className="text-primary">{query}</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Encontrados {resultados.length} productos.
          </p>

          {buscando ? (
            <p>Buscando...</p>
          ) : resultados.length > 0 ? (
            // Reutilizamos nuestro componente ProductGrid para mostrar los resultados
            <ProductGrid productos={resultados} />
          ) : (
            <p>No se encontraron resultados para tu búsqueda.</p>
          )}
        </>
      ) : (
        <h1 className="text-3xl font-bold mb-2">
          Por favor, ingresá un término de búsqueda.
        </h1>
      )}
    </div>
  );
}