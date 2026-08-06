import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


export async function GET() {
  try {
    // 1. Obtener todas las promociones
    const { data: promociones, error: errorPromos } = await supabase
      .from('promociones')
      .select('*')
      .order('created_at', { ascending: false })

    if (errorPromos) {
      console.error('Error al obtener promociones:', errorPromos)
      return NextResponse.json({ error: errorPromos.message }, { status: 500 })
    }

    // 2. Si no hay promociones, devolver array vacío
    if (!promociones || promociones.length === 0) {
      return NextResponse.json([])
    }

    // 3. Obtener IDs de plataforma únicos
    const platformIds = promociones
      .map(p => p.plataforma_id)
      .filter((id): id is string => Boolean(id))

    // 4. Si no hay IDs, devolver promociones sin nombre de plataforma
    if (platformIds.length === 0) {
      const mapped = promociones.map(item => ({
        id: item.id,
        plataforma_id: item.plataforma_id,
        platform: 'Sin plataforma',
        titulo: item["título"] || 'Sin título',
        valor: item.valor || '0%',
        label: item.label || '',
        condicion: item.condicion || '',
        estado: item.estado || 'active',
      }))
      return NextResponse.json(mapped)
    }

    // 5. Consultar las plataformas correspondientes
    const { data: plataformas, error: errorPlats } = await supabase
      .from('plataformas')
      .select('id, nombre')
      .in('id', platformIds)

    if (errorPlats) {
      console.error('Error al obtener plataformas:', errorPlats)
      return NextResponse.json({ error: errorPlats.message }, { status: 500 })
    }

    // 6. Crear mapa de plataforma_id -> nombre
    const platformMap = new Map<string, string>()
    plataformas?.forEach(p => platformMap.set(p.id, p.nombre))

    // 7. Mapear promociones con el nombre de la plataforma
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
  } catch (err) {
    console.error('Error en API de promociones:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
