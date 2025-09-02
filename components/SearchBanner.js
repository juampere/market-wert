// components/SearchBanner.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBanner() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (terminoBusqueda.trim() !== '') {
      router.push(`/buscar?q=${encodeURIComponent(terminoBusqueda)}`);
    }
  };

  return (
    <div 
      className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
      style={{ background:'linear-gradient(0deg,rgba(179, 124, 87, 1) 0%, rgba(60, 69, 92, 1) 100%)' }}
    >
      <div className="absolute inset-0"></div>
      
      <div className="relative z-10 w-full max-w-2xl px-4">
       
        <form 
          onSubmit={handleSearch} 
          className="flex flex-col md:flex-row gap-2" // Por defecto es columna, en pantallas medianas es fila
        >
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            placeholder="¿Qué producto estás buscando?"
            className="w-full px-4 py-3 rounded-md border-0 shadow-lg focus:ring-2 focus:ring-blue-500 bg-white"
          />
          
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-primary text-white font-bold rounded-md shadow-lg hover:bg-primary-dark"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}