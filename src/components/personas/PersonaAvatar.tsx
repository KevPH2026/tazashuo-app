'use client'

import { cn } from '@/lib/utils'

interface PersonaAvatarProps {
  letter: string
  slug: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const avatarConfig: Record<string, { from: string; to: string; glow: string }> = {
  jobs: { from: '#ff00a0', to: '#8b5cf6', glow: 'rgba(255,0,160,0.4)' },
  musk: { from: '#00f0ff', to: '#3b82f6', glow: 'rgba(0,240,255,0.4)' },
  munger: { from: '#8b5cf6', to: '#4f46e5', glow: 'rgba(139,92,246,0.4)' },
  feynman: { from: '#22c55e', to: '#00f0ff', glow: 'rgba(34,197,94,0.4)' },
  naval: { from: '#f59e0b', to: '#ff6b35', glow: 'rgba(245,158,11,0.4)' },
  zhangyiming: { from: '#3b82f6', to: '#8b5cf6', glow: 'rgba(59,130,246,0.4)' },
}

export default function PersonaAvatar({ letter, slug, size = 'md', className }: PersonaAvatarProps) {
  const config = avatarConfig[slug] || { from: '#8b5cf6', to: '#ff00a0', glow: 'rgba(139,92,246,0.4)' }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl',
  }

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-bold text-white shrink-0',
        sizeClasses[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${config.from}, ${config.to})`,
        boxShadow: `0 0 20px ${config.glow}, 0 0 40px ${config.glow}`,
      }}
    >
      {letter.toUpperCase()}
    </div>
  )
}
