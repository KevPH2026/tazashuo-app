'use client'

import { Check, Zap, Crown, Rocket } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import EnNavbar from '@/components/layout/EnNavbar'
import EnFooter from '@/components/layout/EnFooter'

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '0',
    period: '/mo',
    desc: 'For casual exploration',
    features: [
      '5 conversations per day',
      'Access all basic personas',
      'Basic chat history',
      'Standard response speed',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-neon-cyan to-neon-purple',
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '29',
    period: '/mo',
    desc: 'For power users',
    features: [
      'Unlimited conversations',
      'Access all premium personas',
      'Full chat history',
      'Priority response speed',
      'Export conversation logs',
      'Custom distillation',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    gradient: 'from-neon-pink to-neon-purple',
  },
  {
    name: 'Team',
    icon: Rocket,
    price: '99',
    period: '/mo',
    desc: 'For small teams',
    features: [
      '5 team members',
      'Unlimited conversations',
      'Access all premium personas',
      'API access',
      'Custom persona distillation',
      'Enterprise support',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-neon-orange to-neon-pink',
  },
]

export default function EnPricingPage() {
  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <EnNavbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Pricing</h1>
            <p className="text-text-dim max-w-lg mx-auto">
              From free exploration to unlimited conversations. Pick the plan that fits you and let great minds work for you.
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
                      Most Popular
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
                    <span className="text-4xl font-black text-white">${plan.price}</span>
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
              All plans can be cancelled anytime. Payments are secured by third-party processors.
            </p>
          </div>
        </div>
      </main>

      <EnFooter />
    </div>
  )
}
