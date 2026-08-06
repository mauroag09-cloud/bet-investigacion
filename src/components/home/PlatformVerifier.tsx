'use client';

import { useState } from 'react';

// Icono de lupa simple (línea)
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#14213D"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const PlatformVerifier = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/plataformas?search=${encodeURIComponent(search)}`;
    }
  };

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#B08D57] uppercase mb-2">
            VERIFICACIÓN INSTANTÁNEA
          </span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D]">
            ¿Es segura tu plataforma de iGaming?
          </h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">
            Ingresá el nombre de cualquier plataforma de iGaming y te decimos si está verificada, su licencia y el historial de reclamos.
          </p>
        </div>

        {/* Buscador con botón */}
        <div className="max-w-[480px] mx-auto mt-8">
          <form onSubmit={handleSubmit} className="flex">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14213D]">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Ej: Joker.top, BetMaster..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#B08D57] rounded-l bg-[#FAF7F0] text-[#14213D] placeholder:text-[#14213D]/40 font-inter text-sm focus:outline-none focus:border-[#14213D] transition-colors"
                style={{ borderRadius: '4px 0 0 4px' }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#14213D] text-white font-inter font-medium rounded-r hover:bg-[#14213D]/90 transition-colors whitespace-nowrap"
              style={{ borderRadius: '0 4px 4px 0' }}
            >
              Verificar →
            </button>
          </form>
        </div>

        {/* Badges de leyenda */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3F6B4A]" />
            <span className="font-inter text-xs text-[#14213D]/70">Verificada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]" />
            <span className="font-inter text-xs text-[#14213D]/70">En revisión</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9B2226]" />
            <span className="font-inter text-xs text-[#14213D]/70">No recomendada</span>
          </div>
        </div>
      </div>
    </section>
  );
};
