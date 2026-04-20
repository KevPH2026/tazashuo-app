'use client'

import Link from 'next/link'
import { ArrowRight, Brain, MessageSquare, Lightbulb } from 'lucide-react'

const personas = [
  {
    name: '乔布斯',
    avatar: 'J',
    gradient: 'from-neon-pink to-neon-purple',
    ability: '品味判断',
    abilityDesc: '用“聚焦即说不”帮你做出策略',
    scenarios: ['产品定义', '功能优先级', '用户体验'],
  },
  {
    name: '马斯克',
    avatar: 'M',
    gradient: 'from-neon-cyan to-blue-500',
    ability: '极限推理',
    abilityDesc: '用“物理极限”打破思维天花板',
    scenarios: ['成本优化', '规模扩张', '技术选型'],
  },
  {
    name: '芒格',
    avatar: 'C',
    gradient: 'from-neon-purple to-indigo-500',
    ability: '逆向思考',
    abilityDesc: '用“多元模型”识破投资陷阱',
    scenarios: ['投资决策', '风险评估', '长期规划'],
  },
]

export default function PersonaShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {personas.map((p, i) => (
        <Link href={`/chat?persona=${p.name === '乔布斯' ? 'jobs' : p.name === '马斯克' ? 'musk' : 'munger'}`} key={i} className="card group hover:border-neon-cyan/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold text-base`}>
              {p.avatar}
            </div>
            <div>
              <div className="text-base font-bold text-white">{p.name}</div>
              <div className="text-xs text-neon-cyan">{p.ability}</div>
            </div>
          </div>
          <p className="text-sm text-text-dim mb-4">{p.abilityDesc}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.scenarios.map((s, j) => (
              <span key={j} className="px-2 py-0.5 bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] rounded text-xs text-text-dim">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-neon-cyan group-hover:gap-2 transition-all">
            开始对话 <ArrowRight size={12} />
          </div>
        </Link>
      ))}
    </div>
  )
}
