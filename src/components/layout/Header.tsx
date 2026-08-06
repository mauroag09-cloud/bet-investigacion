'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/90 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img 
            src="https://img.infobetonline.com/logo.png" 
            alt="Infobet" 
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
            Home
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-gold-400 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/sobre-nosotros" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
            Quiénes somos
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-gold-400 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/juego-responsable" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
            Juego Responsable
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-gold-400 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/#newsletter">
            <button className="group relative px-5 py-2 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 gold-glow">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-gold-600 group-hover:from-blue-700 group-hover:via-blue-800 group-hover:to-gold-700 transition-all duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" /> Suscribirme
              </span>
            </button>
          </Link>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
