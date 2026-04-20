'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

export default function LangSwitch() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')

  const switchPath = () => {
    if (isEn) {
      return pathname.replace(/^\/en/, '') || '/'
    }
    return `/en${pathname}`
  }

  const label = isEn ? 'EN / 中文' : '中文 / EN'

  return (
    <Link
      href={switchPath()}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-dim hover:text-neon-cyan hover:bg-[rgba(0,240,255,0.06)] border border-transparent hover:border-[rgba(0,240,255,0.15)] transition-all"
      title={isEn ? 'Switch to Chinese' : 'Switch to English'}
    >
      <Globe size={14} />
      <span>{label}</span>
    </Link>
  )
}
