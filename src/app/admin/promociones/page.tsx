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

export default function AdminPromociones() {
  const [promociones, setPromociones] = useState<Promocion[]>([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    nombre_plataforma: '',
    titulo: '',
    valor: '',
    label: '',
    condicion: '',
    estado: 'active',
  })

  const fetchPromociones = async () => {
    const res = await fetch('/api/promociones?_t=' + Date.now())
    const data = await res.json()
    setPromociones(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPromociones()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre_plataforma.trim()) {
      alert('El nombre de la plataforma es obligatorio')
      return
    }
    const res = await fetch('/api/promociones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ nombre_plataforma: '', titulo: '', valor: '', label: '', condicion: '', estado: 'active' })
      fetchPromociones()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta promoción?')) {
      await fetch(`/api/promociones/${id}`, { method: 'DELETE' })
      fetchPromociones()
    }
  }

  if (loading) return <div className="p-8 text-center">Cargando...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-fraunces text-tinta mb-6">Gestionar Promociones</h1>

      <form onSubmit={handleSubmit} className="bg-papel border border-oro/30 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded col-span-2"
            placeholder="Nombre de la plataforma (ej: Joker.top)"
            value={form.nombre_plataforma}
            onChange={e => setForm({ ...form, nombre_plataforma: e.target.value })}
            required
          />
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
            <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
