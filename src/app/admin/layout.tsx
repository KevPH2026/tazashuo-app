'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Settings, ArrowLeft, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/personas', label: '人物管理', icon: Users },
  { href: '/admin/settings', label: '模型配置', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a12] border-r border-[var(--border-color)] flex flex-col shrink-0 fixed h-full z-30">
        <div className="px-5 py-5 border-b border-[var(--border-color)]">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 size={20} className="text-neon-pink" />
            <span className="text-lg font-black gradient-text tracking-tight">管理后台</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-[rgba(0,240,255,0.08)] text-neon-cyan border border-[rgba(0,240,255,0.15)]'
                    : 'text-text-dim hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[var(--border-color)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-dim hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all"
          >
            <ArrowLeft size={17} />
            返回主站
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
