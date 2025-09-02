// components/FiltrosProductos.js
"use client";

import { useState, useEffect } from 'react';

// El 'activeFilter' es la categoría activa, y 'setActiveFilter' es la función para cambiarla
export default function FiltrosProductos({ activeFilter, setActiveFilter }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await fetch('/api/categorias');
      if (res.ok) {
        setCategorias(await res.json());
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => setActiveFilter('todos')}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
          activeFilter === 'todos' 
          ? 'bg-primary text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        Todos
      </button>
      {categorias.map(cat => (
        <button
          key={cat._id}
          onClick={() => setActiveFilter(cat.slug)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            activeFilter === cat.slug 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
}