'use client';

import Link from 'next/link';
import { Stamp } from '@/components/ui/Stamp';

const platforms = [
  {
    name: 'Joker.top',
    rating: '9.2',
    verified: true,
    findings: ['Licencia Curazao', 'RTP 97.8%', 'Retiros < 2h'],
    promo: '200% hasta $500',
  },
  {
    name: 'BetMaster',
    rating: '8.7',
    verified: true,
    findings: ['Licencia Malta', 'RTP 96.5%', 'Retiros < 4h'],
    promo: null,
  },
  {
    name: 'Royal Casino',
    rating: '6.4',
    verified: false,
    findings: ['Licencia dudosa', 'RTP 89.2%', 'Retiros > 48h'],
    promo: null,
  },
];

export const PlatformGrid = () => {
  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">
          Índice de plataformas analizadas
        </h2>
        <p className="font-inter text-tinta/60 mb-10 max-w-2xl">
          Cada plataforma pasa por nuestro proceso de verificación en 5 etapas. Estas son las conclusiones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Sello */}
              <div className="absolute top-4 right-4">
                <Stamp
                  variant={platform.verified ? 'verified' : 'warning'}
                  size="sm"
                  rotation={-6}
                >
                  <span className="text-[8px] font-ibm-mono tracking-wider">
                    {platform.verified ? 'VERIFICADO' : 'EN REVISIÓN'}
                  </span>
                </Stamp>
              </div>

              {/* Nombre */}
              <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">
                {platform.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">
                {platform.rating}
                <span className="text-sm font-inter font-normal text-tinta/50">/10</span>
              </div>

              {/* Hallazgos */}
              <ul className="mt-4 space-y-1.5 text-sm font-inter text-tinta/70">
                {platform.findings.map((finding, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-oro">•</span>
                    {finding}
                  </li>
                ))}
              </ul>

              {/* Promo (solo Joker.top) */}
              {platform.promo && (
                <div className="mt-4 pt-4 border-t border-oro/10">
                  <span className="inline-block bg-oro/10 text-oro-dark text-xs font-inter font-medium px-3 py-1 rounded">
                    {platform.promo}
                  </span>
                </div>
              )}

              {/* CTA */}
              <Link
                href={`/plataformas/${platform.name.toLowerCase()}`}
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
