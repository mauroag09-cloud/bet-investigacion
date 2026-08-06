'use client'

import { useEffect, useState } from 'react'

type Promocion = {
  id: string
  nombre_plataforma: string
  titulo: string
  valor: string
  label: string
  condicion: string
  estado: string
}

export default function AdminPromociones() {
  const [promociones, setPromociones] = useState<Promocion[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

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

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id)
    setEditName(currentName)
  }

  const saveName = async (id: string) => {
    if (!editName.trim()) return
    const res = await fetch(`/api/promociones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_plataforma: editName.trim() }),
    })
    if (res.ok) {
      setEditingId(null)
      setEditName('')
      fetchPromociones()
    }
  }

  if (loading) return <div className="p-8 text-center">Cargando...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Plataforma</th>
              <th className="text-left p-3">Título</th>
              <th className="text-left p-3">Valor</th>
              <th className="text-left p-3">Label</th>
              <th className="text-left p-3">Condición</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promociones.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  {editingId === p.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded text-sm"
                      />
                      <button
                        onClick={() => saveName(p.id)}
                        className="text-green-600 hover:text-green-800 text-xs"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setEditName('') }}
                        className="text-gray-500 hover:text-gray-700 text-xs"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <span className="font-medium">
                      {p.nombre_plataforma || 'Sin nombre'}
                      <button
                        onClick={() => startEditing(p.id, p.nombre_plataforma || '')}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        ✎
                      </button>
                    </span>
                  )}
                </td>
                <td className="p-3">{p.titulo}</td>
                <td className="p-3">{p.valor}</td>
                <td className="p-3">{p.label}</td>
                <td className="p-3">{p.condicion}</td>
                <td className="p-3">{p.estado}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
