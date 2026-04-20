export interface Persona {
  id: string
  slug: string
  name: string
  name_en: string
  avatar: string
  tag: string
  tag_en: string
  description: string
  description_en: string
  mind_model: string
  heuristic: string
  expression: string
  voice: string
  principle: string
  boundary: string
  stats: { conversations: number; rating: number }
  created_at: string
  is_premium: boolean
}

export interface Conversation {
  id: string
  user_id: string
  persona_id: string
  persona: Persona
  title: string
  messages: Message[]
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar: string
  plan: 'free' | 'pro' | 'team'
  daily_chats: number
  max_daily_chats: number
  created_at: string
}
