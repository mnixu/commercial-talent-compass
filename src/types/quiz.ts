export type DimensionKey = 'traffic' | 'product' | 'emotion' | 'resource' | 'insight' | 'execution'

export interface DimensionInfo {
  key: DimensionKey
  name: string
  enName: string
  shortDesc: string
  color: string
  bgLight: string
  icon: string
  highTrait: string
  breakthroughTip: string
}

export interface QuizOption {
  id: string
  text: string
  subtext?: string
  scores: Partial<Record<DimensionKey, number>>
}

export interface QuizQuestion {
  id: number
  scene: string
  title: string
  context: string
  options: QuizOption[]
}

export interface SideHustleItem {
  name: string
  fitScore: string
  difficulty: '极低' | '低' | '中等'
  earningModel: string
  firstStep: string
}

export interface RoadmapStage {
  stage: string
  title: string
  target: string
  action: string
}

export interface MoneyBlockInfo {
  blockTitle: string
  subconsciousCause: string
  cureMantra: string
}

export interface PartnerMatchInfo {
  bestPartner: string
  bestReason: string
  dangerPartner: string
  dangerReason: string
}

export interface XhsBioGuide {
  personaTitle: string
  bioTemplate: string
  hookThemes: string[]
}

export interface HormoziDayAction {
  day: string
  title: string
  objective: string
  action: string
  tip: string
}

export interface HormoziSprint {
  coreOffer: string
  dreamOutcome: string
  days: HormoziDayAction[]
}

export type WealthEnergyKey = 'dynamo' | 'blaze' | 'tempo' | 'steel'

export interface WealthEnergyItem {
  key: WealthEnergyKey
  name: string
  enName: string
  icon: string
  color: string
  percentage: number
  desc: string
  naturalGift: string
  pathOfLeastResistance: string
}

export interface NavalLeverageItem {
  name: string
  enName: string
  score: number
  status: '极高杠杆' | '高杠杆' | '稳健增长' | '待激活'
  desc: string
  howToScale: string
}

export interface ArchetypeResult {
  id: string
  title: string
  subtitle: string
  badge: string
  tags: string[]
  quote: string
  primaryKey: DimensionKey
  secondaryKey: DimensionKey
  archetypeColor: {
    from: string
    to: string
    accent: string
    badgeBg: string
    badgeText: string
  }
  overview: string
  flowState: string
  dangerZone: string
  celebrity: {
    name: string
    role: string
    quote: string
  }
  sideHustles: SideHustleItem[]
  growthAdvice: string[]
  roadmap: RoadmapStage[]
  moneyBlock: MoneyBlockInfo
  partnerMatch: PartnerMatchInfo
  xhsBioGuide: XhsBioGuide
  // 欧美商业模型专属配置
  leverageMultiplier: string // 如 "4.2x"
  flowVelocity: 'S+' | 'S' | 'A+' | 'A'
  wealthEnergyTag: string
  hormoziSprint: HormoziSprint
  dailyHabits?: string[]
  cautionHustles?: string[]
  guideDownload?: {
    manualTitle: string
    manualPages: string
    keyTakeaway: string
  }
}

export interface SubMetricItem {
  name: string
  score: number
  desc: string
  color: string
}

export interface FinalReport {
  userReportId: string
  createdAt: string
  totalTimeSeconds: number
  archetype: ArchetypeResult
  dimensionScores: Record<DimensionKey, number>
  dimensionPercentages: Record<DimensionKey, number>
  primaryDimension: DimensionInfo
  secondaryDimension: DimensionInfo
  overallIndex: number
  subMetrics: SubMetricItem[]
  // 新增国外模型计算结果
  wealthEnergies: WealthEnergyItem[]
  dominantWealthEnergy: WealthEnergyItem
  navalLeverages: NavalLeverageItem[]
}


