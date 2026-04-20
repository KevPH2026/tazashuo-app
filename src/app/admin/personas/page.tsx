'use client'

import { useEffect, useState } from 'react'
import { Search, Edit2, Save, X, Loader2 } from 'lucide-react'

interface PersonaSkill {
  id: string
  slug: string
  name: string
  name_en: string
  avatar: string
  tag: string
  mind_model: string
  heuristic: string
  expression: string
  voice: string
  principle: string
  boundary: string
}

const skillFields: { key: keyof PersonaSkill; label: string }[] = [
  { key: 'mind_model', label: '心智模型 (mind_model)' },
  { key: 'heuristic', label: '决策启发式 (heuristic)' },
  { key: 'expression', label: '表达风格 (expression)' },
  { key: 'voice', label: '语气特征 (voice)' },
  { key: 'principle', label: '核心原则 (principle)' },
  { key: 'boundary', label: '边界约束 (boundary)' },
]

export default function AdminPersonasPage() {
  const [personas, setPersonas] = useState<PersonaSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<PersonaSkill>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/personas')
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data.personas || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = personas.filter((p) => {
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.name_en.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    )
  })

  const startEdit = (p: PersonaSkill) => {
    setEditingSlug(p.slug)
    setEditForm({
      mind_model: p.mind_model,
      heuristic: p.heuristic,
      expression: p.expression,
      voice: p.voice,
      principle: p.principle,
      boundary: p.boundary,
    })
  }

  const cancelEdit = () => {
    setEditingSlug(null)
    setEditForm({})
  }

  const handleSave = async (slug: string) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/personas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          skillData: {
            mind_model: editForm.mind_model,
            heuristic: editForm.heuristic,
            expression: editForm.expression,
            voice: editForm.voice,
            principle: editForm.principle,
            boundary: editForm.boundary,
          },
        }),
      })
      if (!res.ok) throw new Error('Save failed')
      const data = await res.json()
      setPersonas((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, ...data.persona } : p))
      )
      setEditingSlug(null)
      setEditForm({})
    } catch (err) {
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">人物管理</h1>
          <p className="text-sm text-text-dim mt-1">管理所有 AI 人物的技能数据与思维框架</p>
        </div>
        <div className="relative max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索人物..."
            className="input pl-9 text-sm py-2"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-neon-cyan" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => {
            const isEditing = editingSlug === p.slug
            return (
              <div
                key={p.slug}
                className={`card p-0 overflow-hidden transition-all ${
                  isEditing ? 'border-neon-cyan/30 ring-1 ring-neon-cyan/10' : ''
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-white text-sm font-bold">
                      {p.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="text-xs text-text-muted">{p.name_en}</span>
                      </div>
                      <span className="badge text-[10px] py-0.5 px-2 mt-0.5">{p.tag}</span>
                    </div>
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSave(p.slug)}
                          disabled={saving}
                          className="btn btn-primary text-xs px-3 py-1.5"
                        >
                          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                          保存
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn btn-ghost text-xs px-3 py-1.5"
                        >
                          <X size={13} />
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="btn btn-ghost text-xs px-3 py-1.5"
                      >
                        <Edit2 size={13} />
                        编辑
                      </button>
                    )}
                  </div>
                </div>

                {/* Skills grid */}
                <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-[11px] font-medium text-text-dim mb-1.5 uppercase tracking-wide">
                        {field.label}
                      </label>
                      {isEditing ? (
                        <textarea
                          value={(editForm[field.key] as string) || ''}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                          rows={3}
                          className="input text-xs resize-none"
                        />
                      ) : (
                        <div className="text-sm text-text-dim leading-relaxed bg-[rgba(255,255,255,0.02)] rounded-lg px-3 py-2 min-h-[4.5rem]">
                          {(p[field.key] as string) || <span className="text-text-muted italic">未设置</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-dim text-sm">未找到匹配的人物</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
