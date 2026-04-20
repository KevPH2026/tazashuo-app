import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, materials, scopes } = body

    if (!name || !materials || !scopes) {
      return NextResponse.json(
        { error: 'Missing name, materials or scopes' },
        { status: 400 }
      )
    }

    const steps = [
      { status: 'analyzing', message: '分析材料中...', progress: 10 },
      { status: 'extracting', message: '提取核心思维模式...', progress: 30 },
      { status: 'modeling', message: '构建决策启发式...', progress: 50 },
      { status: 'refining', message: '钻取表达 DNA 与声音特征...', progress: 70 },
      { status: 'finalizing', message: '确立原则与边界...', progress: 90 },
      { status: 'completed', message: '蒸馏完成！', progress: 100 },
    ]

    const result = {
      id: `distill-${Date.now()}`,
      name,
      materials: Array.isArray(materials) ? materials : [materials],
      scopes: Array.isArray(scopes) ? scopes : [scopes],
      steps,
      created_at: new Date().toISOString(),
      skill: {
        mind_model: `基于${name}的材料提炼出的独特心智模式`,
        heuristic: `源自${name}的经典决策框架`,
        expression: `${name}独有的表达风格`,
        voice: `${name}的特色声音`,
        principle: `${name}的核心行为原则`,
        boundary: `${name}的讨论边界`,
      },
    }

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('POST /api/distill error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to distill persona' },
      { status: 500 }
    )
  }
}
