'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Stamp } from '@/components/ui/Stamp';
import { supabase } from '@/lib/supabase';
import { X, Upload, CheckCircle2, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

type Claim = {
  id: string;
  nombre_plataforma: string;
  titulo: string;
  descripcion: string;
  estado: 'reviewing' | 'pending' | 'resolved';
  fecha: string;
  enlace?: string | null;
  pruebas?: { nombre: string; url: string; tipo: string }[] | null;
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

const MAX_FILES = 5;
const MAX_SIZE_MB = 10;

export const ClaimsSection = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado del modal de denuncia
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', plataforma: '', descripcion: '' });
  const [archivos, setArchivos] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [denunciaOk, setDenunciaOk] = useState(false);
  const [denunciaError, setDenunciaError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const openModal = () => {
    setForm({ nombre: '', email: '', plataforma: '', descripcion: '' });
    setArchivos([]);
    setDenunciaOk(false);
    setDenunciaError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    if (!enviando) setModalOpen(false);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const nuevos = Array.from(files).slice(0, MAX_FILES);
    for (const f of nuevos) {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setDenunciaError(`El archivo "${f.name}" supera los ${MAX_SIZE_MB}MB`);
        return;
      }
    }
    setArchivos((prev) => [...prev, ...nuevos].slice(0, MAX_FILES));
    setDenunciaError('');
  };

  const removeFile = (index: number) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitDenuncia = async (e: React.FormEvent) => {
    e.preventDefault();
    setDenunciaError('');

    if (!form.nombre.trim() || !form.email.trim() || !form.plataforma.trim() || !form.descripcion.trim()) {
      setDenunciaError('Completá nombre, email, plataforma y descripción');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setDenunciaError('El email no es válido');
      return;
    }

    setEnviando(true);
    try {
      // 1) Subir adjuntos a Supabase Storage
      const pruebas: { nombre: string; url: string; tipo: string }[] = [];
      for (const file of archivos) {
        const nombreUnico = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const { error: upErr } = await supabase.storage.from('denuncias').upload(nombreUnico, file, {
          cacheControl: '3600',
          upsert: false,
        });
        if (upErr) throw new Error(`No se pudo subir "${file.name}"`);
        const { data: pub } = supabase.storage.from('denuncias').getPublicUrl(nombreUnico);
        pruebas.push({ nombre: file.name, url: pub.publicUrl, tipo: file.type || 'archivo' });
      }

      // 2) Guardar la denuncia en Supabase (tabla reclamos, estado pendiente)
      const res = await fetch('/api/reclamos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_plataforma: form.plataforma.trim(),
          titulo: `Denuncia: ${form.plataforma.trim()}`,
          descripcion: form.descripcion.trim(),
          estado: 'pending',
          nombre_usuario: form.nombre.trim(),
          email: form.email.trim(),
          pruebas,
          // Ocultas por defecto: el equipo las aprueba desde el panel admin
          visible: false,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al enviar la denuncia');
      }

      setDenunciaOk(true);
      fetchClaims();
    } catch (err: any) {
      setDenunciaError(err.message || 'Error de conexión. Intentá de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

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
                        Confirmar fuente →
                      </a>
                    ) : (
                      <span className="font-inter text-[#14213D]/30 cursor-default">
                        Sin expediente
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={openModal}
            className="px-8 py-3 bg-[#9B2226] text-white font-inter font-medium rounded hover:bg-[#9B2226]/90 transition-colors"
          >
            Denunciar una estafa →
          </button>
          <p className="mt-3 text-xs font-inter text-[#14213D]/40">
            Tu denuncia será revisada por nuestro equipo. Mantenemos el anonimato si así lo solicitás.
          </p>
        </div>
      </div>

      {/* ===== MODAL DE DENUNCIA ===== */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF7F0] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-[#B08D57]/20">
                <h3 className="font-fraunces text-2xl font-bold text-[#14213D]">
                  Denunciar una estafa
                </h3>
                <button
                  onClick={closeModal}
                  className="text-[#14213D]/50 hover:text-[#9B2226] transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {denunciaOk ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
                  <h4 className="font-fraunces text-xl font-bold text-[#14213D] mb-2">
                    ¡Denuncia enviada!
                  </h4>
                  <p className="font-inter text-sm text-[#14213D]/60 mb-6">
                    Nuestro equipo la va a revisar. Te contactaremos si necesitamos más información.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 bg-[#9B2226] text-white font-inter font-medium rounded hover:bg-[#9B2226]/90 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDenuncia} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-inter font-medium text-[#14213D]/70 mb-1">
                        Nombre y apellido *
                      </label>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Ej: Juan Pérez"
                        className="w-full px-3 py-2 border border-[#14213D]/20 rounded bg-white text-sm font-inter text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#9B2226]/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-inter font-medium text-[#14213D]/70 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full px-3 py-2 border border-[#14213D]/20 rounded bg-white text-sm font-inter text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#9B2226]/40"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-[#14213D]/70 mb-1">
                      Plataforma denunciada *
                    </label>
                    <input
                      type="text"
                      value={form.plataforma}
                      onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
                      placeholder="Ej: Royal Casino"
                      className="w-full px-3 py-2 border border-[#14213D]/20 rounded bg-white text-sm font-inter text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#9B2226]/40"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-[#14213D]/70 mb-1">
                      Contanos qué pasó *
                    </label>
                    <textarea
                      value={form.descripcion}
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                      rows={3}
                      placeholder="Describí el problema con la mayor precisión posible..."
                      className="w-full px-3 py-2 border border-[#14213D]/20 rounded bg-white text-sm font-inter text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#9B2226]/40 resize-y"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-[#14213D]/70 mb-1">
                      Adjuntá pruebas (fotos o documentos) — opcional
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFiles(e.target.files)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-[#14213D]/25 rounded-lg p-4 flex items-center justify-center gap-2 text-sm font-inter text-[#14213D]/60 hover:border-[#9B2226]/50 hover:text-[#9B2226] transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      Hacé clic para adjuntar archivos
                    </button>
                    <p className="mt-1 text-[11px] font-inter text-[#14213D]/40">
                      Máximo {MAX_FILES} archivos, hasta {MAX_SIZE_MB}MB cada uno (imágenes, PDF, DOC).
                    </p>

                    {archivos.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {archivos.map((file, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between bg-white border border-[#14213D]/15 rounded px-3 py-2 text-xs font-inter text-[#14213D]/80"
                          >
                            <span className="flex items-center gap-2 truncate">
                              {file.type.startsWith('image/') ? (
                                <ImageIcon className="w-4 h-4 text-[#9B2226]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#9B2226]" />
                              )}
                              <span className="truncate">{file.name}</span>
                              <span className="text-[#14213D]/40">
                                ({(file.size / 1024 / 1024).toFixed(1)}MB)
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-[#14213D]/40 hover:text-[#9B2226] transition-colors ml-2"
                              aria-label="Quitar archivo"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {denunciaError && (
                    <p className="text-sm text-red-600 font-inter">{denunciaError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full py-3 bg-[#9B2226] text-white font-inter font-medium rounded hover:bg-[#9B2226]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {enviando ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando denuncia...
                      </>
                    ) : (
                      'Enviar denuncia'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
