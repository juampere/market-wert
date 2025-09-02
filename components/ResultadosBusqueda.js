// components/ResultadosBusqueda.js
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';

export default function ResultadosBusqueda() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(true);

  useEffect(() => {
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
      setResultados([]);
      setBuscando(false);
    }
  }, [query]);

  if (buscando) {
    return <p>Buscando resultados...</p>;
  }
  
  if (resultados.length > 0) {
    return <ProductGrid productos={resultados} />;
  }

  return <p>No se encontraron resultados para tu búsqueda.</p>;
}