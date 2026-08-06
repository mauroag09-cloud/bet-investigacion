'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Stamp } from '@/components/ui/Stamp';

export const Newsletter = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/suscriptores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('✅ ¡Registrado con éxito!');
        setNombre('');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al suscribirse. Intenta de nuevo.');
      }
    } catch {
      setStatus('error');
      setMessage('Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-papel border-t border-oro/10">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <Stamp variant="verified" size="lg" rotation={-4}>
            <span className="text-2xl font-fraunces font-bold">✉</span>
          </Stamp>
        </div>

        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold">Recibí las verificaciones</h2>
        <p className="font-inter text-tinta/60 mt-2">Suscribite al newsletter y recibí cada nuevo expediente antes que nadie.</p>

        {status === 'success' ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-green-700 font-inter text-sm">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-3 border border-tinta/20 rounded bg-white text-tinta placeholder:text-tinta/40 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50"
            />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-tinta/20 rounded bg-white text-tinta placeholder:text-tinta/40 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50"
            />
            {status === 'error' && <p className="text-sm text-red-600">{message}</p>}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-[#14213D] text-white font-inter font-medium rounded transition-all hover:bg-[#14213D]/90 disabled:opacity-50"
              style={{ borderRadius: '4px' }}
            >
              {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs font-inter text-tinta/40">
          Al suscribirte aceptás nuestra <Link href="/politica-privacidad" className="underline hover:text-tinta/60 transition-colors">política de privacidad</Link>. Podés darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
};
