'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">Bet<span className="text-violet-500">Investigación</span></Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/plataformas" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Plataformas</Link>
          <Link href="/ranking" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ranking</Link>
          <Link href="/noticias" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Noticias</Link>
          <Link href="/reclamos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Reclamos</Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:inline">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={() => { localStorage.clear(); window.location.href='/'; }}><LogOut className="w-4 h-4 mr-2" /> Salir</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost" size="sm" className="hidden md:inline-flex"><User className="w-4 h-4 mr-2" /> Iniciar Sesión</Button></Link>
              <Link href="/register"><Button size="sm" className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white"><LogIn className="w-4 h-4 mr-2" /> Registrarse</Button></Link>
            </>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
    </header>
  );
};
