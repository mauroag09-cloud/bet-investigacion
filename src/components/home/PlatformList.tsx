'use client';

import { useEffect, useState } from 'react';
import { Stamp } from '@/components/ui/Stamp';

type Platform = {
  id: string;
  nombre: string;
  slug: string;
  estado: string;
  licencia?: string;
  rating?: number;
  resumen?: string;
  logo_url?: string;
  'link-fuente'?: string;
};

export const PlatformList = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlatforms = async () => {
    try {
      const res = await fetch('/api/plataformas?_t=' + Date.now());
      const data = await res.json();
      setPlatforms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleOpenLink = (url: string) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert('El enlace no es válido o no está disponible.');
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-gray-500">Cargando...</div>;
  }

  if (platforms.length === 0) {
    return <div className="py-16 text-center text-gray-500">No hay plataformas.</div>;
  }

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">
          Índice de plataformas analizadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const link = platform['link-fuente'];
            const hasValidLink = link && (link.startsWith('http://') || link.startsWith('https://'));

            return (
              <div key={platform.id} className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="absolute top-4 right-4">
                  <Stamp variant={platform.estado === 'verificada' ? 'verified' : platform.estado === 'revision' ? 'warning' : 'danger'} size="sm" rotation={-6}>
                    <span className="text-[8px] font-ibm-mono tracking-wider">
                      {platform.estado === 'verificada' ? 'VERIFICADO' : platform.estado === 'revision' ? 'EN REVISIÓN' : 'NO RECOMENDADA'}
                    </span>
                  </Stamp>
                </div>
                <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">{platform.nombre}</h3>
                <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">{platform.rating || '—'}<span className="text-sm font-inter font-normal text-tinta/50">/10</span></div>
                {platform.resumen && <p className="mt-3 text-sm font-inter text-tinta/70 line-clamp-2">{platform.resumen}</p>}
                {hasValidLink ? (
                  <button
                    onClick={() => handleOpenLink(link)}
                    className="mt-4 inline-block text-sm font-inter font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Ver expediente completo →
                  </button>
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
