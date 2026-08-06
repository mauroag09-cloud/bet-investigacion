import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return new NextResponse('URL no proporcionada', { status: 400 })
  }

  // Validar que sea una URL externa
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return new NextResponse('URL inválida', { status: 400 })
  }

  // Redirigir a la URL externa
  return NextResponse.redirect(url, 302)
}
