import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function GET() {
  const { data, error } = await supabase
    .from('promociones')
    .select(`
      *,
      plataformas ( nombre )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Mapeo para incluir el nombre de la plataforma
  const mapped = data?.map(item => ({
    id: item.id,
    plataforma_id: item.plataforma_id,
    platform: item.plataformas?.nombre || 'Sin plataforma',
    titulo: item.titulo || 'Sin título',
    valor: item.valor || '0%',
    label: item.label || '',
    condicion: item.condicion || '',
    estado: item.estado || 'active',
  })) || []

  return NextResponse.json(mapped)
}
