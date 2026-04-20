'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Brain, Sparkles, MessageSquare, ChevronRight } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import PersonaCard from '@/components/personas/PersonaCard'
import EnNavbar from '@/components/layout/EnNavbar'
import EnFooter from '@/components/layout/EnFooter'

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

export default function EnHomePage() {
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
      <EnNavbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.2)] text-neon-cyan text-xs font-medium mb-6">
              <Sparkles size={13} />
              AI Persona Mind-Framework Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="gradient-text">See What</span>
              <br />
              <span className="text-white relative inline-block">
                They'd Say
                <span
                  className="absolute -inset-1 animate-glitch opacity-30"
                  style={{ background: 'linear-gradient(90deg, #ff00a0, #00f0ff)', mixBlendMode: 'screen' }}
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto leading-relaxed mb-10">
              Enter a name. Let Jobs, Musk, Munger, Zhang Yiming work for you.
              <br className="hidden sm:block" />
              Not imitation. Mind framework extraction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/en/personas" className="btn btn-primary text-base px-8 py-3">
                <Zap size={18} />
                Start Free
                <ArrowRight size={16} />
              </Link>
              <Link href="/en/distill" className="btn btn-ghost text-base px-8 py-3">
                <Brain size={18} />
                Distill Your Persona
              </Link>
            </div>
          </div>
        </section>

        {/* Persona preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Persona Library</h2>
                <p className="text-text-dim mt-1">Tap any card to start a conversation</p>
              </div>
              <Link href="/en/personas" className="hidden sm:flex items-center gap-1 text-sm text-neon-cyan hover:underline">
                View All
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
              <Link href="/en/personas" className="inline-flex items-center gap-1 text-sm text-neon-cyan hover:underline">
                View All
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why TaZhaShuo?</h2>
              <p className="text-text-dim mt-2">Extract mind frameworks, not surface mimicry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                  <Brain size={24} className="text-neon-pink" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mind Framework Extraction</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  Each AI persona is built on real mental models, decision heuristics, and expression DNA—not just tone imitation.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Deep Conversation</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  More than a chatbot—a thinking partner that helps you analyze problems, make decisions, and see new angles.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-orange/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-neon-purple" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Custom Distillery</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  Upload articles, speeches, or books from someone you admire. The AI extracts their mental framework and builds a custom persona.
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
                Start Now
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Let Great Minds Work for You
              </h2>
              <p className="text-text-dim mb-6 max-w-lg mx-auto">
                Whether it's product decisions, investment analysis, or startup dilemmas—ask the right person the right question and answers emerge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/en/personas" className="btn btn-primary px-8 py-3">
                  Start Free
                </Link>
                <Link href="/en/pricing" className="btn btn-ghost px-8 py-3">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EnFooter />
    </div>
  )
}
