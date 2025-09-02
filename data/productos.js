// data/productos.js
export const productos = [
  {
    id: 'manga-corral-recta-5m',
    nombre: 'Manga y Corral Recta de 5 metros',
    precio: 1500000,
    imagenes: ['https://placehold.co/600x400/E8D8C4/4D4D4D.png?text=Manga+y+Corral'],
    isQuotable: true,
    // --- Nuevos Campos ---
    categoria: 'carpinteria',
    isFeatured: true, // Para mostrar en "Destacados"
    isNew: true,      // Para mostrar en "Novedades"
  },
  {
    id: 'comedero-batea-3m',
    nombre: 'Comedero Batea de 3 metros',
    precio: 250000,
    imagenes: ['https://placehold.co/600x400/E8D8C4/4D4D4D.png?text=Comedero'],
    isQuotable: true,
    // --- Nuevos Campos ---
    categoria: 'carpinteria',
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'guantes-trabajo-cuero',
    nombre: 'Guantes de Trabajo Reforzados',
    precio: 15000,
    imagenes: ['https://placehold.co/600x400/E8D8C4/4D4D4D.png?text=Guantes'],
    isQuotable: false,
    // --- Nuevos Campos ---
    categoria: 'insumos',
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'tranquera-madera-dura',
    nombre: 'Tranquera de Madera Dura 3m',
    precio: 180000,
    imagenes: ['https://placehold.co/600x400/E8D8C4/4D4D4D.png?text=Tranquera'],
    isQuotable: true,
    // --- Nuevos Campos ---
    categoria: 'tecnologia',
    isFeatured: true,
    isNew: false,
  }
];