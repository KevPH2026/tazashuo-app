'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, MessageCircle, ChevronRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import PersonaAvatar from '@/components/personas/PersonaAvatar'

interface Conversation {
  id: string
  title: string
  persona: {
    id: string
    slug: string
    name: string
    avatar: string
    tag: string
  }
  messages: { role: string; content: string }[]
  created_at: string
  updated_at: string
}

export default function HistoryPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/conversations')
      .then((res) => res.json())
      .then((data) => {
        setConversations(data.conversations || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">对话历史</h1>
            <p className="text-text-dim">回顾你与伟大思维的每一次碰撞</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-neon-cyan" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="card text-center py-16">
              <MessageCircle size={40} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">还没有对话</h3>
              <p className="text-text-dim mb-6">去人物库选择一个人物，开始你的第一次深度对话</p>
              <Link href="/personas" className="btn btn-primary">
                浏览人物库
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat?persona=${conv.persona?.slug || ''}`}
                  className="card flex items-center gap-4 group"
                >
                  <PersonaAvatar
                    letter={conv.persona?.avatar || '?'}
                    slug={conv.persona?.slug || 'unknown'}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-neon-cyan transition-colors">
                      {conv.title || '未命名对话'}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-text-dim">{conv.persona?.name || '未知人物'}</span>
                      <span className="text-xs text-text-muted">{conv.persona?.tag || ''}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-text-muted shrink-0">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {conv.messages?.length || 0} 条
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(conv.updated_at || conv.created_at)}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-text-muted group-hover:text-neon-cyan transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
