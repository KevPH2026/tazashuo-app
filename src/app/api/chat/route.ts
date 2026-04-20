import { NextResponse } from 'next/server'
import { sendMessage } from '@/lib/ai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { persona_slug, message, history = [] } = body

    if (!persona_slug || !message) {
      return NextResponse.json(
        { error: 'Missing persona_slug or message' },
        { status: 400 }
      )
    }

    const reply = await sendMessage({
      personaSlug: persona_slug,
      message,
      history,
    })

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('POST /api/chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}
