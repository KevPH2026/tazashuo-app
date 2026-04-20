'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import PersonaCard from '@/components/personas/PersonaCard'

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

const tags = ['全部', '产品', '科技', '投资', '科学', '创业', '管理']

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('全部')

  useEffect(() => {
    fetch('/api/personas')
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data.personas || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = personas.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === '全部' || p.tag.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">人物库</h1>
            <p className="text-text-dim max-w-xl mx-auto">
              选择你感兴趣的思维方式，开始一场深度对话。每个人物都经过精心提炼，不只是模仿语气，而是还原决策框架。
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索人物..."
                className="input pl-9"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <Filter size={14} className="text-text-muted shrink-0" />
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeTag === tag
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                      : 'bg-transparent text-text-dim border border-[var(--border-color)] hover:border-neon-cyan/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-neon-cyan" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-dim">未找到匹配的人物</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
