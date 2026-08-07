'use client'

import { useEffect, useState } from 'react'

type Reclamo = {
  id: string
  nombre_plataforma: string
  titulo: string
  descripcion: string
  estado: 'pending' | 'reviewing' | 'resolved'
  fecha: string
  enlace?: string | null
}

const ESTADOS: Record<string, string> = {
  pending: 'Pendiente',
  reviewing: 'En revisión',
  resolved: 'Resuelto',
}

const initialForm = {
  nombre_plataforma: '',
  titulo: '',
  descripcion: '',
  estado: 'pending',
  fecha: '',
  enlace: '',
}

export default function AdminReclamos() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ ...initialForm })

  const fetchReclamos = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reclamos?_t=' + Date.now())
      const data = await res.json()
      setReclamos(data)
    } catch {
      alert('Error al cargar reclamos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReclamos()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre_plataforma.trim() || !form.titulo.trim()) {
      alert('Plataforma y título son obligatorios')
      return
    }
    setSaving(true)
    const payload = {
      ...form,
      enlace: form.enlace.trim() || null,
      fecha: form.fecha || new Date().toISOString().slice(0, 10),
    }
    try {
      const res = editingId
        ? await fetch(`/api/reclamos/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/reclamos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Error al guardar')
        return
      }
      setForm({ ...initialForm })
      setEditingId(null)
      fetchReclamos()
    } catch {
      alert('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  const startEditing = (r: Reclamo) => {
    setEditingId(r.id)
    setForm({
      nombre_plataforma: r.nombre_plataforma,
      titulo: r.titulo,
      descripcion: r.descripcion,
      estado: r.estado,
      fecha: (r.fecha || '').slice(0, 10),
      enlace: r.enlace || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ ...initialForm })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este reclamo?')) return
    try {
      const res = await fetch(`/api/reclamos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (editingId === id) cancelEdit()
        fetchReclamos()
      } else {
        alert('Error al eliminar')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const handleEstadoChange = async (r: Reclamo, estado: string) => {
    try {
      await fetch(`/api/reclamos/${r.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      })
      fetchReclamos()
    } catch {
      alert('Error al cambiar estado')
    }
  }

  const inputCls =
    'w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50'

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 font-inter">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-fraunces text-3xl font-bold mb-1">Panel de reclamos</h1>
        <p className="text-sm text-gray-400 mb-8">
          Administrá la sección &quot;ALERTA — RECLAMOS VERIFICADOS&quot;. Los cambios se guardan en Supabase.
        </p>

        {/* Formulario crear/editar */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 mb-10"
        >
          <h2 className="font-semibold mb-4 text-lg">
            {editingId ? '✏️ Editar reclamo' : '➕ Nuevo reclamo'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Plataforma *</label>
              <input
                name="nombre_plataforma"
                value={form.nombre_plataforma}
                onChange={handleChange}
                placeholder="Ej: Royal Casino"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Título *</label>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ej: Retiro de $500 bloqueado por 15 días"
                className={inputCls}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                placeholder="Detalle del reclamo..."
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange} className={inputCls}>
                <option value="pending">Pendiente</option>
                <option value="reviewing">En revisión</option>
                <option value="resolved">Resuelto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Fecha</label>
              <input
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                Enlace al expediente (opcional)
              </label>
              <input
                name="enlace"
                value={form.enlace}
                onChange={handleChange}
                placeholder="https://..."
                className={inputCls}
              />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-amber-500 text-gray-950 font-medium rounded hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear reclamo'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2 bg-gray-800 text-gray-200 rounded hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Lista de reclamos */}
        <h2 className="font-semibold mb-4 text-lg">
          Reclamos publicados ({reclamos.length})
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Cargando...</div>
        ) : reclamos.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border border-dashed border-gray-700 rounded-xl">
            No hay reclamos todavía. Creá el primero con el formulario de arriba.
          </div>
        ) : (
          <div className="space-y-3">
            {reclamos.map((r) => (
              <div
                key={r.id}
                className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{r.titulo}</span>
                    <span className="text-xs text-gray-400">{r.nombre_plataforma}</span>
                  </div>
                  {r.descripcion && (
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">{r.descripcion}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1 font-ibm-mono">
                    {r.fecha ? r.fecha.slice(0, 10) : '—'}
                    {r.enlace ? ' · con enlace' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={r.estado}
                    onChange={(e) => handleEstadoChange(r, e.target.value)}
                    className="px-2 py-1.5 rounded bg-gray-900 border border-gray-700 text-sm focus:outline-none"
                  >
                    {Object.entries(ESTADOS).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => startEditing(r)}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-gray-200 rounded hover:bg-gray-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-3 py-1.5 text-sm bg-red-900/60 text-red-200 rounded hover:bg-red-800 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
