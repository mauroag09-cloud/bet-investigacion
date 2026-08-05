import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-4">Bet<span className="text-violet-500">Investigación</span></h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Análisis independiente de plataformas de apuestas. Transparencia y confianza desde 2024.</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaYoutube className="w-5 h-5" /></a>
            </div>
          </div>
          <div><h4 className="font-semibold mb-3">Plataformas</h4><ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li><Link href="/plataformas">Ver todas</Link></li><li><Link href="/ranking">Ranking</Link></li></ul></div>
          <div><h4 className="font-semibold mb-3">Recursos</h4><ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li><Link href="/noticias">Noticias</Link></li><li><Link href="/reclamos">Reclamos</Link></li></ul></div>
          <div><h4 className="font-semibold mb-3">Legal</h4><ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li><Link href="/terminos">Términos</Link></li><li><Link href="/privacidad">Privacidad</Link></li></ul></div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} BetInvestigación. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};
