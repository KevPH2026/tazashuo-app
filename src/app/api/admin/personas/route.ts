import { NextResponse } from 'next/server'
import { seedPersonas } from '@/lib/personas'

export async function GET() {
  try {
    const personas = seedPersonas.map((p) => ({
      ...p,
      id: p.slug,
      created_at: new Date().toISOString(),
    }))
    return NextResponse.json({ personas })
  } catch (error) {
    console.error('GET /api/admin/personas error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch personas' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { slug, skillData } = body

    if (!slug || !skillData) {
      return NextResponse.json(
        { error: 'Missing slug or skillData' },
        { status: 400 }
      )
    }

    const persona = seedPersonas.find((p) => p.slug === slug)
    if (!persona) {
      return NextResponse.json(
        { error: 'Persona not found' },
        { status: 404 }
      )
    }

    if (skillData.mind_model !== undefined) persona.mind_model = skillData.mind_model
    if (skillData.heuristic !== undefined) persona.heuristic = skillData.heuristic
    if (skillData.expression !== undefined) persona.expression = skillData.expression
    if (skillData.voice !== undefined) persona.voice = skillData.voice
    if (skillData.principle !== undefined) persona.principle = skillData.principle
    if (skillData.boundary !== undefined) persona.boundary = skillData.boundary

    return NextResponse.json({
      success: true,
      persona: {
        ...persona,
        id: persona.slug,
        created_at: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error('PUT /api/admin/personas error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update persona' },
      { status: 500 }
    )
  }
}
