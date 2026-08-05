'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('¡Te has suscrito correctamente!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Error al suscribirse. Intenta de nuevo.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <Mail className="w-6 h-6 text-white" />
        <h3 className="text-xl font-bold text-white">Newsletter</h3>
      </div>

      <p className="text-sm text-blue-100 mb-4">
        Recibe las últimas noticias, análisis y promociones directamente en tu correo.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2 text-white bg-white/20 rounded-lg p-3">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {status === 'error' && (
            <p className="text-sm text-red-300">{message}</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
          </button>
          <p className="text-xs text-blue-200 text-center">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      )}
    </div>
  );
};
