import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { nombre } = await req.json()

  if (!nombre) {
    return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
  }

  const { error } = await supabase
    .from('plataformas')
    .update({ nombre })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
