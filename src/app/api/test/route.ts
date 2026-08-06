import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Primero, contar cuántos registros hay
    const { count, error: countError } = await supabase
      .from('plataformas')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return NextResponse.json({ 
        error: 'Error al contar registros', 
        details: countError.message 
      }, { status: 500 })
    }

    // Si no hay registros, devolver mensaje claro
    if (count === 0) {
      return NextResponse.json({ 
        success: true, 
        data: [],
        message: 'La tabla plataformas está vacía. Insertá datos en Supabase.'
      })
    }

    // Si hay registros, traerlos
    const { data, error } = await supabase
      .from('plataformas')
      .select('*')
      .limit(10)

    if (error) {
      return NextResponse.json({ 
        error: 'Error al obtener datos', 
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ success: true, data, count })
  } catch (e: any) {
    return NextResponse.json({ 
      error: 'Excepción en el servidor', 
      details: e.message 
    }, { status: 500 })
  }
}
