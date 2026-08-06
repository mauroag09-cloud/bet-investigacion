import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()

  const { error } = await supabase
    .from('reclamos')
    .insert({
      plataforma_id: body.plataforma_id,
      nombre_usuario: body.nombre_usuario,
      email: body.email,
      descripcion: body.descripcion,
      estado: 'pendiente'
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
