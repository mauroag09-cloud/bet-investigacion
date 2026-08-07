'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Stamp } from '@/components/ui/Stamp';

export const PlatformGridFinal = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plataformas?_t=' + Date.now())
      .then(r => r.json())
      .then(d => { setPlatforms(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center text-gray-500">Cargando...</div>;
  if (platforms.length === 0) return <div className="py-16 text-center text-gray-500">No hay plataformas.</div>;

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">Índice de plataformas analizadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p: any) => {
            const link = p['enlace'] || p['link-fuente'];
            return (
              <div key={p.id} className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="absolute top-4 right-4">
                  <Stamp variant={p.estado === 'verificada' ? 'verified' : 'danger'} size="sm" rotation={-6}>
                    <span className="text-[8px] font-ibm-mono tracking-wider">{p.estado === 'verificada' ? 'VERIFICADO' : 'NO RECOMENDADA'}</span>
                  </Stamp>
                </div>
                <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">{p.nombre}</h3>
                <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">{p.rating || '—'}<span className="text-sm font-inter font-normal text-tinta/50">/10</span></div>
                {p.resumen && <p className="mt-3 text-sm font-inter text-tinta/70 line-clamp-2">{p.resumen}</p>}
                {link ? (
                  <Link
                    href={`/api/redirect?url=${encodeURIComponent(link)}`}
                    target="_blank"
                    className="mt-4 inline-block text-sm font-inter font-medium text-blue-600 hover:underline"
                  >
                    Ver expediente completo →
                  </Link>
                ) : (
                  <span className="mt-4 inline-block text-sm text-gray-400">Sin expediente</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
