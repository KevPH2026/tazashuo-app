import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendMessage } from '@/lib/ai'
import { mockConversations, mockMessagesMap } from '@/lib/mock-data'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { content, persona_slug } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Missing content' },
        { status: 400 }
      )
    }

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single()

    const isMock = convError || !conversation

    let userMessage = {
      id: `msg-${Date.now()}-user`,
      conversation_id: id,
      role: 'user' as const,
      content,
      created_at: new Date().toISOString(),
    }

    if (!isMock) {
      const { data: insertedUserMsg, error: insertError } = await supabase
        .from('messages')
        .insert([{ conversation_id: id, role: 'user', content }])
        .select()
        .single()

      if (insertError) {
        console.error('Insert user message error:', insertError)
      } else if (insertedUserMsg) {
        userMessage = insertedUserMsg
      }
    } else {
      if (!mockMessagesMap[id]) mockMessagesMap[id] = []
      mockMessagesMap[id].push(userMessage)
    }

    const history = isMock
      ? (mockMessagesMap[id] || []).slice(0, -1).map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }))
      : []

    let reply = ''
    try {
      reply = await sendMessage({
        personaSlug: persona_slug,
        message: content,
        history,
      })
    } catch (aiError: any) {
      console.error('AI API error:', aiError)
      reply = `\u62b1\u6b49\uff0cAI\u670d\u52a1\u6682\u65f6\u4e0d\u53ef\u7528\u3002${aiError.message || ''}`
    }

    let assistantMessage = {
      id: `msg-${Date.now()}-assistant`,
      conversation_id: id,
      role: 'assistant' as const,
      content: reply,
      created_at: new Date().toISOString(),
    }

    if (!isMock) {
      const { data: insertedAssistantMsg, error: insertError } = await supabase
        .from('messages')
        .insert([{ conversation_id: id, role: 'assistant', content: reply }])
        .select()
        .single()

      if (insertError) {
        console.error('Insert assistant message error:', insertError)
      } else if (insertedAssistantMsg) {
        assistantMessage = insertedAssistantMsg
      }
    } else {
      mockMessagesMap[id].push(assistantMessage)
    }

    return NextResponse.json({
      userMessage,
      assistantMessage,
    })
  } catch (error: any) {
    console.error('POST /api/conversations/[id]/messages error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}
