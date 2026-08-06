'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const PlatformVerifier = () => {
  const [search, setSearch] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  const [solicitudNombre, setSolicitudNombre] = useState('');
  const [solicitudEmail, setSolicitudEmail] = useState('');
  const [solicitudDescripcion, setSolicitudDescripcion] = useState('');
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [solicitudError, setSolicitudError] = useState('');
  const [solicitudExito, setSolicitudExito] = useState('');

  useEffect(() => {
    if (resultado?.encontrado === false) {
      setSolicitudNombre(search);
    }
  }, [resultado, search]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setCargando(true);
    setResultado(null);
    setSolicitudEnviada(false);
    setSolicitudError('');
    setSolicitudExito('');

    try {
      const res = await fetch(`/api/plataformas/buscar?termino=${encodeURIComponent(search)}`);
      const data = await res.json();
      setResultado(data);
    } catch {
      setResultado({ encontrado: false, termino: search });
    } finally {
      setCargando(false);
    }
  };

  const handleSolicitud = async (e: React.FormEvent) => {
    e.preventDefault();
    setSolicitudError('');
    setSolicitudExito('');

    if (!solicitudNombre || !solicitudEmail || !solicitudDescripcion) {
      setSolicitudError('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('/api/solicitudes-verificacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_plataforma: solicitudNombre,
          email: solicitudEmail,
          descripcion: solicitudDescripcion,
        }),
      });

      if (res.ok) {
        setSolicitudEnviada(true);
        setSolicitudExito('✅ ¡Gracias por confiar! Nos pondremos en contacto para ayudarte.');
        setSolicitudNombre('');
        setSolicitudEmail('');
        setSolicitudDescripcion('');
      } else {
        const error = await res.json();
        setSolicitudError(error.error || 'Error al enviar la solicitud');
      }
    } catch {
      setSolicitudError('Error de conexión. Intenta de nuevo.');
    }
  };

  // Resultados encontrados
  if (resultado?.encontrado && resultado.data) {
    return (
      <section className="py-16 bg-papel">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-fraunces text-2xl font-bold text-tinta mb-4">Resultados para "{search}"</h3>
            <div className="space-y-4">
              {resultado.data.map((p: any) => (
                <div key={p.id} className="bg-papel-light border border-oro/20 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <span className="font-fraunces font-bold text-tinta">{p.nombre}</span>
                    <span className={`ml-3 text-xs font-ibm-mono px-2 py-0.5 rounded ${p.estado === 'verificada' ? 'bg-green-100 text-green-700' : p.estado === 'revision' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {p.estado === 'verificada' ? 'Verificada' : p.estado === 'revision' ? 'En revisión' : 'No recomendada'}
                    </span>
                    {p.licencia && <span className="ml-3 text-sm text-tinta/50">Licencia: {p.licencia}</span>}
                    {p.rating && <span className="ml-3 text-sm font-ibm-mono text-tinta/70">{p.rating}/10</span>}
                  </div>
                  <button className="px-4 py-1.5 bg-[#14213D] text-white text-sm font-inter rounded hover:bg-[#14213D]/90 transition-colors">Ver expediente</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Estado "no encontrado" - mostrar formulario de solicitud con botón "Volver al inicio"
  if (resultado?.encontrado === false) {
    return (
      <section className="py-16 bg-papel">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-[#FAF7F0] border border-oro/30 rounded-lg p-8 shadow-sm">
            <Link href="/" className="inline-block mb-4 text-sm font-inter text-tinta/60 hover:text-tinta transition-colors">
              ← Volver al inicio
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />
              <span className="font-ibm-mono text-sm text-tinta/60">Todavía no analizamos esta plataforma</span>
            </div>
            <h3 className="font-fraunces text-2xl font-bold text-tinta mb-2">Solicitá que la verifiquemos</h3>
            <p className="font-inter text-tinta/60 mb-6">Completá el formulario y te avisaremos cuando tengamos el expediente listo.</p>

            {solicitudEnviada ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700 font-inter text-sm">
                {solicitudExito}
              </div>
            ) : (
              <form onSubmit={handleSolicitud} className="space-y-4">
                <div>
                  <label className="block text-sm font-inter text-tinta/70 mb-1">Nombre de la plataforma</label>
                  <input
                    type="text"
                    value={solicitudNombre}
                    onChange={(e) => setSolicitudNombre(e.target.value)}
                    className="w-full px-4 py-2 border border-tinta/20 rounded bg-white text-tinta font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50"
                    placeholder="Ej: Joker.top"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-tinta/70 mb-1">Tu email</label>
                  <input
                    type="email"
                    value={solicitudEmail}
                    onChange={(e) => setSolicitudEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-tinta/20 rounded bg-white text-tinta font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-tinta/70 mb-1">¿Por qué deberíamos analizarla?</label>
                  <textarea
                    value={solicitudDescripcion}
                    onChange={(e) => setSolicitudDescripcion(e.target.value)}
                    className="w-full px-4 py-2 border border-tinta/20 rounded bg-white text-tinta font-inter text-sm focus:outline-none focus:ring-2 focus:ring-oro/50 resize-y min-h-[100px]"
                    placeholder="Contanos qué te gustaría que revisemos..."
                    required
                  />
                </div>
                {solicitudError && <p className="text-sm text-red-600">{solicitudError}</p>}
                <button type="submit" className="px-6 py-3 bg-[#14213D] text-white font-inter font-medium rounded hover:bg-[#14213D]/90 transition-colors" style={{ borderRadius: '4px' }}>Enviar solicitud</button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Vista inicial (buscador)
  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="block font-ibm-mono text-xs tracking-[0.2em] text-[#B08D57] uppercase mb-2">VERIFICACIÓN INSTANTÁNEA</span>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#14213D]">¿Confi00e1s en tu casa de apuestas?</h2>
          <p className="mt-2 font-inter text-sm text-[#14213D]/60 max-w-md mx-auto">Ingresá el nombre de cualquier plataforma de iGaming y te decimos si está verificada, su licencia y el historial de reclamos.</p>
        </div>

        <div className="max-w-[480px] mx-auto mt-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14213D]"><SearchIcon /></div>
              <input type="text" placeholder="Ej: Joker.top, BetMaster..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-[#B08D57] rounded-l bg-[#FAF7F0] text-[#14213D] placeholder:text-[#14213D]/40 font-inter text-sm focus:outline-none focus:border-[#14213D] transition-colors" style={{ borderRadius: '4px 0 0 4px' }} />
            </div>
            <button type="submit" disabled={cargando} className="px-6 py-3 bg-[#14213D] text-white font-inter font-medium rounded-r hover:bg-[#14213D]/90 transition-colors whitespace-nowrap disabled:opacity-50" style={{ borderRadius: '0 4px 4px 0' }}>{cargando ? '...' : 'Verificar →'}</button>
          </form>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#3F6B4A]" /><span className="font-inter text-xs text-[#14213D]/70">Verificada</span></div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]" /><span className="font-inter text-xs text-[#14213D]/70">En revisión</span></div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#9B2226]" /><span className="font-inter text-xs text-[#14213D]/70">No recomendada</span></div>
        </div>
      </div>
    </section>
  );
};
