import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const termino = searchParams.get('termino')

  if (!termino) {
    return NextResponse.json({ error: 'Falta término de búsqueda' }, { status: 400 })
  }

  // Buscar en plataformas
  const { data, error } = await supabase
    .from('plataformas')
    .select('*')
    .ilike('nombre', `%${termino}%`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (data && data.length > 0) {
    return NextResponse.json({ encontrado: true, data })
  }

  // Si no hay resultados, devolver "no encontrado" y sugerir solicitud
  return NextResponse.json({ encontrado: false, termino })
}
