'use client'

import { Check, Zap, Crown, Rocket } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'

const plans = [
  {
    name: '免费',
    icon: Zap,
    price: '0',
    period: '/月',
    desc: '适合偶尔体验',
    features: [
      '每日 5 次对话',
      '访问全部基础人物',
      '基础对话历史',
      '标准响应速度',
    ],
    cta: '开始使用',
    popular: false,
    gradient: 'from-neon-cyan to-neon-purple',
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '29',
    period: '/月',
    desc: '适合深度用户',
    features: [
      '无限次对话',
      '访问全部高级人物',
      '完整对话历史',
      '优先响应速度',
      '导出对话记录',
      '自定义蒸馏功能',
    ],
    cta: '升级 Pro',
    popular: true,
    gradient: 'from-neon-pink to-neon-purple',
  },
  {
    name: '团队',
    icon: Rocket,
    price: '99',
    period: '/月',
    desc: '适合小团队',
    features: [
      '5 个团队成员',
      '无限次对话',
      '访问全部高级人物',
      'API 访问权限',
      '定制人物蒸馏',
      '企业级支持',
    ],
    cta: '联系销售',
    popular: false,
    gradient: 'from-neon-orange to-neon-pink',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">选择你的方案</h1>
            <p className="text-text-dim max-w-lg mx-auto">
              从免费体验到无限对话，选择最适合你的方案，让伟大思维为你工作。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.name}
                  className={`card relative flex flex-col ${
                    plan.popular ? 'border-neon-pink/30 ring-1 ring-neon-pink/10' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-neon-pink to-neon-purple text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                      最受欢迎
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-text-dim mt-1">{plan.desc}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-black text-white">¥{plan.price}</span>
                    <span className="text-text-dim text-sm">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <Check size={15} className="text-neon-cyan shrink-0 mt-0.5" />
                        <span className="text-text-dim">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`btn w-full ${
                      plan.popular ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-text-muted">
              所有方案均可随时取消。支付安全由第三方支付平台保障。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
