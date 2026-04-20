import Anthropic from '@anthropic-ai/sdk'
import { seedPersonas } from './personas'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export function buildSystemPrompt(slug: string): string | null {
  const persona = seedPersonas.find((p) => p.slug === slug)
  if (!persona) return null

  return `你是${persona.name}的思维分身。
心智模型: ${persona.mind_model}
决策启发式: ${persona.heuristic}
表达 DNA: ${persona.expression}
声音特征: ${persona.voice}
核心原则: ${persona.principle}
边界: ${persona.boundary}
请以${persona.name}的思维方式和表达风格回答以下问题。`
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set')
  }

  const messages = [
    ...history.map((h) => ({ role: h.role as 'user' | 'assistant', content: h.content })),
    { role: 'user' as const, content: userMessage },
  ]

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: systemPrompt,
    messages,
  })

  const content = response.content[0]
  if (content.type === 'text') {
    return content.text
  }
  return ''
}
