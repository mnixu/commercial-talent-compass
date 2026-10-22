import type { DimensionInfo, DimensionKey } from '../types/quiz'

export const DIMENSIONS: Record<DimensionKey, DimensionInfo> = {
  traffic: {
    key: 'traffic',
    name: '流量嗅觉度',
    enName: 'Traffic & Trend',
    shortDesc: '对公众注意力、流行文化与热搜情绪的感知直觉，擅长以低成本抓取公域流量。',
    color: '#FF6459',
    bgLight: '#FFF5F4',
    icon: 'Flame',
    highTrait: '对大众好奇心与情绪爆点极度敏锐，任何日常话题都能拆解成吸睛标题与首图。',
    breakthroughTip: '别只顾着追求曝光数字，把公域热度第一时间引导沉淀到高信任闭环中。'
  },
  product: {
    key: 'product',
    name: '产品包装力',
    enName: 'Product & Packaging',
    shortDesc: '将抽象能力、零散知识或普通事物概念化、高价值化、视觉美学化的升维能力。',
    color: '#8B5CF6',
    bgLight: '#F3EEFB',
    icon: 'Sparkles',
    highTrait: '天生有把“50元物品卖出500元质感”的重塑审美，擅长定义标准与构建体系。',
    breakthroughTip: '防止陷入过度雕琢细节的“完美主义陷阱”，先发布 MVP（最小可行产品）接受市场检验。'
  },
  emotion: {
    key: 'emotion',
    name: '情绪价值力',
    enName: 'Emotional Value',
    shortDesc: '极强的共情深度与心理洞察，擅长建立牢不可破的私域信任、高客单复购与圈层黏性。',
    color: '#EC4899',
    bgLight: '#FDF2F8',
    icon: 'HeartHandshake',
    highTrait: '能轻易读懂用户未被说出的委屈与渴望，让客户愿意为你的人格魅力长期买单。',
    breakthroughTip: '学会建立心理能量防护盾，避免过度吸收他人负能量而导致个人内耗透支。'
  },
  resource: {
    key: 'resource',
    name: '资源杠杆力',
    enName: 'Resource & Leverage',
    shortDesc: '拒绝纯靠劳力内卷，擅长搭桥撮合、借力打力、整合多方利益并设计分润网络。',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    icon: 'Network',
    highTrait: '能看懂牌桌上的隐形筹码，用别人现成的产能、渠道与资金，放大自己的收益半径。',
    breakthroughTip: '持续提升自己的核心不可替代性，在利益分配中设定坚固的安全边际。'
  },
  insight: {
    key: 'insight',
    name: '敏锐洞察力',
    enName: 'Arbitrage & Insight',
    shortDesc: '捕捉未被满足的隐蔽需求、跨圈信息差与降维套利机会的超常商业第六感。',
    color: '#F59E0B',
    bgLight: '#FFFBEB',
    icon: 'Compass',
    highTrait: '在别人看到平平无奇的地方，总能第一时间嗅出“这里能赚一笔信息差”的缝隙。',
    breakthroughTip: '信息差窗口往往具有时效性，想到就要闪电启动，不要被繁复论证拖慢节拍。'
  },
  execution: {
    key: 'execution',
    name: '交付闭环力',
    enName: 'Execution & Delivery',
    shortDesc: '极强的结果导向、流程标准化（SOP）、执行抗挫力与持续兑现交付的能力。',
    color: '#10B981',
    bgLight: '#ECFDF5',
    icon: 'Zap',
    highTrait: '执行力怪兽，擅长把混乱模糊的任务拆成可量化的执行齿轮，绝不拖泥带水。',
    breakthroughTip: '警惕用战术上的勤奋掩盖战略上的懒惰，定期跳出执行细节审视杠杆率。'
  }
}

export const DIMENSION_KEYS: DimensionKey[] = [
  'traffic',
  'product',
  'emotion',
  'resource',
  'insight',
  'execution'
]
