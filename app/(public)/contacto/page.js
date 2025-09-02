// app/(public)/contacto/page.js
import Link from 'next/link';

export default function ContactoPage() {
  const numeroWhatsApp = '5493446374568'; 
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent('¡Hola! Vengo desde el sitio web y me gustaría hacer una consulta.')}`;

  return (
    <>
      <div className="text-center p-12 bg-gray-50 border-b">
        <h1 className="text-4xl font-bold text-text-main">Contacto</h1>
        <p className="text-xl text-gray-600 mt-4">Estamos para ayudarte. Ponete en contacto con nosotros.</p>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Información */}
          <div className="bg-white p-8 rounded-lg shadow-md border space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Información Directa</h2>
              <p className="text-gray-700"><strong>Teléfono / WhatsApp:</strong> {numeroWhatsApp}</p>
              <p className="text-gray-700"><strong>Email:</strong> info@wert.com.ar</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Ubicación</h2>
              <p className="text-gray-700">La Cantera y Buenos Aires - Gualeguaychú - Entre Ríos</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Horarios</h2>
              <p className="text-gray-700">Lunes a Viernes de 8:00 a 16:00 hs.</p>
            </div>
          </div>

          {/* Columna del Llamado a la Acción (WhatsApp) */}
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-text-main mb-4">¿Tenés una consulta?</h2>
            <p className="text-lg text-gray-600 mb-6">
              La forma más rápida de obtener una respuesta es a través de WhatsApp.
            </p>
            <a 
              href={urlWhatsApp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full py-4 px-8 bg-whatsapp text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Contactar por WhatsApp
            </a>
          </div>

        </div>
      </div>
    </>
  );
}