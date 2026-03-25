import { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import './App.css'

type Grade = 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B'

type Enterprise = {
  id: string
  name: string
  industry: string
  industryCategory: '新能源汽车' | '半导体' | '生物医药' | '低空经济' | '高端装备制造' | '未来产业' | '传统制造业'
  rdIntensity: number
  rdPersonnelRatio: number
  rdCapitalizationRate: number
  patentCount: number
  inventionPatentRatio: number
  newProductRevenueRatio: number
  intangibleAssetsRatio: number
  equipmentNewness: number
  revenueCAGR: number
  grossMarginTrend: number
  cashFlowHealth: number
  newQualityScore?: number
  grade?: Grade
  repaymentCapacity?: '高' | '中' | '低'
  note?: string
}

const sourceData: Enterprise[] = [
  {
    id: '1',
    name: '宁德时代',
    industry: '新能源电池',
    industryCategory: '新能源汽车',
    rdIntensity: 6.5,
    rdPersonnelRatio: 18,
    rdCapitalizationRate: 42,
    patentCount: 5000,
    inventionPatentRatio: 75,
    newProductRevenueRatio: 28,
    intangibleAssetsRatio: 15,
    equipmentNewness: 0.72,
    revenueCAGR: 25,
    grossMarginTrend: 2,
    cashFlowHealth: 22,
  },
  {
    id: '2',
    name: '比亚迪',
    industry: '整车+电池',
    industryCategory: '新能源汽车',
    rdIntensity: 5.5,
    rdPersonnelRatio: 15,
    rdCapitalizationRate: 39,
    patentCount: 4000,
    inventionPatentRatio: 65,
    newProductRevenueRatio: 26,
    intangibleAssetsRatio: 12,
    equipmentNewness: 0.68,
    revenueCAGR: 30,
    grossMarginTrend: 1.5,
    cashFlowHealth: 18,
  },
  {
    id: '3',
    name: '中芯国际',
    industry: '半导体',
    industryCategory: '半导体',
    rdIntensity: 12,
    rdPersonnelRatio: 35,
    rdCapitalizationRate: 45,
    patentCount: 2000,
    inventionPatentRatio: 85,
    newProductRevenueRatio: 24,
    intangibleAssetsRatio: 25,
    equipmentNewness: 0.65,
    revenueCAGR: 18,
    grossMarginTrend: 1,
    cashFlowHealth: 15,
  },
  {
    id: '4',
    name: '信达生物',
    industry: '生物制药',
    industryCategory: '生物医药',
    rdIntensity: 45,
    rdPersonnelRatio: 60,
    rdCapitalizationRate: 80,
    patentCount: 500,
    inventionPatentRatio: 95,
    newProductRevenueRatio: 30,
    intangibleAssetsRatio: 40,
    equipmentNewness: 0.55,
    revenueCAGR: 40,
    grossMarginTrend: 5,
    cashFlowHealth: -10,
  },
  {
    id: '5',
    name: '峰飞航空',
    industry: 'eVTOL',
    industryCategory: '低空经济',
    rdIntensity: 70,
    rdPersonnelRatio: 75,
    rdCapitalizationRate: 12,
    patentCount: 200,
    inventionPatentRatio: 90,
    newProductRevenueRatio: 15,
    intangibleAssetsRatio: 60,
    equipmentNewness: 0.45,
    revenueCAGR: 120,
    grossMarginTrend: 0,
    cashFlowHealth: -200,
    note: '高潜力高风险',
  },
  {
    id: '6',
    name: '大疆创新',
    industry: '无人机',
    industryCategory: '低空经济',
    rdIntensity: 18,
    rdPersonnelRatio: 40,
    rdCapitalizationRate: 52,
    patentCount: 800,
    inventionPatentRatio: 70,
    newProductRevenueRatio: 32,
    intangibleAssetsRatio: 18,
    equipmentNewness: 0.62,
    revenueCAGR: 35,
    grossMarginTrend: 2,
    cashFlowHealth: 8,
  },
  {
    id: '7',
    name: '传统汽车零部件',
    industry: '传统制造',
    industryCategory: '传统制造业',
    rdIntensity: 1.5,
    rdPersonnelRatio: 5,
    rdCapitalizationRate: 8,
    patentCount: 50,
    inventionPatentRatio: 10,
    newProductRevenueRatio: 5,
    intangibleAssetsRatio: 3,
    equipmentNewness: 0.45,
    revenueCAGR: -2,
    grossMarginTrend: -1,
    cashFlowHealth: 12,
  },
  {
    id: '8',
    name: '煤化工企业',
    industry: '高污染重工业',
    industryCategory: '传统制造业',
    rdIntensity: 0.8,
    rdPersonnelRatio: 3,
    rdCapitalizationRate: 5,
    patentCount: 20,
    inventionPatentRatio: 5,
    newProductRevenueRatio: 2,
    intangibleAssetsRatio: 2,
    equipmentNewness: 0.38,
    revenueCAGR: -5,
    grossMarginTrend: -3,
    cashFlowHealth: 8,
  },
  {
    id: '9',
    name: '绿氢初创',
    industry: '氢能',
    industryCategory: '未来产业',
    rdIntensity: 55,
    rdPersonnelRatio: 65,
    rdCapitalizationRate: 35,
    patentCount: 100,
    inventionPatentRatio: 85,
    newProductRevenueRatio: 20,
    intangibleAssetsRatio: 35,
    equipmentNewness: 0.52,
    revenueCAGR: 80,
    grossMarginTrend: 1,
    cashFlowHealth: -50,
  },
  {
    id: '10',
    name: '埃斯顿自动化',
    industry: '工业机器人',
    industryCategory: '高端装备制造',
    rdIntensity: 12,
    rdPersonnelRatio: 30,
    rdCapitalizationRate: 45,
    patentCount: 400,
    inventionPatentRatio: 60,
    newProductRevenueRatio: 33,
    intangibleAssetsRatio: 12,
    equipmentNewness: 0.7,
    revenueCAGR: 22,
    grossMarginTrend: 1.2,
    cashFlowHealth: 14,
  },
  {
    id: '11',
    name: '传统纺织企业',
    industry: '传统制造',
    industryCategory: '传统制造业',
    rdIntensity: 0.5,
    rdPersonnelRatio: 2,
    rdCapitalizationRate: 3,
    patentCount: 5,
    inventionPatentRatio: 0,
    newProductRevenueRatio: 1,
    intangibleAssetsRatio: 1,
    equipmentNewness: 0.35,
    revenueCAGR: -8,
    grossMarginTrend: -2,
    cashFlowHealth: 5,
  },
  {
    id: '12',
    name: '量子计算初创',
    industry: '量子科技',
    industryCategory: '未来产业',
    rdIntensity: 85,
    rdPersonnelRatio: 90,
    rdCapitalizationRate: 25,
    patentCount: 50,
    inventionPatentRatio: 100,
    newProductRevenueRatio: 10,
    intangibleAssetsRatio: 45,
    equipmentNewness: 0.48,
    revenueCAGR: 0,
    grossMarginTrend: 0,
    cashFlowHealth: -300,
  },
]

const gradeFromScore = (score: number): Grade => {
  if (score >= 85) return 'AAA'
  if (score >= 70) return 'AA'
  if (score >= 60) return 'A'
  if (score >= 50) return 'BBB'
  if (score >= 40) return 'BB'
  return 'B'
}

const repaymentCapacityFromCashFlow = (e: Enterprise): '高' | '中' | '低' => {
  if (e.cashFlowHealth >= 15 && e.revenueCAGR >= 10) return '高'
  if (e.cashFlowHealth > 0) return '中'
  return '低'
}

const gradeColorMap: Record<Grade, string> = {
  AAA: 'bg-eco text-white',
  AA: 'bg-lime-500 text-white',
  A: 'bg-emerald-500 text-white',
  BBB: 'bg-sky-600 text-white',
  BB: 'bg-warning text-white',
  B: 'bg-danger text-white',
}

const riskGridInfo: Record<string, { label: string; tool: string; rate: string; factor: string }> = {
  '高-高': { label: '核心战略客户', tool: '综合授信+产业基金+投贷联动', rate: 'LPR-50~100BP', factor: '1.5-2.0倍' },
  '高-中': { label: '稳健型客户', tool: '流动资金贷款+票据贴现', rate: 'LPR-0~50BP', factor: '1.0-1.2倍' },
  '高-低': { label: '现金牛客户', tool: '现金管理+理财+并购支持', rate: '协商定价', factor: '视现金流而定' },
  '中-高': { label: '成长型客户', tool: '知识产权质押贷+科创贷款', rate: 'LPR-0~50BP', factor: '1.0-1.5倍' },
  '中-中': { label: '常规客户', tool: '标准信贷产品', rate: 'LPR+0~100BP', factor: '0.8-1.0倍' },
  '中-低': { label: '收缩型客户', tool: '存量回收，不新增', rate: 'LPR+100~200BP', factor: '0.5倍以内' },
  '低-高': { label: '高潜力高风险客户', tool: '股权融资为主+认股权贷款', rate: 'LPR+50~150BP', factor: '0.5-1.0倍' },
  '低-中': { label: '关注类客户', tool: '存量维持+压降+加强贷后', rate: 'LPR+100~200BP', factor: '0.5倍以内' },
  '低-低': { label: '退出类客户', tool: '制定退出计划+不良处置', rate: '不适用', factor: '0' },
}

const getChainData = (chain: '新能源汽车' | '低空经济' | '半导体') => {
  if (chain === '新能源汽车') {
    return {
      nodes: [
        { id: '宁德时代', symbolSize: 36, category: 0 },
        { id: '比亚迪', symbolSize: 26, category: 0 },
        { id: '中芯国际', symbolSize: 20, category: 1 },
        { id: '供应A', symbolSize: 16, category: 2 },
        { id: '供应B', symbolSize: 16, category: 2 },
      ],
      links: [
        { source: '宁德时代', target: '比亚迪', value: 120 },
        { source: '宁德时代', target: '供应A', value: 80 },
        { source: '比亚迪', target: '供应B', value: 60 },
      ],
    }
  }
  if (chain === '低空经济') {
    return {
      nodes: [
        { id: '峰飞航空', symbolSize: 34, category: 0 },
        { id: '大疆创新', symbolSize: 28, category: 0 },
        { id: '供应C', symbolSize: 16, category: 2 },
        { id: '供应D', symbolSize: 16, category: 2 },
      ],
      links: [
        { source: '峰飞航空', target: '大疆创新', value: 50 },
        { source: '峰飞航空', target: '供应C', value: 40 },
        { source: '大疆创新', target: '供应D', value: 70 },
      ],
    }
  }
  return {
    nodes: [
      { id: '中芯国际', symbolSize: 38, category: 0 },
      { id: '埃斯顿自动化', symbolSize: 26, category: 1 },
      { id: '供应E', symbolSize: 16, category: 2 },
      { id: '供应F', symbolSize: 16, category: 2 },
    ],
    links: [
      { source: '中芯国际', target: '埃斯顿自动化', value: 110 },
      { source: '中芯国际', target: '供应E', value: 70 },
      { source: '埃斯顿自动化', target: '供应F', value: 55 },
    ],
  }
}

const App = () => {
  const [activePage, setActivePage] = useState<'dashboard' | '评分中心' | '风险矩阵' | '产业协同' | '政策建议'>('dashboard')
  const [industryFilter, setIndustryFilter] = useState<string>('全部')
  const [gradeFilter, setGradeFilter] = useState<string>('全部')
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null)
  const [newCompany, setNewCompany] = useState<Partial<Enterprise>>({})
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [supportBoost, setSupportBoost] = useState<number>(0)
  const [chain, setChain] = useState<'新能源汽车' | '低空经济' | '半导体'>('新能源汽车')

  const baseStats = useMemo(() => {
    return sourceData.reduce(
      (acc, c) => {
        ;(Object.keys(c) as Array<keyof Enterprise>).forEach((key) => {
          if (typeof c[key] === 'number' && key !== 'newQualityScore') {
            const value = c[key] as number
            if (acc[key] == null) acc[key] = { min: value, max: value }
            if (value < acc[key]!.min) acc[key]!.min = value
            if (value > acc[key]!.max) acc[key]!.max = value
          }
        })
        return acc
      },
      {} as Record<string, { min: number; max: number }>,
    )
  }, [])

  const normalized = (field: keyof Enterprise, value: number) => {
    const stat = baseStats[field]
    if (!stat) return 0
    if (stat.max === stat.min) return 1
    if (field === 'equipmentNewness') return Math.min(Math.max(value, 0), 1)
    if (field === 'revenueCAGR') {
      const norm = (value - stat.min) / (stat.max - stat.min)
      return norm
    }
    if (field === 'grossMarginTrend' || field === 'cashFlowHealth') {
      return (value - stat.min) / (stat.max - stat.min)
    }
    if (field === 'patentCount') return (value - stat.min) / (stat.max - stat.min)
    return Math.min(Math.max(value / stat.max, 0), 1)
  }

  const enterprises = useMemo<Enterprise[]>(() => {
    return sourceData.map((e) => {
      const rdIntensity = normalized('rdIntensity', e.rdIntensity + supportBoost)
      const rdPersonnelRatio = normalized('rdPersonnelRatio', e.rdPersonnelRatio)
      const rdCapitalizationRate = normalized('rdCapitalizationRate', e.rdCapitalizationRate)

      const patentCount = normalized('patentCount', e.patentCount)
      const inventionPatentRatio = normalized('inventionPatentRatio', e.inventionPatentRatio)
      const newProductRevenueRatio = normalized('newProductRevenueRatio', e.newProductRevenueRatio)

      const intangibleAssetsRatio = normalized('intangibleAssetsRatio', e.intangibleAssetsRatio)
      const equipmentNewness = normalized('equipmentNewness', e.equipmentNewness)

      const revenueCAGR = normalized('revenueCAGR', e.revenueCAGR)
      const grossMarginTrend = normalized('grossMarginTrend', e.grossMarginTrend)
      const cashFlowHealth = normalized('cashFlowHealth', e.cashFlowHealth)

      const innovationInput = rdIntensity * 0.4 + rdPersonnelRatio * 0.3 + rdCapitalizationRate * 0.3
      const innovationOutput = patentCount * 0.5 + inventionPatentRatio * 0.3 + newProductRevenueRatio * 0.2
      const assetStructure = intangibleAssetsRatio * 0.5 + equipmentNewness * 0.5
      const growthMomentum = revenueCAGR * 0.4 + grossMarginTrend * 0.3 + cashFlowHealth * 0.3

      const score = Math.round((innovationInput * 30 + innovationOutput * 30 + assetStructure * 20 + growthMomentum * 20) * 100) / 100
      const grade = gradeFromScore(score)
      const repaymentCapacity = repaymentCapacityFromCashFlow(e)

      return { ...e, newQualityScore: score, grade, repaymentCapacity }
    })
  }, [supportBoost])

  const filteredEnterprises = enterprises.filter((e) => {
    const industryOk = industryFilter === '全部' || e.industryCategory === industryFilter
    const gradeOk = gradeFilter === '全部' || e.grade === gradeFilter
    return industryOk && gradeOk
  })

  const grades = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B'] as Grade[]
  const distribution = grades.map((g) => filteredEnterprises.filter((e) => e.grade === g).length)
  const averageScore = Math.round((filteredEnterprises.reduce((sum, e) => sum + (e.newQualityScore || 0), 0) / Math.max(filteredEnterprises.length, 1)) * 100) / 100

  const top5 = [...enterprises].sort((a, b) => (b.newQualityScore || 0) - (a.newQualityScore || 0)).slice(0, 5)

  const chainData = getChainData(chain)

  const radarCompare = () => {
    const items = enterprises.filter((e) => compareIds.includes(e.id))
    const indicator = [
      { name: '创新投入', max: 100 },
      { name: '创新产出', max: 100 },
      { name: '资产结构', max: 100 },
      { name: '成长动能', max: 100 },
    ]
    return {
      radar: { indicator },
      series: [
        {
          type: 'radar',
          data: items.map((e) => ({
            value: [
              (e.rdIntensity + e.rdPersonnelRatio + e.rdCapitalizationRate) / 3,
              (e.patentCount / 50 + e.inventionPatentRatio + e.newProductRevenueRatio) / 3,
              (e.intangibleAssetsRatio + e.equipmentNewness * 100) / 2,
              (e.revenueCAGR + e.grossMarginTrend * 10 + e.cashFlowHealth) / 3,
            ],
            name: e.name,
          })),
        },
      ],
    }
  }

  const exportCSV = () => {
    const rows = enterprises.map((e) => ({
      id: e.id,
      name: e.name,
      industry: e.industry,
      grade: e.grade,
      score: e.newQualityScore,
      repaymentCapacity: e.repaymentCapacity,
    }))
    const csv = [
      'id,name,industry,grade,score,repaymentCapacity',
      ...rows.map((r) => `${r.id},${r.name},${r.industry},${r.grade},${r.score},${r.repaymentCapacity}`),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'enterprise_list.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' })
    doc.setFontSize(18)
    doc.text('十五五新质生产力金融配置机制 – 报告', 14, 20)
    doc.setFontSize(12)
    doc.text(`总企业：${enterprises.length}，平均得分：${averageScore}`, 14, 30)
    ;(doc as any).autoTable({
      startY: 38,
      head: [['名称', '行业', '得分', '等级', '偿债能力']],
      body: enterprises.slice(0, 8).map((e) => [e.name, e.industry, e.newQualityScore, e.grade, e.repaymentCapacity]),
    })
    doc.save('finance_allocation_report.pdf')
  }

  const addCompany = () => {
    if (!newCompany.name || !newCompany.industryCategory) return
    sourceData.push({
      id: `${Date.now()}`,
      name: newCompany.name,
      industry: newCompany.industry || newCompany.name,
      industryCategory: newCompany.industryCategory,
      rdIntensity: Number(newCompany.rdIntensity ?? 0),
      rdPersonnelRatio: Number(newCompany.rdPersonnelRatio ?? 0),
      rdCapitalizationRate: Number(newCompany.rdCapitalizationRate ?? 0),
      patentCount: Number(newCompany.patentCount ?? 0),
      inventionPatentRatio: Number(newCompany.inventionPatentRatio ?? 0),
      newProductRevenueRatio: Number(newCompany.newProductRevenueRatio ?? 0),
      intangibleAssetsRatio: Number(newCompany.intangibleAssetsRatio ?? 0),
      equipmentNewness: Number(newCompany.equipmentNewness ?? 0),
      revenueCAGR: Number(newCompany.revenueCAGR ?? 0),
      grossMarginTrend: Number(newCompany.grossMarginTrend ?? 0),
      cashFlowHealth: Number(newCompany.cashFlowHealth ?? 0),
    })
    setNewCompany({})
    setSelectedEnterprise(null)
  }

  return (
    <div className="min-h-screen bg-bg text-primary">
      <header className="bg-primary/95 text-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">十五五·新质生产力金融配置机制</h1>
            <p className="text-sm md:text-base text-slate-200">数据驱动的资本、技术与产业协同框架</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {['dashboard', '评分中心', '风险矩阵', '产业协同', '政策建议'].map((page) => (
              <button
                key={page}
                className={`px-3 py-1.5 rounded ${activePage === page ? 'bg-tech text-white' : 'bg-slate-200 text-primary hover:bg-slate-300'}`}
                onClick={() => setActivePage(page as any)}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {activePage === 'dashboard' && (
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <h2 className="font-semibold mb-2">核心机制</h2>
              <ul className="space-y-1.5 text-sm">
                <li>1. 潜力识别机制（加权评分）</li>
                <li>2. 风险分层与差异化定价</li>
                <li>3. 产业协同配置（链主+供应商）</li>
              </ul>
            </article>
            <article className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <h2 className="font-semibold mb-2">基本指标</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded p-2 bg-primary/5">企业总数<div className="font-bold text-2xl">{enterprises.length}</div></div>
                <div className="rounded p-2 bg-primary/5">平均得分<div className="font-bold text-2xl">{averageScore}</div></div>
                <div className="rounded p-2 bg-primary/5">高潜力(AAA/AA)<div className="font-bold text-2xl">{distribution[0] + distribution[1]}</div></div>
                <div className="rounded p-2 bg-primary/5">低潜力(B)<div className="font-bold text-2xl">{distribution[5]}</div></div>
              </div>
            </article>
            <article className="bg-white rounded-lg shadow p-4 border border-slate-200 col-span-2 lg:col-span-1">
              <h2 className="font-semibold mb-2">等级分布</h2>
              <ReactECharts
                option={{
                  tooltip: { trigger: 'item' },
                  legend: { bottom: 0 },
                  series: [
                    {
                      name: '等级分布',
                      type: 'pie',
                      radius: ['45%', '70%'],
                      data: grades.map((g, idx) => ({ value: distribution[idx], name: g })),
                    },
                  ],
                }}
                style={{ height: '260px' }}
              />
            </article>
            <article className="bg-white rounded-lg shadow p-4 border border-slate-200 col-span-1 md:col-span-2">
              <h2 className="font-semibold mb-2">得分前5企业</h2>
              <ReactECharts
                option={{
                  xAxis: { type: 'value', name: '得分' },
                  yAxis: { type: 'category', data: top5.map((e) => e.name), inverse: true },
                  series: [{ type: 'bar', data: top5.map((e) => e.newQualityScore || 0), itemStyle: { color: '#008080' } }],
                  grid: { left: '15%' },
                }}
                style={{ height: '280px' }}
              />
            </article>
            <article className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <h2 className="font-semibold mb-2">最近动态</h2>
              <ul className="text-sm space-y-1.5">
                <li>• 宁德时代新增新能源链路，资产溢价上涨</li>
                <li>• 峰飞航空获国家低空经济引导基金支持</li>
                <li>• 量子计算初创企业进入产业协同试点</li>
              </ul>
            </article>
          </section>
        )}

        {activePage === '评分中心' && (
          <section className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow p-4 border">
                <h2 className="font-semibold mb-2">筛选</h2>
                <div className="flex gap-2 mb-2">
                  <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)} className="border rounded px-2 py-1">
                    <option>全部</option>
                    <option>新能源汽车</option>
                    <option>半导体</option>
                    <option>生物医药</option>
                    <option>低空经济</option>
                    <option>高端装备制造</option>
                    <option>未来产业</option>
                    <option>传统制造业</option>
                  </select>
                  <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="border rounded px-2 py-1">
                    <option>全部</option>
                    {grades.map((g) => (<option key={g}>{g}</option>))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-tech text-white" onClick={() => {setIndustryFilter('全部'); setGradeFilter('全部')}}>重置筛选</button>
                  <button className="px-3 py-1 rounded bg-warning text-white" onClick={exportCSV}>导出CSV</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border">
                <h2 className="font-semibold mb-2">评分计算器</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['研发强度', 'rdIntensity'],
                    ['研发人员占比', 'rdPersonnelRatio'],
                    ['研发费用资本化率', 'rdCapitalizationRate'],
                    ['专利授权量', 'patentCount'],
                    ['发明专利占比', 'inventionPatentRatio'],
                    ['新产品收入占比', 'newProductRevenueRatio'],
                    ['无形资产占比', 'intangibleAssetsRatio'],
                    ['设备新度', 'equipmentNewness'],
                    ['营收CAGR', 'revenueCAGR'],
                    ['毛利率趋势', 'grossMarginTrend'],
                    ['经营现金流/营收', 'cashFlowHealth'],
                  ].map(([label, key]) => (
                    <label key={key} className="text-xs flex flex-col">
                      {label}
                      <input
                        type="number"
                        className="border rounded px-2 py-1 text-sm"
                        value={(newCompany[key as keyof Enterprise] ?? '') as any}
                        onChange={(e) => setNewCompany((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                        placeholder="输入"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input value={newCompany.name || ''} onChange={(e) => setNewCompany((p) => ({ ...p, name: e.target.value }))} placeholder="公司名称" className="flex-1 border rounded px-2 py-1" />
                  <select value={newCompany.industryCategory || ''} onChange={(e) => setNewCompany((p) => ({ ...p, industryCategory: e.target.value as any }))} className="border rounded px-2 py-1">
                    <option value="">行业分类</option>
                    <option>新能源汽车</option>
                    <option>半导体</option>
                    <option>生物医药</option>
                    <option>低空经济</option>
                    <option>高端装备制造</option>
                    <option>未来产业</option>
                    <option>传统制造业</option>
                  </select>
                  <button className="px-3 py-1 rounded bg-eco text-white" onClick={addCompany}>新增企业</button>
                </div>
              </div>
            </div>

            <div className="shadow overflow-hidden rounded-lg border bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">选择</th>
                    <th className="px-4 py-2 text-left">名称</th>
                    <th className="px-4 py-2 text-left">行业</th>
                    <th className="px-4 py-2 text-left">得分</th>
                    <th className="px-4 py-2 text-left">等级</th>
                    <th className="px-4 py-2 text-left">增长率</th>
                    <th className="px-4 py-2 text-left">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnterprises.map((e) => (
                    <tr key={e.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2">
                        <input type="checkbox" checked={compareIds.includes(e.id)} onChange={(event) => {
                          const checked = event.target.checked
                          setCompareIds((prev) => checked ? [...prev.slice(0, 2), e.id].filter((id, idx, arr) => arr.indexOf(id) === idx) : prev.filter((id) => id !== e.id))
                        }} />
                      </td>
                      <td className="px-4 py-2">{e.name}</td>
                      <td className="px-4 py-2">{e.industry}</td>
                      <td className="px-4 py-2">{e.newQualityScore?.toFixed(1)}</td>
                      <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs ${gradeColorMap[e.grade as Grade]}`}>{e.grade}</span></td>
                      <td className="px-4 py-2">{e.revenueCAGR}%</td>
                      <td className="px-4 py-2"><button className="text-tech" onClick={() => setSelectedEnterprise(e)}>详情</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedEnterprise && (
              <div className="bg-white rounded-lg shadow p-4 border"> 
                <h3 className="font-semibold text-lg">{selectedEnterprise.name} 详情</h3>
                <p className="text-sm">行业：{selectedEnterprise.industry} | 等级：{selectedEnterprise.grade} | 得分：{selectedEnterprise.newQualityScore}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                  {[
                    ['研发强度', selectedEnterprise.rdIntensity],
                    ['研发人员占比', selectedEnterprise.rdPersonnelRatio],
                    ['研发费用资本化率', selectedEnterprise.rdCapitalizationRate],
                    ['专利数', selectedEnterprise.patentCount],
                    ['发明专利占比', selectedEnterprise.inventionPatentRatio],
                    ['新产品收入占比', selectedEnterprise.newProductRevenueRatio],
                    ['无形资产占比', selectedEnterprise.intangibleAssetsRatio],
                    ['设备新度', selectedEnterprise.equipmentNewness],
                    ['营收CAGR', selectedEnterprise.revenueCAGR],
                    ['毛利率趋势', selectedEnterprise.grossMarginTrend],
                    ['现金流/营收', selectedEnterprise.cashFlowHealth],
                  ].map(([label, val]) => (
                    <div key={label} className="p-2 bg-slate-50 rounded border">
                      <div className="text-xs text-gray-500">{label}</div>
                      <div className="font-bold">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {compareIds.length > 0 && (
              <div className="bg-white rounded-lg shadow p-4 border">
                <h3 className="font-semibold mb-2">企业对比</h3>
                <ReactECharts option={radarCompare()} style={{ height: '340px' }} />
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-4 border">
              <h3 className="font-semibold mb-2">情景分析（政策支持力度）</h3>
              <input type="range" min={0} max={30} value={supportBoost} onChange={(e) => setSupportBoost(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between text-xs">
                <span>0%</span><span>30%</span>
              </div>
              <p className="text-sm mt-2">当前政策加计扣除：{supportBoost.toFixed(0)}%</p>
            </div>
          </section>
        )}

        {activePage === '风险矩阵' && (
          <section className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow p-4 border md:col-span-2">
              <h2 className="font-semibold mb-3">3x3 风险矩阵</h2>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div className="col-span-1"></div>
                <div className="col-span-1 text-center">高潜力</div>
                <div className="col-span-1 text-center">中潜力</div>
                <div className="col-span-1 text-center">低潜力</div>

                {['高', '中', '低'].map((row) => (
                  <>
                    <div className="text-center font-semibold">{row}偿债</div>
                    {['高', '中', '低'].map((col) => {
                      const info = riskGridInfo[`${row}-${col}`]
                      const count = enterprises.filter((e) => repaymentCapacityFromCashFlow(e) === row && (e.newQualityScore || 0) >= (col === '高' ? 70 : col === '中' ? 50 : 0) && (e.newQualityScore || 0) < (col === '高' ? 100 : col === '中' ? 70 : 50)).length
                      return (
                        <button key={`${row}-${col}`} className="border rounded p-2 bg-slate-50 hover:bg-slate-100 text-left" onClick={() => setSelectedEnterprise(enterprises.find((e) => repaymentCapacityFromCashFlow(e) === row && e.newQualityScore && e.newQualityScore >= (col === '高' ? 70 : col === '中' ? 50 : 0)) || null)}>
                          <div className="font-bold">{info.label}</div>
                          <div className="text-[11px]">{info.tool}</div>
                          <div className="text-[11px]">利率：{info.rate}</div>
                          <div className="text-[11px]">额度：{info.factor}</div>
                          <div className="text-xs font-semibold">{count}家企业</div>
                        </button>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
            <aside className="bg-white rounded-lg shadow p-4 border">
              <h2 className="font-semibold mb-2">定价逻辑</h2>
              <p className="text-sm">基于偿债能力和新质生产力得分，将企业划分为9个风险级别，实施差异化利率与额度管控。</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li>公式：信用利率=基准LPR+风险贴水-政策加计扣除</li>
                <li>等级加权：AAA/AA优先、BB/B收缩、B退出。</li>
                <li>额度=流动性×评级系数×担保情况。</li>
              </ul>
            </aside>
          </section>
        )}

        {activePage === '产业协同' && (
          <section className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4 border flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h2 className="font-semibold">产业链选择</h2>
              <select value={chain} onChange={(e) => setChain(e.target.value as any)} className="border rounded px-2 py-1">
                <option value="新能源汽车">新能源汽车</option>
                <option value="低空经济">低空经济</option>
                <option value="半导体">半导体</option>
              </select>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border">
              <ReactECharts
                option={{
                  tooltip: { formatter: '{b}' },
                  series: [
                    {
                      type: 'graph',
                      layout: 'force',
                      symbolSize: 10,
                      roam: true,
                      force: { repulsion: 200 },
                      data: chainData.nodes.map((n) => ({
                        ...n,
                        itemStyle: { color: n.category === 0 ? '#2E7D32' : n.category === 1 ? '#008080' : '#ED6C02' },
                        label: { show: true, formatter: n.id, fontSize: 12 },
                      })),
                      links: chainData.links.map((l) => ({ target: l.target, source: l.source, lineStyle: { width: l.value / 30 } })),
                    },
                  ],
                }}
                style={{ height: '500px' }}
              />
            </div>
            <div className="bg-white rounded-lg shadow p-4 border">
              <h3 className="font-semibold">供应链金融动画</h3>
              <p className="text-sm">银行 → 链主企业 → 供应商</p>
              <div className="h-24 flex items-center justify-around">
                <div className="text-center p-3 border rounded bg-slate-100">银行</div>
                <div className="text-center p-3 border rounded bg-slate-100">链主（{chain === '新能源汽车' ? '宁德时代' : chain === '低空经济' ? '峰飞航空' : '中芯国际'}）</div>
                <div className="text-center p-3 border rounded bg-slate-100">供应商</div>
              </div>
            </div>
          </section>
        )}

        {activePage === '政策建议' && (
          <section className="bg-white rounded-lg shadow p-4 border space-y-4">
            <div className="flex flex-wrap gap-2">
              {['三大机制详解', '政策建议', '实施路线图', '数据来源与方法论'].map((tab) => (
                <button key={tab} className="px-3 py-1 rounded bg-tech text-white">
                  {tab}
                </button>
              ))}
            </div>
            <div id="actionable" className="space-y-3 text-sm">
              <h3 className="font-semibold">三大机制详解</h3>
              <p>基于加权评分识别企业、风险矩阵差异化定价、产业链金融协同，实现资本效率与ESG兼顾。</p>
              <h3 className="font-semibold">政策建议</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>完善信用评级模型，建立行业跟踪指标库。</li>
                <li>设立“产业引导基金+科技创新基金”并行机制。</li>
                <li>动态调整LPR贴水，支持高潜力低偿债企业转型。</li>
              </ul>
              <h3 className="font-semibold">实施路线图</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>2025年：理论验证与样本库构建。</li>
                <li>2026年：省级试点与风险矩阵落地。</li>
                <li>2027年：全国推广与产业链协同平台上线。</li>
              </ol>
              <h3 className="font-semibold">数据来源与方法论</h3>
              <p>结合企业财务数据、专利与科研投入，采用加权评分与归一化方法完成新质生产力评分。</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded bg-primary text-white" onClick={exportPDF}>导出PDF</button>
              <button className="px-4 py-2 rounded bg-warning text-white" onClick={exportCSV}>导出CSV</button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
