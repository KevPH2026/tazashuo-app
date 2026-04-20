'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Brain, Sparkles, ChevronRight, Play } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import PersonaCard from '@/components/personas/PersonaCard'
import ChatDemo from '@/components/showcase/ChatDemo'
import ConversationCases from '@/components/showcase/ConversationCases'
import PersonaShowcase from '@/components/showcase/PersonaShowcase'
import UseCases from '@/components/showcase/UseCases'
import BeforeAfter from '@/components/showcase/BeforeAfter'
import StatsCounter from '@/components/showcase/StatsCounter'

interface Persona {
  id: string
  slug: string
  name: string
  avatar: string
  tag: string
  description: string
  stats: { conversations: number; rating: number }
  is_premium?: boolean
}

export default function HomePage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/personas')
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data.personas?.slice(0, 4) || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.2)] text-neon-cyan text-xs font-medium mb-6">
              <Sparkles size={13} />
              AI 人物思维分身平台
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="gradient-text">看看他</span>
              <br />
              <span className="text-white relative inline-block">
                会怎么说
                <span
                  className="absolute -inset-1 animate-glitch opacity-30"
                  style={{ background: 'linear-gradient(90deg, #ff00a0, #00f0ff)', mixBlendMode: 'screen' }}
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto leading-relaxed mb-10">
              输入一个人名，让乔布斯、马斯克、芒格、张一鸣给你打工。
              <br className="hidden sm:block" />
              不是模仿，是提炼思维框架。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/personas" className="btn btn-primary text-base px-8 py-3">
                <Zap size={18} />
                选择人物开始对话
                <ArrowRight size={16} />
              </Link>
              <Link href="/distill" className="btn btn-ghost text-base px-8 py-3">
                <Brain size={18} />
                创建专属分身
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                6位思维分身
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                免费体验
              </span>
            </div>
          </div>
        </section>

        {/* Live Chat Demo */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-neon-pink text-xs font-medium mb-3">
                <Play size={12} />
                实时演示
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">和乔布斯对话是什么体验？</h2>
              <p className="text-text-dim mt-2">不是搜索答案，是让伟大思维帮你思考</p>
            </div>
            <ChatDemo />
          </div>
        </section>

        {/* Conversation Cases */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">精选对话案例</h2>
              <p className="text-text-dim mt-2">真实用户与AI分身的深度交流</p>
            </div>
            <ConversationCases />
          </div>
        </section>

        {/* Persona Showcase */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">他们能帮你什么？</h2>
              <p className="text-text-dim mt-2">每个人物都有独特的思维超能力</p>
            </div>
            <PersonaShowcase />
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">谁在用 Ta咋说？</h2>
              <p className="text-text-dim mt-2">不同角色，不同场景，都能找到对的思维伙伴</p>
            </div>
            <UseCases />
          </div>
        </section>

        {/* Before/After */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">传统方式 vs Ta咋说</h2>
              <p className="text-text-dim mt-2">不是更快搜索，是更深思考</p>
            </div>
            <BeforeAfter />
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">数据说话</h2>
              <p className="text-text-dim mt-2">每一个数字背后都是一次深度思维碰撞</p>
            </div>
            <StatsCounter />
          </div>
        </section>

        {/* Persona preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">热门人物</h2>
                <p className="text-text-dim mt-1">点击任意卡片，立即开始对话</p>
              </div>
              <Link href="/personas" className="hidden sm:flex items-center gap-1 text-sm text-neon-cyan hover:underline">
                查看全部
                <ChevronRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="card h-48 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {personas.map((persona) => (
                  <PersonaCard key={persona.id} persona={persona} />
                ))}
              </div>
            )}

            <div className="mt-6 text-center sm:hidden">
              <Link href="/personas" className="inline-flex items-center gap-1 text-sm text-neon-cyan hover:underline">
                查看全部
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">为什么选择 Ta咋说？</h2>
              <p className="text-text-dim mt-2">提炼思维框架，而非模仿表皮</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                  <Brain size={24} className="text-neon-pink" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">思维框架提炼</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  每个AI分身都基于真实人物的心智模型、决策启发式和表达DNA构建，不是简单的语气模仿。
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">深度对话体验</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  不仅是聊天机器人，而是能帮你分析问题、做出决策、提供全新视角的思维伙伴。
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-orange/20 flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-neon-purple" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">打造专属分身</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  上传你崇拜的人物的文章、讲话、书籍，AI自动分析并构建他们的思维框架，打造专属分身。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="card relative overflow-visible">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-pink text-white text-xs font-bold rounded-full">
                立即开始
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                让伟大思维为你打工
              </h2>
              <p className="text-text-dim mb-6 max-w-lg mx-auto">
                无论是产品决策、投资分析，还是创业路上的困惑，找对人问对问题，答案自然浮现。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/personas" className="btn btn-primary px-8 py-3">
                  免费体验
                </Link>
                <Link href="/pricing" className="btn btn-ghost px-8 py-3">
                  查看定价
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
