import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function GET(request: Request) {
  // ?todas=1 → devuelve todos (para el panel admin). Por defecto solo los visibles.
  const url = new URL(request.url)
  const todas = url.searchParams.get('todas') === '1'

  let query = supabase.from('reclamos').select('*')
  if (!todas) {
    query = query.eq('visible', true)
  }
  const { data, error } = await query.order('fecha', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [], {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.nombre_plataforma || !body.titulo) {
    return NextResponse.json({ error: 'Plataforma y título son obligatorios' }, { status: 400 })
  }

  const { error } = await supabase
    .from('reclamos')
    .insert({
      nombre_plataforma: body.nombre_plataforma || '',
      titulo: body.titulo || '',
      descripcion: body.descripcion || '',
      estado: body.estado || 'pending',
      fecha: body.fecha || new Date().toISOString().slice(0, 10),
      enlace: body.enlace || null,
      nombre_usuario: body.nombre_usuario || null,
      email: body.email || null,
      pruebas: Array.isArray(body.pruebas) ? body.pruebas : [],
      visible: body.visible !== undefined ? body.visible : true,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
