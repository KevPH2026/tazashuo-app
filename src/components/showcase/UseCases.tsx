'use client'

import { Rocket, Lightbulb, TrendingUp, GraduationCap } from 'lucide-react'

const cases = [
  {
    icon: Rocket,
    title: '创业者',
    desc: '产品方向不确定、融资路演讲、团队管理困惑时，让张一鸣、马斯克帮你做决策。',
    persona: '张一鸣、马斯克',
    gradient: 'from-neon-cyan to-blue-500',
  },
  {
    icon: Lightbulb,
    title: '产品经理',
    desc: '产品定义、功能优先级、用户体验质量时，让乔布斯用“品味即策略”给你一针见血。',
    persona: '乔布斯',
    gradient: 'from-neon-pink to-neon-purple',
  },
  {
    icon: TrendingUp,
    title: '投资人',
    desc: '重大投资决策前，让芒格用“多元思维模型”和“逆向思考”帮你识破陷阱。',
    persona: '芒格',
    gradient: 'from-neon-purple to-indigo-500',
  },
  {
    icon: GraduationCap,
    title: '学生 / 自学者',
    desc: '学习新领域、写论文、准备面试时，让费曼用“第一性原理”帮你打透知识骨架。',
    persona: '费曼',
    gradient: 'from-emerald-400 to-neon-cyan',
  },
]

export default function UseCases() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {cases.map((c, i) => (
        <div key={i} className="card group">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <c.icon size={20} className="text-white" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-3">{c.desc}</p>
          <div className="text-xs text-neon-cyan">推荐人物：{c.persona}</div>
        </div>
      ))}
    </div>
  )
}
