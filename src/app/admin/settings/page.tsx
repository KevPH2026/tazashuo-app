'use client'

import { useEffect, useState } from 'react'
import { Save, Key, Bot, MessageCircle, DollarSign, Loader2 } from 'lucide-react'

interface ModelConfig {
  aiModel: 'claude' | 'openai'
  apiKey: string
  systemPrompt: string
  dailyFreeChats: number
  proPrice: number
}

const defaultConfig: ModelConfig = {
  aiModel: 'claude',
  apiKey: '',
  systemPrompt:
    'You are a persona simulator. You do not imitate surface tone. You extract and apply the underlying mental model, decision heuristic, expression DNA, and principles of the target person. Stay within their competence boundary. Use their characteristic voice and framing.',
  dailyFreeChats: 5,
  proPrice: 29,
}

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<ModelConfig>(defaultConfig)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('tazashuo_admin_config')
    if (stored) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(stored) })
      } catch {
        // ignore
      }
    }
  }, [])

  const handleChange = (field: keyof ModelConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    localStorage.setItem('tazashuo_admin_config', JSON.stringify(config))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-white">模型配置</h1>
        <p className="text-sm text-text-dim mt-1">配置 AI 模型参数、系统提示词与定价策略</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI Model */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Bot size={18} className="text-neon-cyan" />
            <h2 className="text-sm font-bold text-white">AI 模型选择</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">模型提供商</label>
              <select
                value={config.aiModel}
                onChange={(e) => handleChange('aiModel', e.target.value)}
                className="input text-sm"
              >
                <option value="claude">Claude (Anthropic)</option>
                <option value="openai">OpenAI (GPT)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">API Key</label>
              <div className="relative">
                <Key size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => handleChange('apiKey', e.target.value)}
                  placeholder="sk-..."
                  className="input pl-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Prompt */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={18} className="text-neon-pink" />
            <h2 className="text-sm font-bold text-white">系统提示词</h2>
          </div>
          <textarea
            value={config.systemPrompt}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            rows={8}
            className="input text-sm resize-none font-mono leading-relaxed"
          />
          <p className="text-[11px] text-text-muted mt-2">
            系统提示词将作为基础指令注入每次对话，指导 AI 如何扮演人物分身。
          </p>
        </div>

        {/* Pricing & Limits */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={18} className="text-neon-purple" />
            <h2 className="text-sm font-bold text-white">定价与限额</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                每日免费对话次数
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={config.dailyFreeChats}
                onChange={(e) => handleChange('dailyFreeChats', parseInt(e.target.value) || 0)}
                className="input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                Pro 定价 (¥/月)
              </label>
              <input
                type="number"
                min={0}
                value={config.proPrice}
                onChange={(e) => handleChange('proPrice', parseInt(e.target.value) || 0)}
                className="input text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            保存配置
          </button>
          {saved && <span className="text-xs text-neon-cyan font-medium">配置已保存</span>}
        </div>
      </form>
    </div>
  )
}
