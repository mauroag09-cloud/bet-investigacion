import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const platforms = await prisma.platform.findMany()
    return NextResponse.json(platforms)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener plataformas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const platform = await prisma.platform.create({ data: body })
    return NextResponse.json(platform)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al crear plataforma' }, { status: 500 })
  }
}
