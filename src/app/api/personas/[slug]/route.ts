import { NextResponse } from 'next/server'
import { seedPersonas } from '@/lib/personas'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const persona = seedPersonas.find((p) => p.slug === slug)

    if (!persona) {
      return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
    }

    return NextResponse.json({
      persona: {
        ...persona,
        id: persona.slug,
        created_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('GET /api/personas/[slug] error:', error)
    return NextResponse.json({ error: 'Failed to fetch persona' }, { status: 500 })
  }
}
