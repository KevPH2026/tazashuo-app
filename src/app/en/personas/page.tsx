'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Loader2 } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import PersonaCard from '@/components/personas/PersonaCard'
import EnNavbar from '@/components/layout/EnNavbar'
import EnFooter from '@/components/layout/EnFooter'

interface Persona {
  id: string
  slug: string
  name: string
  name_en: string
  avatar: string
  tag_en: string
  description_en: string
  stats: { conversations: number; rating: number }
  is_premium?: boolean
}

const tags = ['All', 'Product', 'Tech', 'Investing', 'Science', 'Startup', 'Management']

export default function EnPersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

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
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.description_en.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || p.tag_en?.includes(activeTag)
    return matchSearch && matchTag
  })

  const displayPersonas = filtered.map((p) => ({
    ...p,
    name: p.name_en,
    tag: p.tag_en,
    description: p.description_en,
  }))

  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <EnNavbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Persona Library</h1>
            <p className="text-text-dim max-w-xl mx-auto">
              Choose a mindset that interests you and start a deep conversation. Each persona is carefully distilled—not just tone mimicry, but decision framework restoration.
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
                placeholder="Search personas..."
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
          ) : displayPersonas.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-dim">No personas found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayPersonas.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} />
              ))}
            </div>
          )}
        </div>
      </main>

      <EnFooter />
    </div>
  )
}
