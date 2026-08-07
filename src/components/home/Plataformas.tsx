'use client';

import { useEffect, useState } from 'react';
import { Stamp } from '@/components/ui/Stamp';

export const Plataformas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/plataformas?_t=' + Date.now());
        if (!res.ok) throw new Error('Error al cargar plataformas');
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las plataformas, intentá de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-16 text-center text-gray-500">Cargando plataformas...</div>;
  if (error) return <div className="py-16 text-center text-red-500">{error}</div>;
  if (!data.length) return <div className="py-16 text-center text-gray-500">No hay plataformas disponibles.</div>;

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">Índice de plataformas analizadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((p: any) => (
            <div key={p.id} className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="absolute top-4 right-4">
                <Stamp variant={p.estado === 'verificada' ? 'verified' : 'danger'} size="sm" rotation={-6}>
                  <span className="text-[8px] font-ibm-mono tracking-wider">{p.estado === 'verificada' ? 'VERIFICADO' : 'NO RECOMENDADA'}</span>
                </Stamp>
              </div>
              <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">{p.nombre}</h3>
              <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">{p.rating || '—'}<span className="text-sm font-inter font-normal text-tinta/50">/10</span></div>
              {p.resumen && <p className="mt-3 text-sm font-inter text-tinta/70 line-clamp-2">{p.resumen}</p>}
              {(p['enlace'] || p['link-fuente']) ? (
                <a href={p['enlace'] || p['link-fuente']} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-inter font-medium text-blue-600 hover:underline">Ver expediente completo →</a>
              ) : (
                <span className="mt-4 inline-block text-sm text-gray-400">Sin expediente</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
