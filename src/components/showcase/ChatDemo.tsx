'use client'

import { useEffect, useState, useRef } from 'react'
import { MessageSquare } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const demoMessages: Message[] = [
  { role: 'user', content: `如果你是乔布斯，你会怎么评价一个功能冒进的产品？` },
  { role: 'assistant', content: `功能冒进？这不是加法。这是"恐惧"。\n\n你们害怕用户选择别人的产品，所以拼命往产品里塞东西。\n\n但创新意味着你说"不"给一千样东西。我回到苹果时，产品线有70%是垃圾。我们抓住了四个真正重要的产品，其他全部划掉。\n\n"克制是最大的自信。"` },
  { role: 'user', content: `那如果投资人要求增加功能呢？` },
  { role: 'assistant', content: `投资人要求增加功能？那就换一个投资人。\n\n如果你的产品需要靠增加功能来"讨好"投资人，说明你的产品本身就不够好。\n\n好的产品是自己"说话"的。用户用完后会自然推荐给朋友。而不是靠你在PPT里列出20个功能。\n\n功能冒进本质上是没有品味的表现。"` },
]

export default function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(1)
  const [typingIndex, setTypingIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= demoMessages.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleCount])

  const visibleMessages = demoMessages.slice(0, visibleCount)
  const currentMsg = visibleMessages[visibleMessages.length - 1]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card p-0 overflow-hidden border border-[rgba(0,240,255,0.15)]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold text-sm">
            J
          </div>
          <div>
            <div className="text-sm font-semibold text-white">乔布斯</div>
            <div className="text-xs text-neon-cyan flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              在线
            </div>
          </div>
          <div className="ml-auto text-xs text-text-muted">演示对话</div>
        </div>

        {/* Messages */}
        <div ref={containerRef} className="h-[320px] overflow-y-auto px-5 py-4 space-y-4">
          {visibleMessages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-gradient-to-br from-neon-pink to-neon-purple text-white'
              }`}>
                {msg.role === 'user' ? 'U' : 'J'}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-neon-cyan/10 text-white rounded-tr-sm'
                  : 'bg-[rgba(255,255,255,0.05)] text-[var(--foreground)] rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {visibleCount < demoMessages.length && currentMsg?.role === 'assistant' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                J
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="px-5 py-3 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-9 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[var(--border-color)] flex items-center px-3 text-xs text-text-muted">
              试试向乔布斯提问...
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
              <MessageSquare size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
