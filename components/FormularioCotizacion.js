// components/FormularioCotizacion.js
"use client";

import { useState } from 'react';

export default function FormularioCotizacion({ productoNombre, onClose }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const numeroCliente = '5493446374568'; // Número de teléfono real
    const mensajeWA = `¡Hola! Quisiera cotizar el producto *${productoNombre}*. Mi nombre es: ${nombre}.${email ? ` Mi email es: ${email}.` : ''}${mensaje ? ` Mensaje: ${mensaje}` : ''}`;
    const urlWhatsApp = `https://wa.me/${numeroCliente}?text=${encodeURIComponent(mensajeWA)}`;
    window.open(urlWhatsApp, '_blank');
    onClose();
  };

  return (
    <div className="mt-8 border-t-2 border-gray-200 pt-8">
      <h3 className="text-2xl font-bold mb-4">
        Solicitar cotización para: {productoNombre}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre y Apellido</label>
            <input
              type="text" id="nombre" name="nombre" required value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico (Opcional)</label>
            <input
              type="email" id="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje (Opcional)</label>
          <textarea
            id="mensaje" name="mensaje" rows="4" value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancelar
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-whatsapp text-white font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.15-.38-.25z"/>
            </svg>
            Enviar por WhatsApp
          </button>
        </div>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Si no usás WhatsApp, podés comunicarte al <a href="tel:+5493446374568" className="text-primary hover:underline font-semibold">3446-374568</a> o escribirnos a <a href="mailto:info@wert.com.ar" className="text-primary hover:underline font-semibold">info@wert.com.ar</a>.</p>
      </div>
    </div>
  );
}