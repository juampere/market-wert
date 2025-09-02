// components/Header.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-white text-text-main shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Izquierda (Solo en Móvil): Botón de Hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {/* Centro (Móvil) / Izquierda (Escritorio): Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        
        <div className="flex items-center">
          <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-semibold text-gray-600 hover:text-primary transition-colors">
                  Inicio
              </Link>
              <Link href="/productos" className="font-semibold text-gray-600 hover:text-primary transition-colors">
                  Productos
              </Link>
              <Link href="/contacto" className="font-semibold text-gray-600 hover:text-primary transition-colors">
                  Contacto
              </Link>
          </nav>
          {/* Placeholder para el Carrito (solo en móvil) */}
          <div className="md:hidden">
              <div className="w-6 h-6"></div> {/* Espacio vacío para balancear y centrar el logo */}
          </div>
        </div>
      </div>
      
      {/* Menú Desplegable para Móvil */}
      <div className={`md:hidden ${menuAbierto ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col items-center space-y-4 py-4 border-t">
            <Link href="/" onClick={() => setMenuAbierto(false)} className="text-gray-600 hover:text-primary">Inicio</Link>
            <Link href="/productos" onClick={() => setMenuAbierto(false)} className="text-gray-600 hover:text-primary">Productos</Link>
            <Link href="/contacto" onClick={() => setMenuAbierto(false)} className="text-gray-600 hover:text-primary">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}