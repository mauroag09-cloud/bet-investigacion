import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function GET() {
  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const mapped = data?.map(item => ({
    id: item.id,
    plataforma_id: item.plataforma_id,
    platform: item.nombre_plataforma || 'Sin plataforma',  // ← USAR NUEVO CAMPO
    titulo: item.titulo || '',
    valor: item.valor || '',
    label: item.label || '',
    condicion: item.condicion || '',
    estado: item.estado || 'active',
  })) || []

  return NextResponse.json(mapped)
}
