'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Stamp } from '@/components/ui/Stamp';
import { supabase } from '@/lib/supabase';

type Platform = {
  id: string;
  nombre: string;
  slug: string;
  estado: string;
  licencia?: string;
  rating?: number;
  resumen?: string;
  logo_url?: string;
};

export const PlatformGrid = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('plataformas')
          .select('*')
          .order('rating', { ascending: false });

        if (error) throw error;
        setPlatforms(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-papel">
        <div className="container mx-auto px-6 text-center text-gray-500">Cargando plataformas...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-papel">
        <div className="container mx-auto px-6 text-center text-red-500">
          Error: {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-tinta text-white rounded hover:bg-tinta/90"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">
          Índice de plataformas analizadas
        </h2>
        <p className="font-inter text-tinta/60 mb-10 max-w-2xl">
          Cada plataforma pasa por nuestro proceso de verificación en 5 etapas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <Stamp
                  variant={
                    platform.estado === 'verificada'
                      ? 'verified'
                      : platform.estado === 'revision'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                  rotation={-6}
                >
                  <span className="text-[8px] font-ibm-mono tracking-wider">
                    {platform.estado === 'verificada'
                      ? 'VERIFICADO'
                      : platform.estado === 'revision'
                      ? 'EN REVISIÓN'
                      : 'NO RECOMENDADA'}
                  </span>
                </Stamp>
              </div>

              <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">{platform.nombre}</h3>

              <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">
                {platform.rating || '—'}
                <span className="text-sm font-inter font-normal text-tinta/50">/10</span>
              </div>

              {platform.resumen && (
                <p className="mt-3 text-sm font-inter text-tinta/70 line-clamp-2">{platform.resumen}</p>
              )}

              <Link
                href={`/plataformas/${platform.slug}`}
                className="mt-4 inline-block text-sm font-inter font-medium text-tinta hover:text-oro transition-colors"
              >
                Ver expediente completo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
