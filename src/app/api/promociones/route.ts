import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0;

export async function GET() {
  const { data, error } = await supabase
    .from('promociones')
    .select(`
      *,
      plataformas (
        nombre
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const mapped = data?.map(item => ({
    id: item.id,
    platform: item.plataformas?.nombre || 'Sin plataforma',
    plataforma_id: item.plataforma_id,
    titulo: item["título"],
    valor: item.valor,
    label: item.label,
    condicion: item.condicion,
    estado: item.estado,
    created_at: item.created_at,
  })) || []

  return NextResponse.json(mapped)
}
