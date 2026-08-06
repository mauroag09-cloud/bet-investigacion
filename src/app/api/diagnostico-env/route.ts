import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ definida' : '❌ NO definida',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ definida' : '❌ NO definida',
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL,
    keyStart: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'no',
  })
}
