'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, FlaskConical, History, CreditCard, LogIn, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LangSwitch from '@/components/i18n/LangSwitch'

const navLinks = [
  { href: '/personas', label: '人物库', icon: Users },
  { href: '/distill', label: 'DNA提取工厂', icon: FlaskConical },
  { href: '/history', label: '历史', icon: History },
  { href: '/pricing', label: '定价', icon: CreditCard },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[rgba(5,5,8,0.7)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black gradient-text tracking-tight">
              Ta咋说
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    active
                      ? 'text-neon-cyan bg-[rgba(0,240,255,0.08)]'
                      : 'text-text-dim hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitch />
            <Link href="/login" className="btn btn-ghost text-sm px-4 py-2">
              <LogIn size={15} />
              登录
            </Link>
            <Link href="/chat" className="btn btn-primary text-sm px-4 py-2">
              开始对话
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[rgba(5,5,8,0.95)] backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    active
                      ? 'text-neon-cyan bg-[rgba(0,240,255,0.08)]'
                      : 'text-text-dim hover:text-white'
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center justify-center py-2">
                <LangSwitch />
              </div>
              <div className="flex gap-2">
                <Link href="/login" className="btn btn-ghost flex-1 text-sm" onClick={() => setMobileOpen(false)}>
                  <LogIn size={15} />
                  登录
                </Link>
                <Link href="/chat" className="btn btn-primary flex-1 text-sm" onClick={() => setMobileOpen(false)}>
                  开始对话
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
