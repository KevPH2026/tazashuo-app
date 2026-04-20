import { NextResponse } from 'next/server'

// Mock data for conversations
const mockConversations: any[] = [
  {
    id: 'conv-1',
    user_id: 'user-1',
    persona_id: 'jobs',
    title: '如何评价功能冒进的产品？',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'conv-2',
    user_id: 'user-1',
    persona_id: 'musk',
    title: '第一性原理怎么应用到获客成本优化？',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json({ conversations: mockConversations })
  } catch (error: any) {
    console.error('GET /api/conversations error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { persona_id, title } = body

    const newConversation = {
      id: `conv-${Date.now()}`,
      user_id: 'user-1',
      persona_id: persona_id || 'unknown',
      title: title || 'New Conversation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockConversations.unshift(newConversation)

    return NextResponse.json({ conversation: newConversation })
  } catch (error: any) {
    console.error('POST /api/conversations error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create conversation' },
      { status: 500 }
    )
  }
}
