'use client'

import { useState } from 'react'
import { Upload, Loader2, CheckCircle, FlaskConical, FileText, Target, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'

const steps = [
  { icon: Upload, title: '上传材料', desc: '上传文章、讲话、书籍等原始材料' },
  { icon: Target, title: '定义范围', desc: '设定讨论范围和专业领域' },
  { icon: Sparkles, title: 'AI 蒸馏', desc: '系统自动提炼思维框架' },
]

export default function DistillPage() {
  const [name, setName] = useState('')
  const [materials, setMaterials] = useState('')
  const [scopes, setScopes] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Record<string, string> | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !materials.trim() || !scopes.trim()) return

    setLoading(true)
    setResult(null)
    setProgress(0)
    setCurrentStep(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const next = prev + Math.random() * 15
        if (next > 20) setCurrentStep(1)
        if (next > 60) setCurrentStep(2)
        if (next > 85) setCurrentStep(3)
        return Math.min(next, 90)
      })
    }, 400)

    try {
      const res = await fetch('/api/distill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          materials: materials.trim().split('\n').filter(Boolean),
          scopes: scopes.trim().split('\n').filter(Boolean),
        }),
      })
      const data = await res.json()

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep(3)
      setResult(data.result)
    } catch (_err) {
      clearInterval(progressInterval)
      setLoading(false)
    } finally {
      setTimeout(() => setLoading(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] relative">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,0,160,0.08)] border border-[rgba(255,0,160,0.2)] text-neon-pink text-xs font-medium mb-4">
              <FlaskConical size={13} />
              实验性功能
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">DNA提取工厂</h1>
            <p className="text-text-dim max-w-lg mx-auto">
              上传你崇拜人物的材料，AI 自动提炼出他们的心智模型、决策框架和表达 DNA，打造专属思维分身。
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const active = idx <= currentStep || result
              return (
                <div
                  key={idx}
                  className={`card flex flex-col items-center text-center ${
                    active ? 'border-neon-cyan/20' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      active
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : 'bg-[rgba(255,255,255,0.03)] text-text-muted'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-text-dim">{step.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Form */}
          {!result && (
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FileText size={14} className="inline mr-1.5 text-neon-cyan" />
                  人物名称
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如：雷军"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Upload size={14} className="inline mr-1.5 text-neon-cyan" />
                  材料内容（每行一条）
                </label>
                <textarea
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="粘贴文章、讲话、采访内容...
每行一条材料"
                  className="input min-h-[120px] resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Target size={14} className="inline mr-1.5 text-neon-cyan" />
                  讨论范围（每行一个）
                </label>
                <textarea
                  value={scopes}
                  onChange={(e) => setScopes(e.target.value)}
                  placeholder="产品经理
科技创业
团队管理"
                  className="input min-h-[80px] resize-y"
                  required
                />
              </div>

              {/* Progress */}
              {loading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-dim">正在蒸馏...</span>
                    <span className="text-neon-cyan font-mono">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    蒸馏中...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    开始蒸馏
                  </>
                )}
              </button>
            </form>
          )}

          {/* Result */}
          {result && (
            <div className="card space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">蒸馏完成！</h3>
                  <p className="text-sm text-text-dim">已为 {result.name} 构建思维分身</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(result.skill).map(([key, value]: [string, string]) => {
                  const labels: Record<string, string> = {
                    mind_model: '心智模型',
                    heuristic: '决策启发式',
                    expression: '表达 DNA',
                    voice: '声音特征',
                    principle: '核心原则',
                    boundary: '讨论边界',
                  }
                  return (
                    <div key={key} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-color)]">
                      <h4 className="text-xs font-bold text-neon-cyan uppercase tracking-wider mb-1">
                        {labels[key] || key}
                      </h4>
                      <p className="text-sm text-white">{value}</p>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => {
                  setResult(null)
                  setProgress(0)
                  setCurrentStep(0)
                  setName('')
                  setMaterials('')
                  setScopes('')
                }}
                className="btn btn-ghost w-full"
              >
                再次蒸馏
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
