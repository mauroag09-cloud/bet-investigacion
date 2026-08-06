'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Promocion = {
  id: string;
  plataforma_id: string;
  título: string;
  valor: string;
  label: string;
  condicion: string;
  estado: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  active: '#3F6B4A',
  expiring: '#B08D57',
  expired: '#A0A0A0',
};

export const PromotionsList = () => {
  const [promotions, setPromotions] = useState<Promocion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
    setLoading(true);
    setError(null);
    const url = '/api/promociones?_t=' + Date.now();
    console.log('🔍 Fetching promociones:', url);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error en la API');
      const data = await res.json();
      console.log('📦 Datos recibidos:', data);
      setPromotions(data);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Error al cargar promociones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-papel border-t border-[#B08D57]/10">
        <div className="container mx-auto px-6 text-center text-gray-500">Cargando promociones...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-papel border-t border-[#B08D57]/10">
        <div className="container mx-auto px-6 text-center text-red-500">
          {error}
          <button
            onClick={fetchPromotions}
            className="ml-4 px-4 py-2 bg-tinta text-white rounded hover:bg-tinta/90"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="py-16 bg-papel border-t border-[#B08D57]/10">
        <div className="container mx-auto px-6 text-center text-gray-500">
          No hay promociones disponibles.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-papel border-t border-[#B08D57]/10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#B08D57] uppercase mb-2">OFERTAS VERIFICADAS</span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D]">Promociones Destacadas</h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">Ofertas verificadas por nuestro equipo.</p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-5 min-w-max md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:min-w-0">
            {promotions.map((promo) => {
              const color = statusColors[promo.estado] || '#A0A0A0';
              return (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group relative w-[200px] md:w-auto flex-shrink-0 bg-[#FAF7F0] border border-[#B08D57] rounded p-4 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200"
                  style={{ borderRadius: '6px' }}
                >
                  <div className="absolute inset-[4px] border-2 border-dashed border-[#B08D57]/30 rounded pointer-events-none" style={{ borderRadius: '4px' }} />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="font-ibm-mono text-[11px] tracking-wider uppercase text-[#14213D]/70">{promo.plataforma_id}</span>
                    </div>
                  </div>
                  <div className="text-center py-2">
                    <span className="font-fraunces text-4xl md:text-5xl font-black text-[#14213D]">{promo.valor}</span>
                    <span className="block font-inter text-[12px] tracking-wider uppercase text-[#14213D]/50 mt-0.5">{promo.label}</span>
                  </div>
                  <div className="w-8 h-px bg-[#B08D57]/40 mx-auto my-3" />
                  <p className="text-center font-ibm-mono text-[11px] text-[#14213D]/60">{promo.condicion}</p>
                  <button className="w-full mt-4 py-2 bg-[#14213D] text-white text-sm font-inter font-medium rounded hover:bg-[#14213D]/90 transition-colors" style={{ borderRadius: '4px' }}>Activar →</button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
