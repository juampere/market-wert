// components/ImageManager.js
"use client";

import Image from 'next/image';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImage({ image, index, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative w-24 h-24 group">
      <Image 
        src={URL.createObjectURL(image.file)} 
        alt={`Previsualización ${index}`} 
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-md border bg-gray-100"
      />
      {index === 0 && (
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-br-md rounded-tl-md z-10">
          Principal
        </div>
      )}
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Eliminar imagen"
      >
        &times;
      </button>
    </div>
  );
}

export default function ImageManager({ imagenes, setImagenes, imagenesExistentes, setImagenesExistentes }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setImagenes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteNewImage = (indexToDelete) => {
    setImagenes((prev) => prev.filter((_, index) => index !== indexToDelete));
  };
  
  const handleDeleteExistingImage = (urlToDelete) => {
    setImagenesExistentes((prev) => prev.filter(url => url !== urlToDelete));
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleImageChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const archivos = Array.from(e.target.files).map(file => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file: file,
      }));
      if ((imagenesExistentes?.length || 0) + imagenes.length + archivos.length > 4) {
        alert("Solo se pueden tener hasta 4 imágenes en total.");
        return;
      }
      setImagenes(prev => [...prev, ...archivos]);
      e.target.value = null;
    }
  };

  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">Fotos del Producto</h2>
      
      {imagenesExistentes && imagenesExistentes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes actuales</label>
          <div className="flex flex-wrap gap-4">
            {imagenesExistentes.map((url, index) => (
              <div key={url} className="relative w-24 h-24 group">
                <Image src={url} alt={`Imagen ${index}`} fill style={{ objectFit: 'cover' }} className="rounded-md border"/>
                {index === 0 && imagenes.length === 0 && <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 z-10">Principal</div>}
                <button type="button" onClick={() => handleDeleteExistingImage(url)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 z-10">&times;</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
           onClick={() => document.getElementById('fileInput').click()} // Simula el click en el input oculto
           onDrop={handleDrop} // Agregamos la función para soltar archivos
           onDragOver={handleDragOver}> 
        <input 
          id="fileInput" 
          type="file" 
          multiple 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" // Ocultamos el input real
        />
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="mt-1 text-sm text-gray-600">
          Arrastrá y soltá tus imágenes aquí, o <span className="font-medium text-blue-600">hacé click para seleccionarlas</span>.
        </p>
        <p className="text-xs text-gray-500">Máximo 4 imágenes (JPG, PNG)</p>
      </div>

      {imagenes.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={imagenes.map(img => img.id)} strategy={rectSortingStrategy}>
            <div className="mt-4 flex flex-wrap gap-4 p-4 border rounded-md min-h-[120px]">
              {imagenes.map((img, index) => (
                <SortableImage key={img.id} image={img} index={index} onDelete={handleDeleteNewImage} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}