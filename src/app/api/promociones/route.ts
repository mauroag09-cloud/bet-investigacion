import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function GET() {
  const { data, error } = await supabase
    .from('promociones')
    .select(`
      id,
      plataforma_id,
      "título",
      valor,
      label,
      condicion,
      estado,
      created_at,
      plataformas ( nombre )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Mapear correctamente accediendo al primer elemento del array plataformas
  const mapped = data?.map((item: any) => ({
    id: item.id,
    plataforma_id: item.plataforma_id,
    platform: item.plataformas?.[0]?.nombre || 'Sin plataforma',
    titulo: item["título"] || 'Sin título',
    valor: item.valor || '0%',
    label: item.label || '',
    condicion: item.condicion || '',
    estado: item.estado || 'active',
  })) || []

  return NextResponse.json(mapped)
}
