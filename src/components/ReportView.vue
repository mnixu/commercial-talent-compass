<template>
  <div v-if="report" class="min-h-screen max-w-md mx-auto px-4 pt-6 pb-28">
    <!-- 主展示区域 -->
    <div class="space-y-4">
      
      <!-- 1. 小红书 3:4 黄金比例海报生成目标卡片 -->
      <div
        id="poster-card-node"
        class="relative overflow-hidden rounded-3xl p-5 text-white shadow-float border border-white/20"
        :style="{ background: `linear-gradient(145deg, ${report.archetype.archetypeColor.from} 0%, ${report.archetype.archetypeColor.to} 100%)` }"
      >
        <!-- 背景微光与纹理 -->
        <div class="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div class="absolute top-3 right-4 opacity-15">
          <Crown class="w-16 h-16" />
        </div>

        <!-- 顶部标签与编号 -->
        <div class="flex items-center justify-between pb-3 border-b border-white/15 text-[11px] mb-3">
          <div class="flex items-center gap-1.5 font-bold tracking-wider">
            <Compass class="w-3.5 h-3.5 text-amber-300" />
            <span>2026 商业天赋与搞钱体质罗盘</span>
          </div>
          <span class="font-mono bg-white/20 px-2 py-0.5 rounded text-[10px]">
            {{ report.userReportId }}
          </span>
        </div>

        <!-- 原型大标题 -->
        <div class="space-y-1 mb-3">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm"
               :style="{ backgroundColor: report.archetype.archetypeColor.badgeBg, color: report.archetype.archetypeColor.badgeText }">
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ report.archetype.badge }}</span>
          </div>
          <h1 class="text-3xl font-black tracking-tight text-white">
            {{ report.archetype.title }}
          </h1>
          <p class="text-xs text-white/90 font-medium">
            {{ report.archetype.subtitle }}
          </p>
        </div>

        <!-- 搞钱标签云 -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span
            v-for="tag in report.archetype.tags"
            :key="tag"
            class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/15 text-white backdrop-blur-sm"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- 3 大搞钱属性条 -->
        <div class="grid grid-cols-3 gap-2 p-2 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 text-center mb-4">
          <div>
            <div class="text-[10px] text-white/70">搞钱体质</div>
            <div class="text-xs font-black text-emerald-300 truncate px-0.5">{{ report.archetype.wealthEnergyTag.split(' ')[0] }}</div>
          </div>
          <div class="border-x border-white/15">
            <div class="text-[10px] text-white/70">首选副业</div>
            <div class="text-xs font-black text-amber-300 truncate px-0.5">{{ report.archetype.sideHustles[0]?.name.split(' ')[0] }}</div>
          </div>
          <div>
            <div class="text-[10px] text-white/70">主导天赋</div>
            <div class="text-xs font-bold text-white truncate px-0.5">{{ report.primaryDimension.name }}</div>
          </div>
        </div>

        <!-- 六维雷达图嵌入 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 mb-4 flex flex-col items-center">
          <div class="text-[11px] font-bold text-white/90 mb-1 flex items-center gap-1 self-start">
            <RadarIcon class="w-3.5 h-3.5 text-amber-300" />
            <span>六维商业天赋全景</span>
          </div>
          <div class="w-full flex justify-center scale-95 -my-2">
            <RadarChart :scores="report.dimensionPercentages" />
          </div>
        </div>

        <!-- 核心搞钱金句 -->
        <div class="p-3 rounded-xl bg-black/30 border border-white/15 text-xs text-white/95 leading-relaxed italic mb-3">
          “{{ report.archetype.quote }}”
        </div>

        <!-- 底部认证印记 -->
        <div class="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] text-white/70">
          <span>击败全国 96% 同龄搞钱探索者</span>
          <span>小红书爆款体质认证</span>
        </div>
      </div>

      <!-- 2. 搞钱能量指数概览 -->
      <div class="glass-card rounded-2xl p-4 flex items-center justify-between border border-lavender-200/60 shadow-card bg-white">
        <div>
          <div class="text-[11px] font-bold text-lavender-600 uppercase tracking-wider mb-0.5">Overall Index</div>
          <div class="text-base font-extrabold text-ink-900">综合搞钱能量指数</div>
          <div class="text-[11px] text-ink-500">主天赋：{{ report.primaryDimension.name }} · 副天赋：{{ report.secondaryDimension.name }}</div>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-black bg-gradient-to-r from-lavender-600 to-pink-600 bg-clip-text text-transparent">
            {{ report.overallIndex }}
          </span>
          <span class="text-xs font-bold text-ink-400">/100</span>
        </div>
      </div>

      <!-- 3. 六维商业天赋能力拆解 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <RadarIcon class="w-4 h-4 text-lavender-600" />
            <span>6维商业天赋能力拆解</span>
          </h3>
          <span class="text-[10px] text-lavender-600 font-semibold bg-lavender-50 px-2 py-0.5 rounded">
            雷达得分
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div
            v-for="(dimKey) in ['traffic', 'product', 'emotion', 'resource', 'insight', 'execution'] as const"
            :key="dimKey"
            class="p-2.5 rounded-xl bg-cream-50/80 border border-cream-200/80"
          >
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-medium text-ink-800">{{ DIMENSIONS[dimKey].name }}</span>
              <span class="font-bold font-mono" :style="{ color: DIMENSIONS[dimKey].color }">
                {{ report.dimensionPercentages[dimKey] }}%
              </span>
            </div>
            <div class="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden mb-1">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{
                  width: `${report.dimensionPercentages[dimKey]}%`,
                  backgroundColor: DIMENSIONS[dimKey].color
                }"
              ></div>
            </div>
            <p class="text-[10px] text-ink-500 line-clamp-1">{{ DIMENSIONS[dimKey].shortDesc }}</p>
          </div>
        </div>
      </div>

      <!-- 4. 商业体质大白话深度解码 (含微特征对号入座) -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3.5">
        <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
          <Zap class="w-4 h-4 text-amber-500" />
          <span>商业体质深度解码</span>
        </h3>

        <!-- 搞钱本能概述 -->
        <div class="text-xs text-ink-800 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
          <div class="font-bold text-amber-950 mb-1 flex items-center gap-1">
            <span>💡 你是怎么把钱赚到的：</span>
          </div>
          {{ report.archetype.overview }}
        </div>

        <!-- 日常微习惯对号入座 (吸收对标竞品优势) -->
        <div v-if="report.archetype.dailyHabits?.length" class="p-3.5 rounded-xl bg-lavender-50/60 border border-lavender-200/70 space-y-2">
          <div class="text-xs font-bold text-lavender-900 flex items-center gap-1.5">
            <CheckCircle2 class="w-3.5 h-3.5 text-lavender-600" />
            <span>你最典型的日常行为特征（对号入座）：</span>
          </div>
          <ul class="space-y-1.5 text-xs text-ink-700">
            <li
              v-for="(habit, idx) in report.archetype.dailyHabits"
              :key="idx"
              class="flex items-start gap-1.5"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-lavender-500 mt-1.5 shrink-0"></span>
              <span>{{ habit }}</span>
            </li>
          </ul>
        </div>

        <!-- 心流发光区 vs 踩雷劝退区 -->
        <div class="space-y-2.5">
          <div class="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs">
            <div class="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
              <Sparkles class="w-3.5 h-3.5 text-emerald-600" />
              <span>你的搞钱爽区（干这个最来钱）：</span>
            </div>
            <p class="text-emerald-950 leading-relaxed">
              {{ report.archetype.flowState }}
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/80 text-xs">
            <div class="font-bold text-rose-900 flex items-center gap-1.5 mb-1">
              <AlertTriangle class="w-3.5 h-3.5 text-rose-600" />
              <span>核心避坑提醒（为什么以前不顺）：</span>
            </div>
            <p class="text-rose-950 leading-relaxed">
              {{ report.archetype.dangerZone }}
            </p>
          </div>
        </div>
      </div>

      <!-- 5. 适合你的 3 大轻资产搞钱副业 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Briefcase class="w-4 h-4 text-lavender-600" />
            <span>量身定制的 3 个轻资产副业</span>
          </h3>
          <span class="text-[10px] text-coral-600 font-bold bg-coral-50 px-2 py-0.5 rounded">零成本起步</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in report.archetype.sideHustles"
            :key="item.name"
            class="p-3.5 rounded-xl bg-cream-50/60 border border-cream-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-md bg-lavender-100 text-lavender-700 text-xs font-bold flex items-center justify-center">
                  {{ idx + 1 }}
                </span>
                <span class="text-xs font-bold text-ink-900">{{ item.name }}</span>
              </div>
              <span class="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                契合度 {{ item.fitScore }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px] text-ink-600 mb-2 py-1.5 px-2 bg-white rounded-lg border border-cream-200/60">
              <div>门槛难度：<span class="font-semibold text-ink-900">{{ item.difficulty }}</span></div>
              <div>赚钱模式：<span class="font-semibold text-ink-900">{{ item.earningModel }}</span></div>
            </div>

            <div class="text-xs text-ink-800 leading-relaxed bg-white/90 p-2 rounded-lg border border-cream-200 flex items-start gap-1.5">
              <span class="text-[10px] font-bold text-white bg-lavender-600 px-1 rounded shrink-0 mt-0.5">明天行动</span>
              <span><strong>第一步动作：</strong>{{ item.firstStep }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. ⚠️ 建议谨慎的副业方向（避坑黑榜，吸收竞品优势） -->
      <div v-if="report.archetype.cautionHustles?.length" class="glass-card rounded-2xl p-4 border border-rose-200 shadow-card bg-rose-50/40 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-rose-900 flex items-center gap-1.5">
            <ShieldAlert class="w-4 h-4 text-rose-600" />
            <span>建议谨慎的方向（避坑劝退黑榜）</span>
          </h3>
          <span class="text-[10px] text-rose-600 font-bold bg-rose-100 px-2 py-0.5 rounded">极易亏钱</span>
        </div>

        <p class="text-xs text-rose-800/80 leading-relaxed">
          不要拿自己的弱项去跟别人的本能硬拼，以下方向与你的体质天然相冲，极易陷入内耗或资金断裂：
        </p>

        <div class="space-y-2">
          <div
            v-for="(caution, i) in report.archetype.cautionHustles"
            :key="i"
            class="p-2.5 rounded-xl bg-white/90 border border-rose-200 text-xs text-rose-950 flex items-start gap-2 shadow-2xs"
          >
            <span class="text-rose-500 font-bold shrink-0">❌</span>
            <span>{{ caution }}</span>
          </div>
        </div>
      </div>

      <!-- 7. 副业 3 阶成长路线图 (Roadmap 时间轴) -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Calendar class="w-4 h-4 text-emerald-600" />
            <span>分阶段副业成长路径</span>
          </h3>
          <span class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">起步节奏</span>
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

      <!-- 8. 🎁 关键抓手：专属实操手册领取与搞钱搭子圈入口 (赋予测试实质意义) -->
      <div class="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-lavender-600 via-indigo-600 to-purple-700 text-white shadow-float space-y-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Gift class="w-4 h-4 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div class="text-[10px] font-bold text-amber-300 tracking-wider">专属落地大礼包</div>
              <h4 class="text-sm font-black">{{ report.archetype.guideDownload?.manualTitle || '《7天轻资产副业破局手册》' }}</h4>
            </div>
          </div>
          <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">免费开放</span>
        </div>

        <p class="text-xs text-white/90 leading-relaxed">
          测试只是第一步！我们为<strong>【{{ report.archetype.title }}】</strong>专属梳理了落地操作指引，内含：<strong>{{ report.archetype.guideDownload?.keyTakeaway }}</strong>。
        </p>

        <button
          @click="showGiftModal = true"
          class="w-full py-3 rounded-xl bg-white text-indigo-700 font-extrabold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <BookOpen class="w-3.5 h-3.5 text-indigo-600" />
          <span>点击领取完整手册 & 加入同频搭子圈</span>
          <ArrowRight class="w-3.5 h-3.5 text-indigo-600" />
        </button>
      </div>

      <!-- 9. 金钱潜意识卡点与心魔突破 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Lock class="w-4 h-4 text-pink-600" />
            <span>你搞钱最大的“隐形心魔”</span>
          </h3>
          <span class="text-[10px] text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded">突破卡点</span>
        </div>

        <div class="p-3.5 rounded-xl bg-pink-50/70 border border-pink-200 space-y-2">
          <div class="text-xs font-bold text-pink-900 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>隐形卡点：{{ report.archetype.moneyBlock.blockTitle }}</span>
          </div>
          <p class="text-[11px] text-pink-950 leading-relaxed">
            <strong>扎心剖析：</strong>{{ report.archetype.moneyBlock.subconsciousCause }}
          </p>
          <div class="p-2.5 rounded-lg bg-white/95 border border-pink-200 text-xs text-pink-900 italic font-medium leading-relaxed">
            💡 <strong>破局心法：</strong>“{{ report.archetype.moneyBlock.cureMantra }}”
          </div>
        </div>
      </div>

      <!-- 10. 商业名人同频基因 -->
      <div class="rounded-2xl p-4 bg-gradient-to-r from-purple-50/90 to-lavender-50 border border-lavender-200/80 shadow-sm flex items-start">
        <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lavender-700 font-black text-sm shrink-0 border border-lavender-200 mr-3 mt-0.5">
          {{ report.archetype.celebrity.name.slice(0, 1) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-0.5">
            <h4 class="text-xs font-bold text-ink-900 truncate">
              商业名人对标：{{ report.archetype.celebrity.name }}
            </h4>
            <span class="text-[10px] text-lavender-600 font-semibold bg-white/90 px-2 py-0.5 rounded border border-lavender-200/50 shrink-0 ml-1">
              同款基因
            </span>
          </div>
          <p class="text-[11px] text-ink-500 mb-1.5">{{ report.archetype.celebrity.role }}</p>
          <p class="text-xs text-ink-700 italic border-l-2 border-lavender-400 pl-2 leading-relaxed">
            “{{ report.archetype.celebrity.quote }}”
          </p>
        </div>
      </div>

      <!-- 11. 搞钱合伙人速配指南 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Users class="w-4 h-4 text-blue-600" />
            <span>搞钱合伙人速配指南（红黑榜）</span>
          </h3>
          <span class="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">合伙必看</span>
        </div>

        <div class="space-y-2.5">
          <div class="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
            <div class="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
              <span>🌟 天选搞钱搭子：</span>
              <span class="text-emerald-950 font-black">{{ report.archetype.partnerMatch.bestPartner }}</span>
            </div>
            <p class="text-[11px] text-emerald-950 leading-relaxed">
              {{ report.archetype.partnerMatch.bestReason }}
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
            <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <span>⚠️ 劝退避雷搭子：</span>
              <span class="text-amber-950 font-black">{{ report.archetype.partnerMatch.dangerPartner }}</span>
            </div>
            <p class="text-[11px] text-amber-950 leading-relaxed">
              {{ report.archetype.partnerMatch.dangerReason }}
            </p>
          </div>
        </div>
      </div>

      <!-- 12. 小红书直接抄作业模板 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-coral-500" />
            <span>小红书搞钱人设打造公式</span>
          </h3>
          <span class="text-[10px] text-coral-600 font-bold bg-coral-50 px-2 py-0.5 rounded">直接套用</span>
        </div>

        <!-- 专属定位与简介模板 -->
        <div class="p-3.5 rounded-xl bg-cream-50 border border-cream-200 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-ink-900">推荐人设：{{ report.archetype.xhsBioGuide.personaTitle }}</span>
            <button
              @click="copyBio"
              class="text-[11px] text-lavender-600 font-semibold hover:underline flex items-center gap-0.5 bg-lavender-50 px-2 py-0.5 rounded"
            >
              <Copy class="w-3 h-3" />
              <span>{{ bioCopied ? '已复制到剪贴板' : '一键复制简介' }}</span>
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
            class="p-2.5 rounded-lg bg-white border border-cream-200 text-xs text-ink-800 leading-snug flex items-start gap-2 shadow-2xs"
          >
            <span class="font-mono text-lavender-600 font-bold">0{{ idx + 1 }}</span>
            <span>{{ title }}</span>
          </div>
        </div>
      </div>

      <!-- 13. 搞钱跃迁锦囊 -->
      <div class="glass-card rounded-2xl p-4 border border-lavender-200/60 shadow-card bg-white">
        <h3 class="text-sm font-bold text-ink-900 flex items-center gap-1.5 mb-3">
          <CheckCircle2 class="w-4 h-4 text-emerald-600" />
          <span>搞钱体质破局锦囊</span>
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

      <!-- 底部小字 -->
      <div class="pt-2 text-center text-[10px] text-ink-400 space-y-1">
        <p>商业天赋与搞钱体质罗盘 · 2026 高清认证报告</p>
        <p>仅供个人商业优势与轻资产副业探索</p>
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
        <span>{{ isGeneratingPoster ? '正在生成小红书海报...' : '生成保存小红书海报' }}</span>
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

    <!-- 🎁 手册领取与私域搭子圈弹窗 (赋予用户实质抓手) -->
    <div
      v-if="showGiftModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div class="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-float space-y-4 border border-lavender-200 animate-in zoom-in-95 duration-200">
        <!-- 弹窗关闭按钮 -->
        <button
          @click="showGiftModal = false"
          class="absolute top-4 right-4 w-7 h-7 rounded-full bg-cream-200 flex items-center justify-center text-ink-500 hover:text-ink-900"
        >
          <X class="w-4 h-4" />
        </button>

        <div class="text-center pt-2 space-y-1">
          <div class="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
            <BookOpen class="w-6 h-6" />
          </div>
          <h3 class="text-base font-black text-ink-900">
            {{ report.archetype.guideDownload?.manualTitle }}
          </h3>
          <p class="text-xs text-lavender-600 font-medium">
            {{ report.archetype.guideDownload?.manualPages }} · 专为【{{ report.archetype.title }}】定制
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2 text-xs text-ink-700">
          <div class="font-bold text-ink-900">📦 手册包含的核心实操干货：</div>
          <p class="leading-relaxed text-ink-600">
            • {{ report.archetype.guideDownload?.keyTakeaway }}<br />
            • 常见 3 种新手亏钱陷阱红线自查表<br />
            • 同原型学员 30 天月入过万拆解案例
          </p>
        </div>

        <!-- 领取方式与暗号 -->
        <div class="p-3 rounded-2xl bg-lavender-50 border border-lavender-200 space-y-2 text-center">
          <div class="text-[11px] text-lavender-800 font-medium">
            已集结 <strong>1,280+</strong> 位同原型伙伴 · 免费领取
          </div>
          <div class="flex items-center justify-center gap-2 bg-white py-2 px-3 rounded-xl border border-lavender-300">
            <span class="text-xs font-mono font-bold text-lavender-700">
              暗号：{{ giftSecretCode }}
            </span>
            <button
              @click="copySecretCode"
              class="text-[11px] bg-lavender-600 text-white font-bold px-2 py-0.5 rounded hover:bg-lavender-700"
            >
              {{ codeCopied ? '已复制' : '复制暗号' }}
            </button>
          </div>
          <p class="text-[10px] text-ink-400">
            在小红书/微信回复上述暗号，即可自动下发完整手册并进入搭子圈
          </p>
        </div>

        <button
          @click="showGiftModal = false"
          class="w-full py-3 rounded-xl bg-cream-200 text-ink-800 font-bold text-xs hover:bg-cream-300 transition-all"
        >
          已了解，返回报告
        </button>
      </div>
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
import { ref, computed, onMounted } from 'vue'
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
  Lock,
  Users,
  Radar as RadarIcon,
  Gift,
  BookOpen,
  X,
  ArrowRight,
  ShieldAlert,
  Calendar
} from 'lucide-vue-next'
import { useQuiz } from '../composables/useQuiz'
import { DIMENSIONS } from '../data/dimensions'
import RadarChart from './RadarChart.vue'
import PosterModal from './PosterModal.vue'

const { report, restart } = useQuiz()

const isGeneratingPoster = ref(false)
const showPosterModal = ref(false)
const showGiftModal = ref(false)
const posterImageUrl = ref('')
const copySuccess = ref(false)
const bioCopied = ref(false)
const codeCopied = ref(false)

const giftSecretCode = computed(() => {
  if (!report.value) return '搞钱888'
  return `${report.value.archetype.title}888`
})

function copySecretCode() {
  const text = giftSecretCode.value
  navigator.clipboard.writeText(text).then(() => {
    codeCopied.value = true
    setTimeout(() => {
      codeCopied.value = false
    }, 2000)
  }).catch(() => {
    prompt('请复制暗号：', text)
  })
}

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

// 生成小红书 3:4 黄金比例海报 (聚焦于顶部精美角色认证卡片)
async function generatePoster() {
  if (isGeneratingPoster.value) return
  isGeneratingPoster.value = true

  const prevScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  const prevScrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft

  try {
    const node = document.getElementById('poster-card-node')
    if (!node) return

    window.scrollTo(0, 0)
    await new Promise(resolve => setTimeout(resolve, 80))

    const canvas = await html2canvas(node, {
      scale: 3, // 3x 超清渲染
      useCORS: true,
      backgroundColor: null,
      scrollX: 0,
      scrollY: 0,
      windowWidth: node.scrollWidth || 390,
      windowHeight: node.scrollHeight || 600,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedNode = clonedDoc.getElementById('poster-card-node')
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
    window.scrollTo(prevScrollX, prevScrollY)
    isGeneratingPoster.value = false
  }
}

// 复制小红书文案
function copyShareText() {
  if (!report.value) return
  const text = `刚在小红书测了超火的《商业天赋与搞钱体质罗盘》🧭！\n` +
    `我的专属商业原型是：【${report.value.archetype.title}】✨\n` +
    `体质分类：${report.value.archetype.wealthEnergyTag} | 首选副业：${report.value.archetype.sideHustles[0]?.name}\n` +
    `主天赋：${report.value.primaryDimension.name} (${report.value.dimensionPercentages[report.value.primaryDimension.key]}%)\n` +
    `综合搞钱指数：${report.value.overallIndex} / 100 🚀\n` +
    `最扎心的一句话：“${report.value.archetype.quote}”\n` +
    `避坑提醒：${report.value.archetype.cautionHustles?.[0] || '不适合重资产盲目开店'}\n\n` +
    `有同款体质或者互补的搞钱搭子吗？快来认领！\n` +
    `#商业天赋测试 #搞钱体质 #小红书爆款 #副业探索 #轻资产搞钱 #一人公司`

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
