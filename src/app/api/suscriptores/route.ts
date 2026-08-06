import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const { nombre, email } = await req.json()

  if (!nombre || !email) {
    return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const { error } = await supabase
    .from('suscriptores')
    .insert({ nombre, email })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Este email ya está suscrito' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
