import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const updateData: any = {}
  if (body.nombre_plataforma !== undefined) updateData.nombre_plataforma = body.nombre_plataforma
  if (body.titulo !== undefined) updateData.titulo = body.titulo
  if (body.descripcion !== undefined) updateData.descripcion = body.descripcion
  if (body.estado !== undefined) updateData.estado = body.estado
  if (body.fecha !== undefined) updateData.fecha = body.fecha
  if (body.enlace !== undefined) updateData.enlace = body.enlace
  if (body.nombre_usuario !== undefined) updateData.nombre_usuario = body.nombre_usuario
  if (body.email !== undefined) updateData.email = body.email
  if (body.pruebas !== undefined) updateData.pruebas = body.pruebas

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No hay datos para actualizar' }, { status: 400 })
  }

  updateData.updated_at = new Date().toISOString()

  const { error } = await supabase
    .from('reclamos')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { error } = await supabase
    .from('reclamos')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
