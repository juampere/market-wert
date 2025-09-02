"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RichTextEditor from './RichTextEditor';
import ImageManager from './ImageManager';

// --- Componente principal del formulario ---
export default function FormularioProducto({ productoExistente }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [sku, setSku] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioPromocional, setPrecioPromocional] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [saleType, setSaleType] = useState('quotable');
  const [error, setError] = useState('');
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [imagenesNuevas, setImagenesNuevas] = useState([]);
  const [imagenesExistentes, setImagenesExistentes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('/api/categorias');
        if (res.ok) {
          setCategoriasDisponibles(await res.json());
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (productoExistente) {
      setNombre(productoExistente.nombre || '');
      setSku(productoExistente.sku || '');
      setPrecio(productoExistente.precio || '');
      setPrecioPromocional(productoExistente.precioPromocional || '');
      setDescripcion(productoExistente.descripcion || '');
      setCategoriasSeleccionadas(productoExistente.categorias || []);
      setIsFeatured(productoExistente.isFeatured || false);
      setIsNew(productoExistente.isNew || false);
      setSaleType(productoExistente.isQuotable ? 'quotable' : 'direct');
      setImagenesExistentes(productoExistente.imagenes || []);
    }
  }, [productoExistente]);

  const handleCategoryChange = (slug) => {
    setCategoriasSeleccionadas(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  const handleAddNewCategory = async () => {
    if (nuevaCategoria) {
      const crearSlug = (texto) => texto.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
      const nuevaCat = { nombre: nuevaCategoria, slug: crearSlug(nuevaCategoria) };
      const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCat),
      });
      if (res.ok) {
        const updatedCategorias = await fetch('/api/categorias').then(res => res.json());
        setCategoriasDisponibles(updatedCategorias);
        setNuevaCategoria('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const precioNum = Number(precio);
    const precioPromoNum = Number(precioPromocional);

    if (precioPromoNum && precioPromoNum >= precioNum) {
      setError('El precio promocional debe ser menor que el precio normal.');
      setIsSubmitting(false);
      return;
    }

    try {
      let urlsDeImagenesNuevas = [];
      if (imagenesNuevas.length > 0) {
        const formData = new FormData();
        imagenesNuevas.forEach(img => formData.append('files', img.file));
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('Falló la subida de imágenes');
        const data = await uploadRes.json();
        urlsDeImagenesNuevas = data.urls;
      }

      const productoFinal = {
        nombre, sku, descripcion,
        precio: precioNum,
        precioPromocional: precioPromoNum,
        isFeatured, isNew,
        isQuotable: saleType === 'quotable',
        categorias: categoriasSeleccionadas,
        imagenes: [...imagenesExistentes, ...urlsDeImagenesNuevas],
      };

      let saveRes;
      if (productoExistente) {
        if (sku && sku !== productoExistente.sku) {
          const res = await fetch(`/api/productos/validar-sku/${sku}`);
          const { existe } = await res.json();
          if (existe) {
            setError('Este SKU ya está en uso.');
            setIsSubmitting(false);
            return;
          }
        }
        saveRes = await fetch(`/api/productos/${productoExistente._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productoFinal),
        });
      } else {
        if (sku) {
          const res = await fetch(`/api/productos/validar-sku/${sku}`);
          const { existe } = await res.json();
          if (existe) {
            setError('Este SKU ya está en uso.');
            setIsSubmitting(false);
            return;
          }
        }
        saveRes = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productoFinal),
        });
      }

      if (!saveRes.ok) throw new Error('Falló al guardar el producto');

      // --- ¡NUEVO! Llamada a la revalidación ---
      // Le avisa a Vercel que actualice la caché de la home
      await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`);

      alert(`¡Producto ${productoExistente ? 'actualizado' : 'creado'} con éxito!`);
      router.push('/admin/productos');
      
    } catch (err) {
      alert(`Ocurrió un error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Identificación del Producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input 
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU (Código de Producto)</label>
            <input 
              type="text" 
              id="sku" 
              value={sku} 
              onChange={(e) => setSku(e.target.value)} 
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
            />
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Precios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio Normal ($)</label>
            <input 
              type="number" 
              id="precio" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label htmlFor="precioPromocional" className="block text-sm font-medium text-gray-700">Precio Promocional ($) (Opcional)</label>
            <input 
              type="number" 
              id="precioPromocional" 
              value={precioPromocional} 
              onChange={(e) => setPrecioPromocional(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
            />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Descripción Detallada</h2>
        <RichTextEditor value={descripcion} onChange={setDescripcion} />
      </div>
      
      <ImageManager 
        imagenes={imagenesNuevas} 
        setImagenes={setImagenesNuevas} 
        imagenesExistentes={imagenesExistentes}
        setImagenesExistentes={setImagenesExistentes}
      />
      
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Clasificación</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-start"><div className="flex items-center h-5"><input id="isFeatured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4"/></div><div className="ml-3 text-sm"><label htmlFor="isFeatured">Destacado</label></div></div>
            <div className="flex items-start"><div className="flex items-center h-5"><input id="isNew" type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="h-4 w-4"/></div><div className="ml-3 text-sm"><label htmlFor="isNew">Nuevo</label></div></div>
          </div>
          <div>
            <label className="text-base font-medium">Tipo de Venta</label>
            <fieldset className="mt-2"><div className="flex gap-4">
              <div className="flex items-center"><input id="quotable" name="saleType" type="radio" value="quotable" checked={saleType === 'quotable'} onChange={(e) => setSaleType(e.target.value)} className="h-4 w-4"/><label htmlFor="quotable" className="ml-2">Solo Cotización</label></div>
              <div className="flex items-center"><input id="direct" name="saleType" type="radio" value="direct" checked={saleType === 'direct'} onChange={(e) => setSaleType(e.target.value)} className="h-4 w-4"/><label htmlFor="direct" className="ml-2">Venta Directa</label></div>
            </div></fieldset>
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Categorización</h2>
        <div>
          <label className="text-base font-medium">Categorías Existentes</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {categoriasDisponibles.map((cat) => (
              <div key={cat._id} className="flex items-center">
                <input id={`cat-${cat._id}`} type="checkbox" checked={categoriasSeleccionadas.includes(cat.slug)} onChange={() => handleCategoryChange(cat.slug)} className="h-4 w-4"/>
                <label htmlFor={`cat-${cat._id}`} className="ml-2">{cat.nombre}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="nuevaCategoria" className="text-base font-medium">Agregar Nueva Categoría</label>
          <div className="flex mt-2"><input type="text" id="nuevaCategoria" value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"/><button type="button" onClick={handleAddNewCategory} className="ml-4 px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:opacity-90 transition-opacity">Agregar</button></div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-primary text-white font-bold rounded-md disabled:bg-gray-400">
          {isSubmitting ? 'Guardando...' : (productoExistente ? 'Actualizar Producto' : 'Crear Producto')}
        </button>
      </div>
    </form>
  );
}