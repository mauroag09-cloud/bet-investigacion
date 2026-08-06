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

  return NextResponse.json(data || [])
}
