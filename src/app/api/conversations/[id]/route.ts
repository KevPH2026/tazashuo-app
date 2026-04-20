import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { mockConversations, mockMessagesMap } from '@/lib/mock-data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single()

    if (convError || !conversation) {
      const mockConv = mockConversations.find((c) => c.id === id)
      if (!mockConv) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        )
      }
      const messages = mockMessagesMap[id] || []
      return NextResponse.json({
        conversation: { ...mockConv, messages },
        messages,
      })
    }

    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })

    if (msgError) {
      console.error('Messages fetch error:', msgError)
    }

    return NextResponse.json({
      conversation: { ...conversation, messages: messages || [] },
      messages: messages || [],
    })
  } catch (error) {
    console.error('GET /api/conversations/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    )
  }
}
