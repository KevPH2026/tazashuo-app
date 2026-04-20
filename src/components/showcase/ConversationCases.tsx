'use client'

import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const cases = [
  {
    persona: '乔布斯',
    avatar: 'J',
    gradient: 'from-neon-pink to-neon-purple',
    tag: '产品 / 设计',
    question: '如何评价一个功能冒进的产品？',
    reply: '“功能冒进？这不是加法。这是恐惧。你们害怕用户选择别人的产品，所以拼命往产品里塞东西。但创新意味着你说“不”给一千样东西。克制是最大的自信。”',
    highlight: '功能冒进本质上是没有品味的表现',
  },
  {
    persona: '马斯克',
    avatar: 'M',
    gradient: 'from-neon-cyan to-blue-500',
    tag: '科技 / 商业',
    question: '第一性原理怎么应用到获客成本优化？',
    reply: '“你必须先问：这个问题的物理极限是什么？如果你不知道极限，你就不知道什么是可能。获客成本的极限是零——通过口碑传播。如果你的产品好到足以让人分享，获客成本近乎为零。”',
    highlight: '物理极限思维',
  },
  {
    persona: '芒格',
    avatar: 'C',
    gradient: 'from-neon-purple to-indigo-500',
    tag: '投资 / 决策',
    question: '这笔投资该不该做？',
    reply: '“反向思考一下：什么因素会让这笔投资失败？如果我们能列出所有失败原因，然后避免这些错误，我们就提高了成功的概率。别人追求是什么让投资成功，我们追求是什么让它不失败。”',
    highlight: '逆向思考',
  },
]

export default function ConversationCases() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? cases.length - 1 : a - 1))
  const next = () => setActive((a) => (a === cases.length - 1 ? 0 : a + 1))

  const c = cases[active]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card p-6 sm:p-8">
        {/* Persona header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-bold text-lg`}>
            {c.avatar}
          </div>
          <div>
            <div className="text-base font-bold text-white">{c.persona}</div>
            <div className="text-xs text-text-dim">{c.tag}</div>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] flex items-center justify-center text-text-dim hover:text-neon-cyan hover:border-neon-cyan transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] flex items-center justify-center text-text-dim hover:text-neon-cyan hover:border-neon-cyan transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="mb-4">
          <div className="text-xs text-neon-cyan font-medium mb-1.5 uppercase tracking-wider">User Question</div>
          <div className="text-white font-medium">{c.question}</div>
        </div>

        {/* Reply */}
        <div className="relative bg-[rgba(255,255,255,0.03)] rounded-xl p-5 border border-[var(--border-color)]">
          <Quote size={20} className="text-neon-pink/40 absolute top-3 left-3" />
          <p className="text-sm text-[var(--foreground)] leading-relaxed pl-6">
            {c.reply}
          </p>
          <div className="mt-3 pl-6">
            <span className="inline-block px-3 py-1 bg-neon-pink/10 border border-neon-pink/20 rounded-full text-xs text-neon-pink font-medium">
              → {c.highlight}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-neon-cyan' : 'bg-text-muted hover:bg-text-dim'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
