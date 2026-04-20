'use client'

import { X, Check } from 'lucide-react'

const comparisons = [
  {
    scenario: '产品决策',
    before: [
      '搞不清楚哪个功能该留哪个该删',
      '看了几十篇文章，意见不一',
      '开了好几个会，还是没结论',
    ],
    after: [
      '乔布斯告诉你：“品味即策略，聚焦即说不”',
      '10分钟对话，策略清晰了',
      '用一个枢架打通了所有分歧',
    ],
  },
  {
    scenario: '投资分析',
    before: [
      '看了很多行业报告，还是不敢下手',
      '各种数据对冲，越分析越模糊',
      '常常后悔“当时怎么没想到这一点”',
    ],
    after: [
      '芒格用“逆向思考”帮你列出所有失败原因',
      '6个维度模型分析，风险一目了然',
      '“能力圈理论”帮你避开认知盲区',
    ],
  },
  {
    scenario: '学习新知识',
    before: [
      '搜了一堆视频和文章，感觉都对都不对',
      '知识点散乱，没有系统性框架',
      '学完忘得快，没法应用',
    ],
    after: [
      '费曼用“第一性原理”帮你建立知识骨架',
      '10分钟讲解比一堂课更清晰',
      '理解原理，记忆公式自然跟着来',
    ],
  },
]

export default function BeforeAfter() {
  return (
    <div className="space-y-6">
      {comparisons.map((item, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card opacity-60">
            <div className="text-xs text-text-muted font-medium mb-3 uppercase tracking-wider">传统方式 · {item.scenario}</div>
            <ul className="space-y-2">
              {item.before.map((text, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-text-dim">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-neon-cyan/20">
            <div className="text-xs text-neon-cyan font-medium mb-3 uppercase tracking-wider">
              Ta咋说 · {item.scenario}
            </div>
            <ul className="space-y-2">
              {item.after.map((text, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <Check size={14} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
