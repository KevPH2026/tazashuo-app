import { NextResponse } from 'next/server'
import { seedPersonas } from '@/lib/personas'

export async function GET() {
  try {
    const personas = seedPersonas.map((p, index) => ({
      ...p,
      id: p.slug,
      created_at: new Date().toISOString(),
    }))
    return NextResponse.json({ personas })
  } catch (error) {
    console.error('GET /api/personas error:', error)
    return NextResponse.json({ error: 'Failed to fetch personas' }, { status: 500 })
  }
}
