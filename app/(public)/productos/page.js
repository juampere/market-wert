// app/(public)/productos/page.js
"use client";

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid.js';
import FiltrosProductos from '@/components/FiltrosProductos.js';
import Paginacion from '@/components/Paginacion';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [page, setPage] = useState(1);
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const limit = 9; // Cantidad de productos por página

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`/api/productos?page=${page}&limit=${limit}&category=${filtroActivo}`);
        if (res.ok) {
          const data = await res.json();
          setProductos(data.productos); // Extraemos la lista de productos del objeto
          setTotalProductos(data.totalProductos);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, [page, filtroActivo]); // Se ejecuta cada vez que cambia la página o el filtro

  return (
    <>
      <div className="text-center p-12 bg-gray-50 border-b">
        <h1 className="text-4xl font-bold text-text-main">Nuestro Catálogo</h1>
        <p className="text-xl text-gray-600 mt-4">Explorá todas nuestras soluciones para el campo</p>
      </div>
      <div className="container mx-auto px-4 py-8">
        <FiltrosProductos activeFilter={filtroActivo} setActiveFilter={setFiltroActivo} />
        <ProductGrid productos={productos} />
        <Paginacion 
          page={page}
          totalProductos={totalProductos}
          limit={limit}
          setPage={setPage}
        />
      </div>
    </>
  );
}