// components/ServiciosSection.js
import { servicios } from '@/data/servicios';

export default function ServiciosSection() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Título de la Sección */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-main">¿Por Qué Elegirnos?</h2>
          <p className="text-lg text-gray-600 mt-2">Soluciones integrales para el productor ganadero.</p>
        </div>
        
        {/* Grilla de Tarjetas de Servicio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio) => {
            const Icono = servicio.Icono; // Obtenemos el componente del ícono

            return (
              <div key={servicio.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                {/* Mostramos el ícono si existe */}
                {Icono && (
                  <div className="flex justify-center mb-4">
                    <Icono className="w-16 h-16 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-text-main mb-2">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}