// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Copyright */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <p className="text-gray-300">
            &copy; {currentYear} Wert Market - Todos los derechos reservados.
          </p>
        </div>

        {/* Enlaces Legales */}
        <div className="flex space-x-4">
          <Link href="/terminos" className="text-gray-300 hover:text-white transition-colors">
            Términos y Condiciones
          </Link>
          <Link href="/privacidad" className="text-gray-300 hover:text-white transition-colors">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}