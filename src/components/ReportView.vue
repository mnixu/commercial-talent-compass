<template>
  <div v-if="report" class="min-h-screen max-w-md mx-auto px-4 pt-6 pb-28">
    <!-- 主卡片容器（作为可在前端直接展示与海报截取的基准） -->
    <div id="report-poster-node" class="space-y-4 bg-gradient-to-b from-white via-cream-50 to-lavender-50/50 p-4 rounded-3xl border border-lavender-200/60 shadow-soft overflow-hidden box-border">
      <!-- 顶部报告抬头与编号 -->
      <div class="flex items-center justify-between pb-3 border-b border-cream-300/70 text-xs">
        <div class="flex items-center gap-1.5 font-bold text-ink-800">
          <Compass class="w-4 h-4 text-lavender-600" />
          <span>商业天赋与搞钱体质报告</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-lavender-600 bg-lavender-100/80 px-2 py-0.5 rounded text-[11px]">
            {{ report.userReportId }}
          </span>
          <span class="text-[11px] text-ink-400">{{ report.createdAt }}</span>
        </div>
      </div>

      <!-- 核心称号与商业原型卡片 -->
      <div class="relative overflow-hidden rounded-2xl p-5 text-white shadow-float"
           :style="{ background: `linear-gradient(135deg, ${report.archetype.archetypeColor.from} 0%, ${report.archetype.archetypeColor.to} 100%)` }">
        <!-- 背景装饰几何微光 -->
        <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        <div class="absolute top-2 right-3 opacity-20">
          <Crown class="w-16 h-16" />
        </div>

        <div class="relative z-10">
          <!-- 徽章标签 -->
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 shadow-sm"
               :style="{ backgroundColor: report.archetype.archetypeColor.badgeBg, color: report.archetype.archetypeColor.badgeText }">
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ report.archetype.badge }}</span>
          </div>

          <h1 class="text-2xl font-black tracking-tight text-white mb-1">
            {{ report.archetype.title }}
          </h1>
          <p class="text-xs text-white/80 font-medium mb-3">
            {{ report.archetype.subtitle }}
          </p>

          <!-- 搞钱标签云 -->
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span
              v-for="tag in report.archetype.tags"
              :key="tag"
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/15 text-white backdrop-blur-sm"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- 海外商业模型属性条 (Character Stats) -->
          <div class="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center mb-3">
            <div>
              <div class="text-[9px] text-white/70">时薪杠杆</div>
              <div class="text-xs font-black text-amber-300 font-mono">{{ report.archetype.leverageMultiplier }}</div>
            </div>
            <div class="border-x border-white/10">
              <div class="text-[9px] text-white/70">顺流速度</div>
              <div class="text-xs font-black text-emerald-300 font-mono">{{ report.archetype.flowVelocity }} 级</div>
            </div>
            <div>
              <div class="text-[9px] text-white/70">主导原力</div>
              <div class="text-xs font-bold text-white truncate px-1">{{ report.dominantWealthEnergy.name.slice(0, 3) }}</div>
            </div>
          </div>

          <!-- 核心金句引用 -->
          <div class="p-3 rounded-xl bg-black/20 border border-white/10 text-xs text-white/95 leading-relaxed italic">
            “{{ report.archetype.quote }}”
          </div>
        </div>
      </div>

      <!-- 综合搞钱商业能量指数 -->
      <div class="glass-card rounded-2xl p-4 flex items-center justify-between border border-white shadow-card">
        <div>
          <div class="text-[11px] font-bold text-ink-500 uppercase tracking-wider mb-0.5">Overall Index</div>
          <div class="text-base font-extrabold text-ink-900">搞钱能量指数</div>
          <div class="text-[11px] text-ink-400">超过全网 94.6% 的同龄探索者</div>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-black bg-gradient-to-r from-lavender-600 to-pink-600 bg-clip-text text-transparent">
            {{ report.overallIndex }}
          </span>
          <span class="text-xs font-bold text-ink-400">/100</span>
        </div>
      </div>

      <!-- 财富动力学 · 阻力最小的搞钱顺流分析 (Wealth Dynamics) -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Flame class="w-4 h-4 text-amber-500" />
            <span>财富动力学 · 阻力最小的搞钱路径</span>
          </h3>
          <span class="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">欧美经典模型</span>
        </div>

        <p class="text-xs text-ink-600 leading-relaxed">
          罗杰·汉密尔顿财富动力学指出：<strong>普通人搞钱失败往往是因为逆着天生能量死磕</strong>。顺流而动轻舟已过万重山，逆流而动耗尽心力事倍功半。
        </p>

        <!-- 4 大财富能量条 -->
        <div class="grid grid-cols-2 gap-2 pt-1">
          <div
            v-for="energy in report.wealthEnergies"
            :key="energy.key"
            class="p-2.5 rounded-xl border transition-all"
            :class="energy.key === report.dominantWealthEnergy.key ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300' : 'bg-cream-50/70 border-cream-200/80'"
          >
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-bold flex items-center gap-1" :style="{ color: energy.color }">
                <span>{{ energy.name }}</span>
                <span v-if="energy.key === report.dominantWealthEnergy.key" class="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-normal">主原力</span>
              </span>
              <span class="font-mono font-bold text-ink-800">{{ energy.percentage }}%</span>
            </div>
            <div class="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden mb-1">
              <div class="h-full rounded-full" :style="{ width: `${energy.percentage}%`, backgroundColor: energy.color }"></div>
            </div>
            <p class="text-[10px] text-ink-500 line-clamp-2 leading-tight">{{ energy.naturalGift }}</p>
          </div>
        </div>

        <!-- 顺流法则提示卡片 -->
        <div class="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-lavender-500/10 to-transparent border border-amber-200/80 text-xs text-ink-800 space-y-1">
          <div class="font-bold text-amber-900 flex items-center gap-1">
            <Compass class="w-3.5 h-3.5 text-amber-600" />
            <span>你的天然顺流法则：</span>
          </div>
          <p class="text-ink-700 leading-relaxed font-medium">
            {{ report.dominantWealthEnergy.pathOfLeastResistance }}
          </p>
        </div>
      </div>

      <!-- 4 大搞钱底层基因指标 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Layers class="w-4 h-4 text-lavender-600" />
            <span>4维底层搞钱基因指标</span>
          </h3>
          <span class="text-[11px] text-ink-400">潜力评级</span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="metric in report.subMetrics"
            :key="metric.name"
            class="p-2.5 rounded-xl bg-cream-50/80 border border-cream-200/60"
          >
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-bold text-ink-800">{{ metric.name }}</span>
              <span class="font-mono font-bold" :style="{ color: metric.color }">{{ metric.score }} / 100</span>
            </div>
            <div class="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden mb-1">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: `${metric.score}%`, backgroundColor: metric.color }"
              ></div>
            </div>
            <p class="text-[10px] text-ink-500 leading-normal">{{ metric.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 6维商业原力雷达图模块 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <RadarIcon class="w-4 h-4 text-lavender-600" />
            <span>6维商业原力全景雷达</span>
          </h3>
          <span class="text-[11px] text-lavender-600 font-semibold bg-lavender-50 px-2 py-0.5 rounded">
            主才干: {{ report.primaryDimension.name }}
          </span>
        </div>

        <!-- 雷达图组件 -->
        <RadarChart :scores="report.dimensionPercentages" />

        <!-- 六维细分进度条列表 -->
        <div class="mt-4 pt-3 border-t border-cream-200 grid grid-cols-2 gap-2.5">
          <div
            v-for="(dimKey) in ['traffic', 'product', 'emotion', 'resource', 'insight', 'execution'] as const"
            :key="dimKey"
            class="p-2 rounded-xl bg-white/70 border border-cream-200/80"
          >
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-medium text-ink-700">{{ DIMENSIONS[dimKey].name }}</span>
              <span class="font-bold font-mono" :style="{ color: DIMENSIONS[dimKey].color }">
                {{ report.dimensionPercentages[dimKey] }}%
              </span>
            </div>
            <div class="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{
                  width: `${report.dimensionPercentages[dimKey]}%`,
                  backgroundColor: DIMENSIONS[dimKey].color
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 深度才干深度解析卡片 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3.5">
        <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
          <Zap class="w-4 h-4 text-amber-500" />
          <span>商业体质深度解码</span>
        </h3>

        <!-- 概述 -->
        <div class="text-xs text-ink-700 leading-relaxed bg-cream-100/70 p-3 rounded-xl border border-cream-200">
          {{ report.archetype.overview }}
        </div>

        <!-- 心流发光区 vs 能量内耗区 -->
        <div class="space-y-2.5">
          <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-xs">
            <div class="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
              <Sparkles class="w-3.5 h-3.5 text-emerald-600" />
              <span>天赋心流区 (Flow Zone)</span>
            </div>
            <p class="text-emerald-950/80 leading-relaxed">
              {{ report.archetype.flowState }}
            </p>
          </div>

          <div class="p-3 rounded-xl bg-rose-50/80 border border-rose-200/70 text-xs">
            <div class="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
              <AlertTriangle class="w-3.5 h-3.5 text-rose-600" />
              <span>内耗避坑区 (Danger Zone)</span>
            </div>
            <p class="text-rose-950/80 leading-relaxed">
              {{ report.archetype.dangerZone }}
            </p>
          </div>
        </div>
      </div>

      <!-- 金钱潜意识卡点与心法突破 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Lock class="w-4 h-4 text-pink-600" />
            <span>金钱阻滞点与潜意识卡点</span>
          </h3>
          <span class="text-[10px] text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded">关键卡点</span>
        </div>

        <div class="p-3 rounded-xl bg-pink-50/60 border border-pink-200/60 space-y-2">
          <div class="text-xs font-bold text-pink-900 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>隐形卡点：{{ report.archetype.moneyBlock.blockTitle }}</span>
          </div>
          <p class="text-[11px] text-pink-950/80 leading-relaxed">
            <strong>底层心魔剖析：</strong>{{ report.archetype.moneyBlock.subconsciousCause }}
          </p>
          <div class="p-2.5 rounded-lg bg-white/90 border border-pink-200 text-xs text-pink-900 italic font-medium leading-relaxed">
            💡 <strong>破局心法：</strong>“{{ report.archetype.moneyBlock.cureMantra }}”
          </div>
        </div>
      </div>

      <!-- 商业名人对标 -->
      <div class="rounded-2xl p-4 bg-gradient-to-r from-purple-50/90 to-lavender-50 border border-lavender-200/80 shadow-sm flex items-start">
        <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lavender-700 font-black text-sm shrink-0 border border-lavender-200 mr-3 mt-0.5">
          {{ report.archetype.celebrity.name.slice(0, 1) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-0.5">
            <h4 class="text-xs font-bold text-ink-900 truncate">
              商业原型对标：{{ report.archetype.celebrity.name }}
            </h4>
            <span class="text-[10px] text-lavender-600 font-semibold bg-white/90 px-2 py-0.5 rounded border border-lavender-200/50 shrink-0 ml-1">
              同频基因
            </span>
          </div>
          <p class="text-[11px] text-ink-500 mb-1.5">{{ report.archetype.celebrity.role }}</p>
          <p class="text-xs text-ink-700 italic border-l-2 border-lavender-400 pl-2 leading-relaxed">
            “{{ report.archetype.celebrity.quote }}”
          </p>
        </div>
      </div>

      <!-- 纳瓦尔非许可杠杆诊断 (Naval Leverage Matrix) -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Cpu class="w-4 h-4 text-indigo-600" />
            <span>纳瓦尔非许可杠杆矩阵</span>
          </h3>
          <span class="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">纳瓦尔宝典</span>
        </div>

        <p class="text-xs text-ink-600 leading-relaxed">
          《纳瓦尔宝典》提出：<strong>靠出租时间不可能获得财富自由</strong>。你必须寻找不需别人授权、零边际复制成本的现代超级杠杆。
        </p>

        <div class="space-y-2.5">
          <div
            v-for="lev in report.navalLeverages"
            :key="lev.name"
            class="p-2.5 rounded-xl bg-cream-50/90 border border-cream-200/80 space-y-1.5"
          >
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-ink-900">{{ lev.name }}</span>
                <span class="text-[10px] text-ink-400 font-mono">({{ lev.enName }})</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span
                  class="text-[10px] font-bold px-1.5 py-0.2 rounded"
                  :class="lev.status === '极高杠杆' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'"
                >
                  {{ lev.status }}
                </span>
                <span class="font-mono font-bold text-ink-800">{{ lev.score }}</span>
              </div>
            </div>

            <p class="text-[11px] text-ink-600 leading-snug">{{ lev.desc }}</p>

            <div class="text-[11px] text-lavender-900 bg-lavender-50/80 p-2 rounded-lg leading-normal flex items-start gap-1">
              <span class="text-lavender-600 font-bold shrink-0">🚀 杠杆放大器：</span>
              <span>{{ lev.howToScale }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 适合你的 3 大轻资产副业清单与第一步行动 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Briefcase class="w-4 h-4 text-lavender-600" />
            <span>为你量身匹配的轻资产副业方向</span>
          </h3>
          <span class="text-[11px] text-coral-600 font-semibold">首推3条</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in report.archetype.sideHustles"
            :key="item.name"
            class="p-3.5 rounded-xl bg-white border border-cream-200/90 shadow-sm"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-md bg-lavender-100 text-lavender-700 text-xs font-bold flex items-center justify-center">
                  {{ idx + 1 }}
                </span>
                <span class="text-xs font-bold text-ink-900">{{ item.name }}</span>
              </div>
              <span class="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                契合度 {{ item.fitScore }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px] text-ink-600 mb-2 py-1.5 px-2 bg-cream-50 rounded-lg">
              <div>难度：<span class="font-semibold text-ink-800">{{ item.difficulty }}</span></div>
              <div>收益模式：<span class="font-semibold text-ink-800">{{ item.earningModel }}</span></div>
            </div>

            <div class="text-xs text-ink-700 leading-relaxed flex items-start gap-1">
              <span class="text-[10px] font-bold text-lavender-600 bg-lavender-100 px-1 rounded shrink-0 mt-0.5">SOP</span>
              <span><strong>第一步行动：</strong>{{ item.firstStep }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 副业起盘 3 阶路线图 (Roadmap) -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Milestone class="w-4 h-4 text-emerald-600" />
            <span>副业变现 3 阶实操路线图</span>
          </h3>
          <span class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">阶梯闭环</span>
        </div>

        <div class="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-300">
          <div
            v-for="(stage, i) in report.archetype.roadmap"
            :key="i"
            class="relative space-y-1"
          >
            <div class="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-emerald-700">{{ stage.stage }}</span>
              <span class="text-[11px] text-ink-500 font-medium">{{ stage.title }}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-cream-50 text-[11px] text-ink-700 leading-relaxed border border-cream-200/60">
              <div class="font-semibold text-ink-900 mb-0.5">🎯 阶段目标：{{ stage.target }}</div>
              <div>🚀 <strong>核心动作：</strong>{{ stage.action }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alex Hormozi 72 小时轻资产测款试验 (72-Hour Smoke Test Sprint) -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Timer class="w-4 h-4 text-rose-500" />
            <span>Alex Hormozi · 72小时极简测款试验</span>
          </h3>
          <span class="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">精益创业</span>
        </div>

        <p class="text-xs text-ink-600 leading-relaxed">
          欧美顶流创业导师霍尔莫齐（$100M Offers）法则：<strong>不要盲目准备几个月才上线！用一个无法拒绝的 Offer，在 72 小时内验证真实付费意愿。</strong>
        </p>

        <!-- 核心 Offer 构筑 -->
        <div class="p-3 rounded-xl bg-rose-50/70 border border-rose-200/70 space-y-1.5">
          <div class="text-xs font-bold text-rose-900 flex items-center gap-1">
            <span>💎 专属黄金提案 (Core Offer)：</span>
          </div>
          <div class="text-xs text-rose-950 font-semibold bg-white/90 p-2 rounded-lg border border-rose-200/60 leading-relaxed">
            {{ report.archetype.hormoziSprint.coreOffer }}
          </div>
          <p class="text-[10px] text-rose-800 leading-tight">
            <strong>✨ 终极成效：</strong>{{ report.archetype.hormoziSprint.dreamOutcome }}
          </p>
        </div>

        <!-- 3 天测款行动清单 -->
        <div class="space-y-2">
          <div
            v-for="dayAction in report.archetype.hormoziSprint.days"
            :key="dayAction.day"
            class="p-2.5 rounded-xl bg-cream-50/90 border border-cream-200/80 space-y-1"
          >
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-rose-600">{{ dayAction.day }}</span>
              <span class="text-ink-800">{{ dayAction.title }}</span>
            </div>
            <div class="text-[11px] text-ink-700 leading-relaxed">
              <strong>行动目标：</strong>{{ dayAction.objective }}
            </div>
            <div class="text-[11px] text-ink-600 leading-relaxed bg-white p-2 rounded-md border border-cream-200">
              👉 <strong>执行SOP：</strong>{{ dayAction.action }}
            </div>
            <div class="text-[10px] text-amber-700 italic flex items-center gap-1 pt-0.5">
              <span>💡 锦囊：</span>
              <span>{{ dayAction.tip }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 商业合伙搭档指南 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Users class="w-4 h-4 text-blue-600" />
            <span>搞钱合伙人速配指南</span>
          </h3>
          <span class="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">合伙必看</span>
        </div>

        <div class="grid grid-cols-1 gap-2.5">
          <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs">
            <div class="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
              <span>🌟 天选黄金搭档：</span>
              <span class="text-emerald-900 font-extrabold">{{ report.archetype.partnerMatch.bestPartner }}</span>
            </div>
            <p class="text-[11px] text-emerald-950/80 leading-relaxed">
              {{ report.archetype.partnerMatch.bestReason }}
            </p>
          </div>

          <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
            <div class="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
              <span>⚠️ 避雷合伙组合：</span>
              <span class="text-amber-900 font-extrabold">{{ report.archetype.partnerMatch.dangerPartner }}</span>
            </div>
            <p class="text-[11px] text-amber-950/80 leading-relaxed">
              {{ report.archetype.partnerMatch.dangerReason }}
            </p>
          </div>
        </div>
      </div>

      <!-- 小红书高转化人设与主页搭建公式 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-coral-500" />
            <span>小红书高转化人设打造公式</span>
          </h3>
          <span class="text-[10px] text-coral-600 font-bold bg-coral-50 px-2 py-0.5 rounded">直接套用</span>
        </div>

        <!-- 专属定位与简介模板 -->
        <div class="p-3 rounded-xl bg-cream-50/90 border border-cream-200 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-ink-900">推荐人设：{{ report.archetype.xhsBioGuide.personaTitle }}</span>
            <button
              @click="copyBio"
              class="text-[11px] text-lavender-600 font-semibold hover:underline flex items-center gap-0.5"
            >
              <Copy class="w-3 h-3" />
              <span>{{ bioCopied ? '已复制' : '复制简介' }}</span>
            </button>
          </div>
          <pre class="p-2.5 rounded-lg bg-white border border-cream-200 text-[11px] text-ink-700 whitespace-pre-wrap font-sans leading-relaxed">{{ report.archetype.xhsBioGuide.bioTemplate }}</pre>
        </div>

        <!-- 3 大破局选题灵感 -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-bold text-ink-600">📌 首发置顶 3 篇高吸金选题库：</div>
          <div
            v-for="(title, idx) in report.archetype.xhsBioGuide.hookThemes"
            :key="idx"
            class="p-2 rounded-lg bg-white border border-cream-200 text-[11px] text-ink-800 leading-snug flex items-start gap-1.5"
          >
            <span class="font-mono text-lavender-600 font-bold">0{{ idx + 1 }}</span>
            <span>{{ title }}</span>
          </div>
        </div>
      </div>

      <!-- 破局成长锦囊 -->
      <div class="glass-card rounded-2xl p-4 border border-white shadow-card">
        <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5 mb-3">
          <CheckCircle2 class="w-4 h-4 text-emerald-600" />
          <span>商业体质跃迁锦囊</span>
        </h3>
        <ul class="space-y-2 text-xs text-ink-700 leading-relaxed">
          <li
            v-for="(adv, i) in report.archetype.growthAdvice"
            :key="i"
            class="flex items-start gap-2"
          >
            <span class="text-lavender-600 font-bold">•</span>
            <span>{{ adv }}</span>
          </li>
        </ul>
      </div>

      <!-- 底部版权与防伪水印 -->
      <div class="pt-2 text-center text-[10px] text-ink-400 space-y-1">
        <p>商业天赋与搞钱体质罗盘 · 2026 高清认证报告</p>
        <p>小红书虚拟爆款教案升级版 · 仅供个人商业优势探索</p>
      </div>
    </div>

    <!-- 底部固定动作栏 -->
    <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-cream-100 via-cream-100/95 to-transparent backdrop-blur-[2px] z-20 flex gap-3">
      <button
        @click="generatePoster"
        :disabled="isGeneratingPoster"
        class="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-lavender-600 to-indigo-600 text-white font-bold text-sm shadow-float hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
      >
        <Download v-if="!isGeneratingPoster" class="w-4 h-4" />
        <Loader2 v-else class="w-4 h-4 animate-spin" />
        <span>{{ isGeneratingPoster ? '正在生成高清海报...' : '生成保存高清海报' }}</span>
      </button>

      <button
        @click="copyShareText"
        class="py-3.5 px-4 rounded-2xl bg-white border border-lavender-300 text-ink-800 font-semibold text-xs shadow-card hover:bg-lavender-50 active:scale-[0.98] transition-all flex items-center justify-center gap-1 shrink-0"
      >
        <Copy class="w-4 h-4 text-lavender-600" />
        <span>{{ copySuccess ? '已复制文案!' : '复制晒图文案' }}</span>
      </button>

      <button
        @click="restart"
        class="w-11 h-11 rounded-2xl bg-white border border-cream-300 text-ink-500 hover:text-ink-900 active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-sm"
        title="重新测试"
      >
        <RotateCcw class="w-4 h-4" />
      </button>
    </div>

    <!-- 海报弹窗组件 -->
    <PosterModal
      :show="showPosterModal"
      :image-url="posterImageUrl"
      @close="showPosterModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas'
import {
  Compass,
  Crown,
  Sparkles,
  Zap,
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Download,
  Copy,
  RotateCcw,
  Loader2,
  Layers,
  Lock,
  Milestone,
  Users,
  Flame,
  Cpu,
  Timer,
  Radar as RadarIcon
} from 'lucide-vue-next'
import { useQuiz } from '../composables/useQuiz'
import { DIMENSIONS } from '../data/dimensions'
import RadarChart from './RadarChart.vue'
import PosterModal from './PosterModal.vue'

const { report, restart } = useQuiz()

const isGeneratingPoster = ref(false)
const showPosterModal = ref(false)
const posterImageUrl = ref('')
const copySuccess = ref(false)
const bioCopied = ref(false)

function copyBio() {
  if (!report.value) return
  const text = report.value.archetype.xhsBioGuide.bioTemplate
  navigator.clipboard.writeText(text).then(() => {
    bioCopied.value = true
    setTimeout(() => {
      bioCopied.value = false
    }, 2000)
  }).catch(() => {
    prompt('请复制简介：', text)
  })
}

onMounted(() => {
  // 礼花撒花特效
  try {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
    })
  } catch (e) {
    console.error(e)
  }
})

// 生成高清海报卡牌 (基于 html2canvas)
async function generatePoster() {
  if (isGeneratingPoster.value) return
  isGeneratingPoster.value = true

  // 记录当前滚动偏移量
  const prevScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  const prevScrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft

  try {
    const node = document.getElementById('report-poster-node')
    if (!node) return

    // 临时滚回原点，彻底防止 html2canvas 在移动端因页面滚动产生 offset 错位
    window.scrollTo(0, 0)
    await new Promise(resolve => setTimeout(resolve, 80))

    // 调用 html2canvas 渲染 2x 高清海报
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FAF7F2',
      scrollX: 0,
      scrollY: 0,
      windowWidth: node.scrollWidth || 390,
      windowHeight: node.scrollHeight || 1200,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedNode = clonedDoc.getElementById('report-poster-node')
        if (clonedNode) {
          clonedNode.style.boxShadow = 'none'
          clonedNode.style.margin = '0 auto'
          clonedNode.style.transform = 'none'
        }
      }
    })

    posterImageUrl.value = canvas.toDataURL('image/png')
    showPosterModal.value = true
  } catch (err) {
    console.error('Failed to generate poster:', err)
    alert('海报生成稍有延迟，建议截图直接保存哦！')
  } finally {
    // 恢复用户原有滚动位置
    window.scrollTo(prevScrollX, prevScrollY)
    isGeneratingPoster.value = false
  }
}

// 复制小红书小红心风格文案
function copyShareText() {
  if (!report.value) return
  const text = `刚在小红书测了超火的《商业天赋与搞钱体质罗盘》🧭！\n` +
    `我的专属商业原型是：【${report.value.archetype.title}】✨\n` +
    `主商业原力：${report.value.primaryDimension.name} (${report.value.dimensionPercentages[report.value.primaryDimension.key]}%)\n` +
    `副商业原力：${report.value.secondaryDimension.name} (${report.value.dimensionPercentages[report.value.secondaryDimension.key]}%)\n` +
    `搞钱能量指数高达：${report.value.overallIndex} / 100 🚀\n` +
    `被狠狠扎心到了：“${report.value.archetype.quote}”\n\n` +
    `大家也快去测测自己的隐形搞钱体质！\n` +
    `#商业天赋测试 #搞钱体质 #副业探索 #小红书爆款 #一人公司 #优势变现`

  navigator.clipboard.writeText(text).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2500)
  }).catch(() => {
    prompt('请长按复制以下文案：', text)
  })
}
</script>
