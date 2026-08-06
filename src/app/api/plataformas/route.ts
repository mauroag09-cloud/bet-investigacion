import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Esto desactiva TODA la caché para esta API Route
export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabase
    .from('plataformas')
    .select('*')
    .order('rating', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}
export const revalidate = 0;
export const revalidate = 0;
export const revalidate = 0;
