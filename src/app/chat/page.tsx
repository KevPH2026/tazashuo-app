'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ParticleBackground from '@/components/ui/ParticleBackground'
import ChatInterface from '@/components/chat/ChatInterface'
import PersonaAvatar from '@/components/personas/PersonaAvatar'
import { Loader2, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface Persona {
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

function ChatContent() {
  const searchParams = useSearchParams()
  const personaSlug = searchParams.get('persona')

  const [personas, setPersonas] = useState<Persona[]>([])
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/personas')
      .then((res) => res.json())
      .then((data) => {
        const list = data.personas || []
        setPersonas(list)
        if (personaSlug) {
          const found = list.find((p: Persona) => p.slug === personaSlug)
          if (found) setSelectedPersona(found)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [personaSlug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 size={28} className="animate-spin text-neon-cyan" />
      </div>
    )
  }

  if (!selectedPersona) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <MessageSquare size={48} className="mx-auto text-neon-cyan mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">选择一位人物开始对话</h2>
            <p className="text-text-dim mb-8">从以下人物中选择，或前往人物库查看全部</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p)}
                  className="card flex flex-col items-center gap-3 hover:border-neon-cyan/30 transition-all"
                >
                  <PersonaAvatar letter={p.avatar} slug={p.slug} size="lg" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <span className="text-xs text-text-dim">{p.tag}</span>
                  </div>
                </button>
              ))}
            </div>

            <Link href="/personas" className="btn btn-ghost mt-8 inline-flex">
              查看全部人物
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ChatInterface
      persona={selectedPersona}
      onBack={() => setSelectedPersona(null)}
    />
  )
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <Loader2 size={28} className="animate-spin text-neon-cyan" />
          </div>
        }
      >
        <ChatContent />
      </Suspense>
      {/* Footer hidden in chat for space, but keep structure */}
    </div>
  )
}
