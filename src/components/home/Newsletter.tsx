'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Stamp } from '@/components/ui/Stamp';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-16 bg-papel border-t border-oro/10">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <Stamp variant="verified" size="lg" rotation={-4}>
            <span className="text-2xl font-fraunces font-bold">✉</span>
          </Stamp>
        </div>

        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold">
          Recibí las verificaciones
        </h2>
        <p className="font-inter text-tinta/60 mt-2">
          Suscribite al newsletter y recibí cada nuevo expediente antes que nadie.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-green-700 font-inter text-sm">
            ¡Gracias por suscribirte! Revisá tu correo para confirmar.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-tinta/20 rounded bg-white text-tinta placeholder:text-tinta/40 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-tinta text-white font-inter font-medium rounded transition-all hover:bg-tinta/90 disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs font-inter text-tinta/40">
          Al suscribirte aceptás nuestra{' '}
          <Link href="/privacidad" className="underline hover:text-tinta/60 transition-colors">
            política de privacidad
          </Link>
          . Podés darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
};
