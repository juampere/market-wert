// app/admin/productos/page.js
"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Paginacion from '@/components/Paginacion';

export default function AdminProductosPage() {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [page, setPage] = useState(1);
  const [categorias, setCategorias] = useState([]);
  
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const limit = 20;

  useEffect(() => {
    // Carga las categorías una sola vez para el menú desplegable
    const fetchCategorias = async () => {
      const res = await fetch('/api/categorias');
      if(res.ok) setCategorias(await res.json());
    }
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const url = `/api/productos?page=${page}&limit=${limit}&category=${filtroCategoria}&search=${terminoBusqueda}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProductos(data.productos);
          setTotalProductos(data.totalProductos);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    
    // timeout para no buscar en cada tecla que se presiona
    const timer = setTimeout(() => {
      // Al buscar, siempre volvemos a la página 1
      if (page !== 1) {
        setPage(1);
      } else {
        fetchProductos();
      }
    }, 500); // Espera 500ms después de que el usuario deja de escribir

    return () => clearTimeout(timer);
  }, [filtroCategoria, terminoBusqueda]); // Se activa al cambiar filtros

  useEffect(() => {
    // Este efecto separado maneja la paginación
    const fetchProductos = async () => {
      try {
        const url = `/api/productos?page=${page}&limit=${limit}&category=${filtroCategoria}&search=${terminoBusqueda}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProductos(data.productos);
          setTotalProductos(data.totalProductos);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, [page]); // Se activa solo al cambiar de página


  const handleDelete = async (productoId) => {
    if (confirm('¿Estás seguro de que querés eliminar este producto?')) {
      try {
        const res = await fetch(`/api/productos/${productoId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('No se pudo eliminar el producto');
        
        // Refrescar la lista de productos
        const updatedProductos = productos.filter(p => p._id !== productoId);
        setProductos(updatedProductos);
        setTotalProductos(prev => prev - 1);
        alert('Producto eliminado con éxito.');
      } catch (error) {
        alert('Error al eliminar el producto.');
      }
    }
  };

  const getFechaFromObjectId = (objectId) => {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString('es-AR');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionar Productos</h1>
        <Link href="/admin/productos/nuevo" className="px-4 py-2 bg-primary text-white font-bold rounded-md hover:bg-primary-dark">
          + Crear Nuevo
        </Link>
      </div>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg flex flex-col md:flex-row gap-4 items-center">
        <input 
          type="text"
          placeholder="Buscar por nombre o SKU..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="todos">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat._id} value={cat.slug}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">SKU</th>
              <th scope="col" className="px-6 py-3">Categorías</th>
              <th scope="col" className="px-6 py-3">Fecha Creación</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto._id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {producto.nombre}
                </th>
                <td className="px-6 py-4">{producto.sku || '-'}</td>
                <td className="px-6 py-4">{producto.categorias?.join(', ') || '-'}</td>
                <td className="px-6 py-4">{getFechaFromObjectId(producto._id)}</td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <Link href={`/admin/productos/editar/${producto._id}`} className="font-medium text-primary hover:underline">Editar</Link>
                  <button onClick={() => handleDelete(producto._id)} className="font-medium text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginacion 
        page={page}
        totalProductos={totalProductos}
        limit={limit}
        setPage={setPage}
      />
    </div>
  );
}