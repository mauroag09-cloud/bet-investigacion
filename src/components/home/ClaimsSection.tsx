'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stamp } from '@/components/ui/Stamp';

type Claim = {
  id: string;
  nombre_plataforma: string;
  titulo: string;
  descripcion: string;
  estado: 'reviewing' | 'pending' | 'resolved';
  fecha: string;
  enlace?: string | null;
};

const statusConfig = {
  reviewing: { label: 'En revisión', color: '#B08D57', bg: 'bg-[#B08D57]/10' },
  pending: { label: 'Pendiente', color: '#9B2226', bg: 'bg-[#9B2226]/10' },
  resolved: { label: 'Resuelto', color: '#2D6A4F', bg: 'bg-[#2D6A4F]/10' },
} as const;

const formatDate = (fecha: string) => {
  if (!fecha) return '';
  const parts = fecha.slice(0, 10).split('-');
  if (parts.length !== 3) return fecha;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const ClaimsSection = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClaims = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/reclamos?_t=' + Date.now(), {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!res.ok) throw new Error('Error al cargar reclamos');
      const data = await res.json();
      setClaims(data);
    } catch {
      setError('Error al cargar reclamos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <section className="py-16 bg-[#F5F0E6] border-y border-[#B08D57]/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Stamp variant="danger" size="md" rotation={-4}>
              <span className="text-lg font-fraunces font-bold">!</span>
            </Stamp>
          </div>
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#9B2226] uppercase">
            ALERTA — RECLAMOS VERIFICADOS
          </span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D] mt-2">
            ¿Fuiste víctima de una estafa?
          </h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">
            Publicamos reclamos reales de jugadores. Si tuviste un problema con una plataforma, denunciálo acá.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-gray-500 font-inter text-sm">
            Cargando reclamos...
          </div>
        ) : error ? (
          <div className="mt-10 text-center">
            <span className="text-red-500 font-inter text-sm">{error}</span>
            <button
              onClick={fetchClaims}
              className="ml-4 px-4 py-2 bg-[#9B2226] text-white text-sm font-inter rounded hover:bg-[#9B2226]/90 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : claims.length === 0 ? (
          <div className="mt-10 text-center text-gray-500 font-inter text-sm">
            No hay reclamos publicados todavía.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claims.map((claim, idx) => {
              const status = statusConfig[claim.estado] || statusConfig.pending;
              return (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#FAF7F0] border border-[#B08D57]/30 rounded-lg p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="font-ibm-mono text-[10px] tracking-wider uppercase text-[#14213D]/70">
                        {claim.nombre_plataforma}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-ibm-mono px-2 py-0.5 rounded ${status.bg}`}
                      style={{ color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <h3 className="font-fraunces text-lg font-bold text-[#14213D] leading-tight">
                    {claim.titulo}
                  </h3>

                  <p className="mt-2 font-inter text-sm text-[#14213D]/60 line-clamp-2">
                    {claim.descripcion}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-ibm-mono text-[#14213D]/40">
                      {formatDate(claim.fecha)}
                    </span>
                    {claim.enlace ? (
                      <a
                        href={claim.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter font-medium text-[#14213D] hover:text-[#B08D57] transition-colors"
                      >
                        Ver expediente →
                      </a>
                    ) : (
                      <Link
                        href={`/reclamos/${claim.id}`}
                        className="font-inter font-medium text-[#14213D] hover:text-[#B08D57] transition-colors"
                      >
                        Ver expediente →
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/denunciar">
            <button className="px-8 py-3 bg-[#9B2226] text-white font-inter font-medium rounded hover:bg-[#9B2226]/90 transition-colors">
              Denunciar una estafa →
            </button>
          </Link>
          <p className="mt-3 text-xs font-inter text-[#14213D]/40">
            Tu denuncia será revisada por nuestro equipo. Mantenemos el anonimato si así lo solicitás.
          </p>
        </div>
      </div>
    </section>
  );
};
