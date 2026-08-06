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
  if (body.valor !== undefined) updateData.valor = body.valor
  if (body.label !== undefined) updateData.label = body.label
  if (body.condicion !== undefined) updateData.condicion = body.condicion
  if (body.estado !== undefined) updateData.estado = body.estado

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No hay datos para actualizar' }, { status: 400 })
  }

  const { error } = await supabase
    .from('promociones')
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
    .from('promociones')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
