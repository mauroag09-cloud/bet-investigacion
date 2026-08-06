import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function GET() {
  try {
    // Obtener promociones
    const { data: promociones, error: errorPromos } = await supabase
      .from('promociones')
      .select('*')
      .order('created_at', { ascending: false })

    if (errorPromos) {
      return NextResponse.json({ error: errorPromos.message }, { status: 500 })
    }

    // Si no hay promociones, devolver array vacío
    if (!promociones || promociones.length === 0) {
      return NextResponse.json([])
    }

    // Obtener IDs de plataformas
    const platformIds = promociones.map(p => p.plataforma_id).filter(Boolean)
    const uniqueIds = [...new Set(platformIds)]

    // Obtener nombres de plataformas
    let platformMap = new Map()
    if (uniqueIds.length > 0) {
      const { data: plataformas, error: errorPlats } = await supabase
        .from('plataformas')
        .select('id, nombre')
        .in('id', uniqueIds)

      if (errorPlats) {
        return NextResponse.json({ error: errorPlats.message }, { status: 500 })
      }

      plataformas?.forEach(p => platformMap.set(p.id, p.nombre))
    }

    // Mapear resultados
    const mapped = promociones.map(item => ({
      id: item.id,
      plataforma_id: item.plataforma_id,
      platform: platformMap.get(item.plataforma_id) || 'Sin plataforma',
      titulo: item["título"] || 'Sin título',
      valor: item.valor || '0%',
      label: item.label || '',
      condicion: item.condicion || '',
      estado: item.estado || 'active',
    }))

    return NextResponse.json(mapped)
  } catch (error) {
    console.error('Error en API de promociones:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
