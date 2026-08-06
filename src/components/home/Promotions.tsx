'use client';
import { Container } from "@/components/ui/Container";

import { motion } from 'framer-motion';

const promotions = [
  { id: 1, platform: 'Joker.top', status: 'active' as const, value: '200%', label: 'DE BONO', condition: 'Válido 48hs' },
  { id: 2, platform: 'BetMaster', status: 'active' as const, value: '100%', label: 'HASTA $500', condition: 'Depósito mínimo $50' },
  { id: 3, platform: 'Royal Casino', status: 'expiring' as const, value: '150%', label: 'DE BONO', condition: 'Vence en 12hs' },
  { id: 4, platform: 'Lucky Spin', status: 'expired' as const, value: '50', label: 'FREE SPINS', condition: 'Agotado' },
  { id: 5, platform: 'Golden Tiger', status: 'active' as const, value: '300%', label: 'DE BONO', condition: 'Hasta $1000' },
];

const statusColors = {
  active: '#3F6B4A',
  expiring: '#B08D57',
  expired: '#A0A0A0',
} as const;

export const Promotions = () => {
  return (
    <section className="py-16 bg-papel border-t border-[#B08D57]/10">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#B08D57] uppercase mb-2">OFERTAS VERIFICADAS</span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D]">Promociones Destacadas</h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">Ofertas verificadas por nuestro equipo. Solo promociones con condiciones claras y justas.</p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-5 min-w-max md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:min-w-0">
            {promotions.map((promo) => {
              const color = statusColors[promo.status];
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
                      <span className="font-ibm-mono text-[11px] tracking-wider uppercase text-[#14213D]/70">{promo.platform}</span>
                    </div>
                  </div>
                  <div className="text-center py-2">
                    <span className="font-fraunces text-4xl md:text-5xl font-black text-[#14213D]">{promo.value}</span>
                    <span className="block font-inter text-[12px] tracking-wider uppercase text-[#14213D]/50 mt-0.5">{promo.label}</span>
                  </div>
                  <div className="w-8 h-px bg-[#B08D57]/40 mx-auto my-3" />
                  <p className="text-center font-ibm-mono text-[11px] text-[#14213D]/60">{promo.condition}</p>
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
