'use client'

import { useEffect, useState } from 'react'

type Promocion = {
  id: string
  platform: string
  plataforma_id: string
  titulo: string
  valor: string
  label: string
  condicion: string
  estado: string
}

type Plataforma = {
  id: string
  nombre: string
}

export default function AdminPromociones() {
  const [promociones, setPromociones] = useState<Promocion[]>([])
  const [plataformas, setPlataformas] = useState<Plataforma[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlatformId, setEditingPlatformId] = useState<string | null>(null)
  const [editPlatformName, setEditPlatformName] = useState('')

  const [form, setForm] = useState({
    plataforma_id: '',
    titulo: '',
    valor: '',
    label: '',
    condicion: '',
    estado: 'active',
  })

  const fetchPromociones = async () => {
    const res = await fetch('/api/promociones-v2?_t=' + Date.now())
    const data = await res.json()
    setPromociones(data)
    setLoading(false)
  }

  const fetchPlataformas = async () => {
    const res = await fetch('/api/plataformas/list')
    const data = await res.json()
    setPlataformas(data)
  }

  useEffect(() => {
    fetchPromociones()
    fetchPlataformas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.plataforma_id) {
      alert('Debes seleccionar una plataforma')
      return
    }
    const res = await fetch('/api/promociones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ plataforma_id: '', titulo: '', valor: '', label: '', condicion: '', estado: 'active' })
      fetchPromociones()
      fetchPlataformas()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta promoción?')) {
      await fetch(`/api/promociones/${id}`, { method: 'DELETE' })
      fetchPromociones()
    }
  }

  const handleEditPlatform = (platformId: string, currentName: string) => {
    setEditingPlatformId(platformId)
    setEditPlatformName(currentName)
  }

  const handleSavePlatformName = async () => {
    if (!editingPlatformId) return
    if (!editPlatformName.trim()) {
      alert('El nombre no puede estar vacío')
      return
    }
    const res = await fetch(`/api/plataformas/${editingPlatformId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: editPlatformName.trim() }),
    })
    if (res.ok) {
      setEditingPlatformId(null)
      setEditPlatformName('')
      fetchPlataformas() // refrescar dropdown
      fetchPromociones() // refrescar lista
    } else {
      const error = await res.json()
      alert('Error al actualizar: ' + error.error)
    }
  }

  if (loading) return <div className="p-8 text-center">Cargando...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-fraunces text-tinta mb-6">Gestionar Promociones</h1>

      <form onSubmit={handleSubmit} className="bg-papel border border-oro/30 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Select de plataformas con botón de edición */}
          <div className="col-span-2 flex items-center gap-2">
            <select
              className="border p-2 rounded flex-1"
              value={form.plataforma_id}
              onChange={e => {
                setForm({ ...form, plataforma_id: e.target.value })
                // Si se selecciona una plataforma, cargar su nombre para edición
                const plat = plataformas.find(p => p.id === e.target.value)
                if (plat) {
                  setEditPlatformName(plat.nombre)
                  setEditingPlatformId(plat.id)
                }
              }}
              required
            >
              <option value="">Seleccionar plataforma</option>
              {plataformas.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            {editingPlatformId && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editPlatformName}
                  onChange={(e) => setEditPlatformName(e.target.value)}
                  className="border p-2 rounded w-48"
                  placeholder="Nuevo nombre"
                />
                <button
                  type="button"
                  onClick={handleSavePlatformName}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar nombre
                </button>
              </div>
            )}
          </div>

          <input
            className="border p-2 rounded"
            placeholder="Título"
            value={form.titulo}
            onChange={e => setForm({ ...form, titulo: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Valor (ej: 200%)"
            value={form.valor}
            onChange={e => setForm({ ...form, valor: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Label (ej: DE BONO)"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Condición"
            value={form.condicion}
            onChange={e => setForm({ ...form, condicion: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
          >
            <option value="active">Activa</option>
            <option value="expiring">Por vencer</option>
            <option value="expired">Agotada</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-6 py-2 bg-tinta text-white rounded">
          Agregar Promoción
        </button>
      </form>

      <div className="grid gap-4">
        {promociones.map(p => (
          <div key={p.id} className="bg-papel border border-oro/20 rounded-lg p-4 flex justify-between items-center">
            <div>
              <strong>{p.platform || 'Sin plataforma'}</strong> - {p.titulo} ({p.valor} {p.label})
              <div className="text-sm text-tinta/60">{p.condicion} · Estado: {p.estado}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditPlatform(p.plataforma_id, p.platform)}
                className="text-blue-600 hover:text-blue-800"
              >
                Editar nombre
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
