'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, User, Sparkles, Zap, Lightbulb, ChevronLeft } from 'lucide-react'
import PersonaAvatar from '@/components/personas/PersonaAvatar'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface PersonaInfo {
  id: string
  slug: string
  name: string
  avatar: string
  tag: string
  description: string
  mind_model: string
  heuristic: string
  expression: string
  voice: string
  principle: string
  boundary: string
}

interface ChatInterfaceProps {
  persona: PersonaInfo
  conversationId?: string
  initialMessages?: Message[]
  onBack?: () => void
}

const quickPrompts = [
  { icon: Zap, text: '用你的思维分析这个问题' },
  { icon: Lightbulb, text: '你会怎么做决策？' },
  { icon: Sparkles, text: '给我一个不一样的视角' },
]

export default function ChatInterface({
  persona,
  conversationId: initialConvId,
  initialMessages = [],
  onBack,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | undefined>(initialConvId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return

    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: content.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      let convId = conversationId

      // Create conversation if not exists (non-blocking)
      if (!convId) {
        try {
          const createRes = await fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ persona_id: persona.id, title: content.trim().slice(0, 30) }),
          })
          if (createRes.ok) {
            const createData = await createRes.json()
            convId = createData.conversation?.id
            if (convId) setConversationId(convId)
          }
        } catch {
          // ignore conversation creation errors, fallback to /api/chat
        }
      }

      if (!convId) {
        // Fallback to /api/chat
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            persona_slug: persona.slug,
            message: content.trim(),
            history: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        })
        const data = await res.json()
        const assistantMsg: Message = {
          id: `resp-${Date.now()}`,
          role: 'assistant',
          content: data.reply || '\u54cd\u5e94\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002',
        }
        setMessages((prev) => [...prev, assistantMsg])
      } else {
        const res = await fetch(`/api/conversations/${convId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: content.trim(), persona_slug: persona.slug }),
        })
        const data = await res.json()
        const assistantMsg: Message = {
          id: data.assistantMessage?.id || `resp-${Date.now()}`,
          role: 'assistant',
          content: data.assistantMessage?.content || '\u54cd\u5e94\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002',
        }
        setMessages((prev) => [...prev, assistantMsg])
      }
    } catch (_err: unknown) {
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: 'assistant', content: '\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fallback: read from DOM if React state hasn't updated
    const form = e.currentTarget as HTMLFormElement
    const inputEl = form.querySelector('input[type="text"]') as HTMLInputElement
    const value = inputEl?.value || input
    if (value.trim()) {
      sendMessage(value)
      if (inputEl) inputEl.value = ''
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#050508]">
      {/* Sidebar info */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-[var(--border-color)] bg-[rgba(255,255,255,0.02)] p-5 overflow-y-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-text-dim hover:text-neon-cyan transition-colors mb-4"
          >
            <ChevronLeft size={16} />
            返回
          </button>
        )}

        <div className="flex flex-col items-center mb-5">
          <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="xl" />
          <h2 className="mt-3 text-lg font-bold text-white">{persona.name}</h2>
          <span className="badge mt-1">{persona.tag}</span>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-neon-cyan mb-1">心智模型</h4>
            <p className="text-text-dim leading-relaxed">{persona.mind_model}</p>
          </div>
          <div>
            <h4 className="font-semibold text-neon-pink mb-1">决策启发式</h4>
            <p className="text-text-dim leading-relaxed">{persona.heuristic}</p>
          </div>
          <div>
            <h4 className="font-semibold text-neon-purple mb-1">表达风格</h4>
            <p className="text-text-dim leading-relaxed">{persona.expression}</p>
          </div>
          <div>
            <h4 className="font-semibold text-neon-orange mb-1">声音特征</h4>
            <p className="text-text-dim leading-relaxed">{persona.voice}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">原则</h4>
            <p className="text-text-dim leading-relaxed">{persona.principle}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">边界</h4>
            <p className="text-text-dim leading-relaxed">{persona.boundary}</p>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          {onBack && (
            <button onClick={onBack} className="text-text-dim hover:text-neon-cyan">
              <ChevronLeft size={20} />
            </button>
          )}
          <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="sm" />
          <div>
            <h2 className="text-sm font-bold text-white">{persona.name}</h2>
            <span className="text-xs text-text-dim">{persona.tag}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="xl" />
              <h3 className="mt-4 text-xl font-bold text-white">
                开始与 {persona.name} 对话
              </h3>
              <p className="mt-2 text-sm text-text-dim max-w-md">
                {persona.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {quickPrompts.map((prompt, idx) => {
                  const Icon = prompt.icon
                  return (
                    <button
                      key={idx}
                      onClick={() => sendMessage(prompt.text)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] text-xs text-text-dim hover:border-neon-cyan hover:text-neon-cyan transition-all"
                    >
                      <Icon size={13} />
                      {prompt.text}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div className="shrink-0 mt-1">
                {msg.role === 'assistant' ? (
                  <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="sm" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-white text-xs font-bold">
                    <User size={14} />
                  </div>
                )}
              </div>
              <div
                className={cn(
                  'max-w-[75%] sm:max-w-[65%] rounded-xl px-4 py-3 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 border border-[rgba(255,0,160,0.15)] text-white'
                    : 'bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] text-foreground'
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="sm" />
              <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] rounded-xl px-4 py-3 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-neon-cyan" />
                <span className="text-xs text-text-dim">正在思考...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-[var(--border-color)] bg-[rgba(5,5,8,0.8)] backdrop-blur-sm px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`问问 ${persona.name}...`}
              className="input flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn btn-primary px-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              <span className="hidden sm:inline">发送</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
