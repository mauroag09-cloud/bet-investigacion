'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stamp } from '@/components/ui/Stamp';

const claims = [
  {
    id: 1,
    platform: 'Royal Casino',
    title: 'Retiro de $500 bloqueado por 15 días',
    status: 'reviewing' as const,
    date: '15/08/2026',
    summary: 'El usuario denuncia que su retiro está en estado "en proceso" desde hace 15 días sin respuesta del soporte.',
  },
  {
    id: 2,
    platform: 'Lucky Spin',
    title: 'Bono de bienvenida no acreditado',
    status: 'pending' as const,
    date: '12/08/2026',
    summary: 'El usuario realizó el depósito mínimo requerido pero el bono del 200% nunca fue acreditado en su cuenta.',
  },
  {
    id: 3,
    platform: 'BetMaster',
    title: 'Cuenta bloqueada sin explicación',
    status: 'resolved' as const,
    date: '10/08/2026',
    summary: 'El usuario fue bloqueado al intentar retirar $200. El casino argumentó "actividad sospechosa" sin pruebas.',
  },
];

const statusConfig = {
  reviewing: { label: 'En revisión', color: '#B08D57', bg: 'bg-[#B08D57]/10' },
  pending: { label: 'Pendiente', color: '#9B2226', bg: 'bg-[#9B2226]/10' },
  resolved: { label: 'Resuelto', color: '#2D6A4F', bg: 'bg-[#2D6A4F]/10' },
} as const;

export const ClaimsSection = () => {
  return (
    <section className="py-16 bg-[#F5F0E6] border-y border-[#B08D57]/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Stamp variant="danger" size="md" rotation={-4}>
              <span className="text-lg font-fraunces font-bold">!</span>
            </Stamp>
          </div>
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#9B2226] uppercase">ALERTA — RECLAMOS VERIFICADOS</span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D] mt-2">¿Fuiste víctima de una estafa?</h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">Publicamos reclamos reales de jugadores. Si tuviste un problema con una plataforma, denunciálo acá.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claims.map((claim, idx) => {
            const status = statusConfig[claim.status];
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
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="font-ibm-mono text-[10px] tracking-wider uppercase text-[#14213D]/70">{claim.platform}</span>
                  </div>
                  <span className={`text-[10px] font-ibm-mono px-2 py-0.5 rounded ${status.bg}`} style={{ color: status.color }}>{status.label}</span>
                </div>
                <h3 className="font-fraunces text-lg font-bold text-[#14213D] leading-tight">{claim.title}</h3>
                <p className="mt-2 font-inter text-sm text-[#14213D]/60 line-clamp-2">{claim.summary}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-ibm-mono text-[#14213D]/40">{claim.date}</span>
                  <Link href={`/reclamos/${claim.id}`} className="font-inter font-medium text-[#14213D] hover:text-[#B08D57] transition-colors">Ver expediente →</Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/denunciar">
            <button className="px-8 py-3 bg-[#9B2226] text-white font-inter font-medium rounded hover:bg-[#9B2226]/90 transition-colors">Denunciar una estafa →</button>
          </Link>
          <p className="mt-3 text-xs font-inter text-[#14213D]/40">Tu denuncia será revisada por nuestro equipo. Mantenemos el anonimato si así lo solicitás.</p>
        </div>
      </div>
    </section>
  );
};
