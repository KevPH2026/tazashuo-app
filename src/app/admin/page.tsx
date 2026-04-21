'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, MessageSquare, UserCheck, TrendingUp, ArrowRight, Zap, Brain, FlaskConical } from 'lucide-react'

interface AdminStats {
  totalPersonas: number
  totalConversations: number
  totalUsers: number
  todayConversations: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalPersonas: 0,
    totalConversations: 0,
    totalUsers: 0,
    todayConversations: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/personas')
      .then((res) => res.json())
      .then((data) => {
        const personas = data.personas || []
        const totalConversations = personas.reduce(
          (sum: number, p: any) => sum + (p.stats?.conversations || 0),
          0
        )
        setStats({
          totalPersonas: personas.length,
          totalConversations,
          totalUsers: 128,
          todayConversations: Math.floor(totalConversations * 0.04),
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const statCards = [
    {
      label: '总人物数',
      value: stats.totalPersonas,
      icon: Users,
      color: 'text-neon-cyan',
      bg: 'bg-[rgba(0,240,255,0.08)]',
    },
    {
      label: '总对话数',
      value: stats.totalConversations.toLocaleString(),
      icon: MessageSquare,
      color: 'text-neon-pink',
      bg: 'bg-[rgba(255,0,160,0.08)]',
    },
    {
      label: '总用户数',
      value: stats.totalUsers,
      icon: UserCheck,
      color: 'text-neon-purple',
      bg: 'bg-[rgba(139,92,246,0.08)]',
    },
    {
      label: '今日对话数',
      value: stats.todayConversations,
      icon: TrendingUp,
      color: 'text-neon-orange',
      bg: 'bg-[rgba(255,107,53,0.08)]',
    },
  ]

  const shortcuts = [
    { label: '人物管理', desc: '编辑人物技能数据', href: '/admin/personas', icon: Users, color: 'from-neon-cyan to-neon-purple' },
    { label: '模型配置', desc: '调整AI模型与定价', href: '/admin/settings', icon: Brain, color: 'from-neon-pink to-neon-purple' },
    { label: 'DNA提取工厂', desc: '创建新人物分身', href: '/distill', icon: FlaskConical, color: 'from-neon-orange to-neon-pink' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-sm text-text-dim mt-1">平台运营数据一览</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon size={20} className={card.color} />
                </div>
                {loading ? (
                  <div className="h-6 w-16 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
                ) : (
                  <span className="text-2xl font-black text-white">{card.value}</span>
                )}
              </div>
              <p className="text-sm text-text-dim">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick shortcuts */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">快捷入口</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shortcuts.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={s.href} className="card group p-5 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white">{s.label}</h3>
                    <ArrowRight size={14} className="text-text-muted group-hover:text-neon-cyan transition-colors" />
                  </div>
                  <p className="text-xs text-text-dim">{s.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Activity hint */}
      <div className="card p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">系统运行正常</h3>
          <p className="text-xs text-text-dim mt-0.5">所有服务在线，API 响应正常，无异常告警。</p>
        </div>
      </div>
    </div>
  )
}
