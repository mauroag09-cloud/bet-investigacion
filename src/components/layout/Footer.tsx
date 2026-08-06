import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-tinta text-papel/60 border-t border-papel/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-fraunces text-2xl font-bold text-papel">
              Info<span className="text-oro">Bet</span>
            </Link>
            <p className="text-sm mt-2 max-w-xs">
              Verificamos apuestas para que no tengas que arriesgarte a ciegas.
            </p>
          </div>

          <div>
            <h4 className="font-fraunces text-papel font-bold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terminos" className="hover:text-papel transition-colors">Términos</Link></li>
              <li><Link href="/privacidad" className="hover:text-papel transition-colors">Privacidad</Link></li>
              <li><Link href="/juego-responsable" className="hover:text-papel transition-colors">Juego Responsable</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fraunces text-papel font-bold mb-3">Redes</h4>
            <div className="flex gap-3">
              <a href="#" className="hover:text-papel transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-papel transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-papel transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-papel transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-fraunces text-papel font-bold mb-3">Contacto</h4>
            <p className="text-sm">info@infobet.com</p>
            <p className="text-sm">Córdoba, Argentina</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-papel/10 text-center text-xs">
          &copy; {new Date().getFullYear()} InfoBet — Córdoba, Argentina. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
