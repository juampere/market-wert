// components/HeaderAdmin.js
"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function HeaderAdmin() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-bold">
          Panel Admin
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-300">Ver Sitio Público</Link>
          {status === 'authenticated' && (
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-600">
              <span>Hola, {session.user.name}</span>
              <button 
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}