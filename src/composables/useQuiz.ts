import { ref, computed } from 'vue'
import type { DimensionKey, FinalReport, ArchetypeResult } from '../types/quiz'
import { QUIZ_QUESTIONS } from '../data/quiz'
import { DIMENSIONS, DIMENSION_KEYS } from '../data/dimensions'
import { ARCHETYPES } from '../data/archetypes'

export type ViewState = 'intro' | 'quiz' | 'analyzing' | 'report'

const viewState = ref<ViewState>('intro')
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string>>({})
const startTime = ref<number>(0)
const report = ref<FinalReport | null>(null)
const selectedOccupation = ref<string>('')

export function useQuiz() {
  const currentQuestion = computed(() => QUIZ_QUESTIONS[currentQuestionIndex.value])
  const totalQuestions = QUIZ_QUESTIONS.length
  const progressPercent = computed(() => {
    return Math.round(((currentQuestionIndex.value + 1) / totalQuestions) * 100)
  })

  function startQuiz() {
    viewState.value = 'quiz'
    currentQuestionIndex.value = 0
    answers.value = {}
    startTime.value = Date.now()
    report.value = null
  }

  function selectOption(optionId: string) {
    const qId = currentQuestion.value.id
    answers.value[qId] = optionId

    // 自动平滑进入下一题，或者进入分析过渡态
    if (currentQuestionIndex.value < totalQuestions - 1) {
      setTimeout(() => {
        currentQuestionIndex.value++
      }, 260)
    } else {
      setTimeout(() => {
        finishQuiz()
      }, 350)
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }

  function calculateResults(): FinalReport {
    const rawScores: Record<DimensionKey, number> = {
      traffic: 0,
      product: 0,
      emotion: 0,
      resource: 0,
      insight: 0,
      execution: 0
    }

    // 汇总用户所有题目的得分
    for (const q of QUIZ_QUESTIONS) {
      const chosenOptId = answers.value[q.id]
      if (chosenOptId) {
        const opt = q.options.find(o => o.id === chosenOptId)
        if (opt && opt.scores) {
          for (const [dim, val] of Object.entries(opt.scores)) {
            rawScores[dim as DimensionKey] += (val as number)
          }
        }
      }
    }

    // 找出得分最高的 top2 维度
    const sortedDims = [...DIMENSION_KEYS].sort((a, b) => rawScores[b] - rawScores[a])
    const primaryKey = sortedDims[0]
    const secondaryKey = sortedDims[1]

    // 匹配最佳原型
    let matchedArchetype: ArchetypeResult | null = null

    // 1. 先精准匹配 primaryKey 和 secondaryKey
    for (const arch of Object.values(ARCHETYPES)) {
      if (arch.primaryKey === primaryKey && arch.secondaryKey === secondaryKey) {
        matchedArchetype = arch
        break
      }
    }

    // 2. 若无完全镜像，匹配颠倒包含或者包含 top 维度
    if (!matchedArchetype) {
      for (const arch of Object.values(ARCHETYPES)) {
        if (arch.primaryKey === secondaryKey && arch.secondaryKey === primaryKey) {
          matchedArchetype = arch
          break
        }
      }
    }

    // 3. 若仍无，匹配 primaryKey 相同的原型中，副维度得分最高者
    if (!matchedArchetype) {
      const candidates = Object.values(ARCHETYPES).filter(a => a.primaryKey === primaryKey || a.secondaryKey === primaryKey)
      if (candidates.length > 0) {
        matchedArchetype = candidates.sort((a, b) => {
          const scoreA = rawScores[a.primaryKey] + rawScores[a.secondaryKey]
          const scoreB = rawScores[b.primaryKey] + rawScores[b.secondaryKey]
          return scoreB - scoreA
        })[0]
      } else {
        matchedArchetype = Object.values(ARCHETYPES)[0]
      }
    }

    // 归一化得分百分比 (70% ~ 98%，避免挫败感，增强正向商业能量感知)
    const maxScore = Math.max(...Object.values(rawScores), 1)
    const dimensionPercentages: Record<DimensionKey, number> = {} as any
    for (const key of DIMENSION_KEYS) {
      const normalized = Math.round(68 + (rawScores[key] / maxScore) * 30)
      dimensionPercentages[key] = Math.min(normalized, 98)
    }

    const elapsedSeconds = Math.round((Date.now() - (startTime.value || Date.now())) / 1000)
    const randomReportId = Math.floor(1000 + Math.random() * 9000).toString()

    // 综合搞钱商业能量指数
    const overallIndex = Math.round(
      (dimensionPercentages[primaryKey] * 0.6) + (dimensionPercentages[secondaryKey] * 0.4)
    )

    // 4 大搞钱底层基因指标
    const subMetrics = [
      {
        name: '决策爆发力',
        score: Math.min(99, Math.round((dimensionPercentages.execution * 0.55) + (dimensionPercentages.insight * 0.45))),
        desc: '从发现机会到闪电迈出第一步的行动阻力低度',
        color: '#10B981'
      },
      {
        name: '客单价撬动力',
        score: Math.min(99, Math.round((dimensionPercentages.product * 0.55) + (dimensionPercentages.emotion * 0.45))),
        desc: '拒绝低价卷入，塑造高客单溢价与心智壁垒的能力',
        color: '#8B5CF6'
      },
      {
        name: '心理抗阻力',
        score: Math.min(99, Math.round((dimensionPercentages.emotion * 0.5) + (dimensionPercentages.execution * 0.5))),
        desc: '面对负评、冷场与商业周期的心理防护与韧性',
        color: '#EC4899'
      },
      {
        name: '商业嗅觉度',
        score: Math.min(99, Math.round((dimensionPercentages.insight * 0.6) + (dimensionPercentages.traffic * 0.4))),
        desc: '洞察大众潜在痛点、信息断层与套利缝隙的敏锐度',
        color: '#F59E0B'
      }
    ]

    // 财富动力学 (Wealth Dynamics) 4 大自然能量计算
    const dynamoScore = Math.min(99, Math.round((dimensionPercentages.product * 0.52) + (dimensionPercentages.insight * 0.48)))
    const blazeScore = Math.min(99, Math.round((dimensionPercentages.emotion * 0.55) + (dimensionPercentages.traffic * 0.45)))
    const tempoScore = Math.min(99, Math.round((dimensionPercentages.insight * 0.55) + (dimensionPercentages.resource * 0.45)))
    const steelScore = Math.min(99, Math.round((dimensionPercentages.execution * 0.6) + (dimensionPercentages.resource * 0.4)))

    const wealthEnergies: any[] = [
      {
        key: 'dynamo',
        name: '发散火能量',
        enName: 'Dynamo Energy',
        icon: 'Flame',
        color: '#EF4444',
        percentage: dynamoScore,
        desc: '擅长自上而下的创想、开辟全新赛道、将无形灵感化为惊艳方案。',
        naturalGift: '造词大师、超级概念重塑、从 0 到 1 破局',
        pathOfLeastResistance: '做创作者/产品架构师，不要去管鸡毛蒜皮的琐碎售后。'
      },
      {
        key: 'blaze',
        name: '社交光能量',
        enName: 'Blaze Energy',
        icon: 'Sun',
        color: '#F59E0B',
        percentage: blazeScore,
        desc: '天生有强大的个人磁场、善于用情绪和真诚连接人、让客户产生深度信任。',
        naturalGift: '私域高客单转化、情绪种草、个人 IP 吸引力',
        pathOfLeastResistance: '走向台前面对人群，依靠人际温度转化，不要闭门造车做后台。'
      },
      {
        key: 'tempo',
        name: '节律地能量',
        enName: 'Tempo Energy',
        icon: 'Compass',
        color: '#3B82F6',
        percentage: tempoScore,
        desc: '脚踏实地感知市场温度、嗅探时机节拍、善于在平台与圈层间套利。',
        naturalGift: '信息差挖掘、买手选品、跨界资源撮合',
        pathOfLeastResistance: '做敏锐交易者与中介，快进快出，不要在夕阳重资产里死扛。'
      },
      {
        key: 'steel',
        name: '秩序钢能量',
        enName: 'Steel Energy',
        icon: 'Shield',
        color: '#10B981',
        percentage: steelScore,
        desc: '擅长自下而上的数据精算、系统拆解、标准化流程与工业化复制。',
        naturalGift: 'SOP 梳理、自动化工作流、极限降本增效',
        pathOfLeastResistance: '做系统掌舵者与交付中枢，用流程让团队替你打工。'
      }
    ]

    const dominantWealthEnergy = [...wealthEnergies].sort((a, b) => b.percentage - a.percentage)[0]

    // 纳瓦尔 (Naval Ravikant) 四大非许可杠杆评分
    const mediaScore = Math.min(99, Math.round((dimensionPercentages.traffic * 0.55) + (dimensionPercentages.emotion * 0.45)))
    const codeScore = Math.min(99, Math.round((dimensionPercentages.product * 0.55) + (dimensionPercentages.execution * 0.45)))
    const networkScore = Math.min(99, Math.round((dimensionPercentages.resource * 0.6) + (dimensionPercentages.insight * 0.4)))
    const knowledgeScore = Math.min(99, Math.round((dimensionPercentages.insight * 0.55) + (dimensionPercentages.product * 0.45)))

    const getLeverageStatus = (score: number) => {
      if (score >= 90) return '极高杠杆'
      if (score >= 80) return '高杠杆'
      if (score >= 70) return '稳健增长'
      return '待激活'
    }

    const navalLeverages: any[] = [
      {
        name: '媒体内容杠杆',
        enName: 'Media Leverage',
        score: mediaScore,
        status: getLeverageStatus(mediaScore),
        desc: '你的文字、图文与视频在互联网上不眠不休为你招揽客户与信任。',
        howToScale: '把一次灵感提炼为标准化图文模板，通过小红书多矩阵分发放大。'
      },
      {
        name: '数字工具与AI杠杆',
        enName: 'Code & AI Leverage',
        score: codeScore,
        status: getLeverageStatus(codeScore),
        desc: '依靠自动化表格、飞书/Notion模板与AI工具流，打破出卖时间的线性诅咒。',
        howToScale: '将个人技能打包成可被无限次被动下载的数字化虚拟产品。'
      },
      {
        name: '协同网络杠杆',
        enName: 'Network Leverage',
        score: networkScore,
        status: getLeverageStatus(networkScore),
        desc: '用别人现成的产能、渠道与团队替你赚钱，通过分润网络撬动超额利润。',
        howToScale: '设计一套 50% 阶梯分销机制，让上百位分销创作者为你卖货。'
      },
      {
        name: '专属知识壁垒',
        enName: 'Specific Knowledge',
        score: knowledgeScore,
        status: getLeverageStatus(knowledgeScore),
        desc: '无法通过大学教育或普通培训速成的个性化洞察、审美直觉与跨界认知。',
        howToScale: '拒绝陷入廉价比价，用个人真实成长故事赋予这项知识极高不可替代性。'
      }
    ]

    return {
      userReportId: `#${randomReportId}`,
      createdAt: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      totalTimeSeconds: elapsedSeconds,
      archetype: matchedArchetype,
      dimensionScores: rawScores,
      dimensionPercentages,
      primaryDimension: DIMENSIONS[primaryKey],
      secondaryDimension: DIMENSIONS[secondaryKey],
      overallIndex,
      subMetrics,
      wealthEnergies,
      dominantWealthEnergy,
      navalLeverages
    }
  }

  function finishQuiz() {
    viewState.value = 'analyzing'
    const computedReport = calculateResults()

    // 模拟 2.2 秒科技罗盘对齐动画后进入报告页
    setTimeout(() => {
      report.value = computedReport
      viewState.value = 'report'
    }, 2400)
  }

  function restart() {
    viewState.value = 'intro'
    currentQuestionIndex.value = 0
    answers.value = {}
    report.value = null
  }

  return {
    viewState,
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    progressPercent,
    answers,
    report,
    selectedOccupation,
    startQuiz,
    selectOption,
    prevQuestion,
    restart
  }
}
