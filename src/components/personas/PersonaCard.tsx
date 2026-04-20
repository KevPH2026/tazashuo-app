'use client'

import { MessageCircle, Star } from 'lucide-react'
import PersonaAvatar from './PersonaAvatar'
import Link from 'next/link'

interface PersonaCardProps {
  persona: {
    id: string
    slug: string
    name: string
    avatar: string
    tag: string
    description: string
    stats: { conversations: number; rating: number }
    is_premium?: boolean
  }
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Link href={`/chat?persona=${persona.slug}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <PersonaAvatar letter={persona.avatar} slug={persona.slug} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white truncate">{persona.name}</h3>
              {persona.is_premium && (
                <span className="badge badge-pink text-[10px] px-2 py-0.5 shrink-0">
                  Pro
                </span>
              )}
            </div>
            <span className="badge text-[11px]">{persona.tag}</span>
          </div>
        </div>

        <p className="text-sm text-text-dim leading-relaxed mb-4 flex-1">
          {persona.description}
        </p>

        <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-1.5 text-xs text-text-dim">
            <MessageCircle size={13} className="text-neon-cyan" />
            <span>{persona.stats.conversations.toLocaleString()} 对话</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-dim">
            <Star size={13} className="text-neon-orange" />
            <span>{persona.stats.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
