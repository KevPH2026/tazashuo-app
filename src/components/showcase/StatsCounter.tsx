'use client'

import { useEffect, useState } from 'react'

const stats = [
  { value: 6, suffix: '', label: '人物分身', sub: '持续增长中' },
  { value: 12000, suffix: '+', label: '累计对话', sub: '次深度交流' },
  { value: 98, suffix: '%', label: '用户满意度', sub: '认为“有启发”' },
  { value: 50, suffix: '+', label: '精华案例', sub: '收录对话金句' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl sm:text-4xl font-black gradient-text">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="card text-center py-6">
          <AnimatedNumber value={s.value} suffix={s.suffix} />
          <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
          <div className="text-xs text-text-dim mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
