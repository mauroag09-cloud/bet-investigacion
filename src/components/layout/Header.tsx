'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-oro/20 bg-papel/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-fraunces text-2xl font-bold text-tinta tracking-tight">
          Info<span className="text-oro">Bet</span>
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-inter text-tinta/80">
          <Link href="/reseñas" className="hover:text-tinta transition-colors">Reseñas</Link>
          <Link href="/promociones" className="hover:text-tinta transition-colors">Promociones</Link>
          <Link href="/nosotros" className="hover:text-tinta transition-colors">Nosotros</Link>
          <Link href="/juego-responsable" className="hover:text-tinta transition-colors">Juego Responsable</Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link href="/suscribirse">
            <button className="px-5 py-2 bg-tinta text-white text-sm font-inter font-medium rounded transition-all hover:bg-tinta/90">
              Suscribirme
            </button>
          </Link>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-tinta" /> : <Menu className="w-6 h-6 text-tinta" />}
          </button>
        </div>
      </div>
    </header>
  );
};
