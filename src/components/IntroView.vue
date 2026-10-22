<template>
  <div class="min-h-screen max-w-md mx-auto px-5 pt-8 pb-24 flex flex-col justify-between">
    <!-- 顶部状态小标签 -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-semibold tracking-wide border border-lavender-200/60 shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-lavender-600 animate-pulse" />
          <span>2026 小红书热门商业体质测验</span>
        </div>
        <div class="text-[11px] font-medium text-ink-500 bg-cream-200/80 px-2.5 py-0.5 rounded-md">
          限时免费版
        </div>
      </div>

      <!-- 主标题区 -->
      <div class="text-center space-y-3 mb-6">
        <div class="inline-block relative">
          <h1 class="text-3xl font-extrabold tracking-tight text-ink-900 leading-tight">
            商业天赋与<br />
            <span class="bg-gradient-to-r from-lavender-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              搞钱体质罗盘
            </span>
          </h1>
          <div class="absolute -top-2 -right-4 text-xs font-black px-1.5 py-0.5 rounded bg-coral-500 text-white transform rotate-12 shadow-sm">
            PRO
          </div>
        </div>

        <p class="text-sm text-ink-700 leading-relaxed px-2 font-normal">
          告别晦涩枯燥的心理学术语。<br />
          16 道微情境直击本能，解锁你的专属商业原型、6维天赋雷达与轻资产副业破局清单。
        </p>
      </div>

      <!-- 实时滚动用户背书提示 -->
      <div class="glass-card rounded-xl px-3.5 py-2.5 mb-7 flex items-center justify-between shadow-card border border-lavender-200/40">
        <div class="flex items-center gap-2 overflow-hidden text-xs text-ink-700">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="truncate font-medium">{{ currentLiveTicker }}</span>
        </div>
        <div class="text-[11px] text-lavender-600 font-semibold shrink-0">
          已测 56,218+ 人
        </div>
      </div>

      <!-- 核心价值亮点卡片 -->
      <div class="space-y-3 mb-8">
        <div class="glass-card p-4 rounded-2xl flex items-start gap-3.5 border border-white/80 shadow-card hover:border-lavender-300 transition-all">
          <div class="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center shrink-0 text-lavender-600">
            <Compass class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-ink-900 mb-0.5">6维商业原力全景雷达</h3>
            <p class="text-xs text-ink-500 leading-normal">
              涵盖流量嗅觉、产品包装、情绪价值、资源杠杆、敏锐洞察与交付闭环力。
            </p>
          </div>
        </div>

        <div class="glass-card p-4 rounded-2xl flex items-start gap-3.5 border border-white/80 shadow-card hover:border-pink-300 transition-all">
          <div class="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0 text-pink-600">
            <Crown class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-ink-900 mb-0.5">8大爆款商业搞钱原型</h3>
            <p class="text-xs text-ink-500 leading-normal">
              揭晓你是【暗线操盘手】、【感知力美学买手】还是【超级个体】，对标名人基因。
            </p>
          </div>
        </div>

        <div class="glass-card p-4 rounded-2xl flex items-start gap-3.5 border border-white/80 shadow-card hover:border-amber-300 transition-all">
          <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-600">
            <Rocket class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-ink-900 mb-0.5">量身定制轻资产副业清单</h3>
            <p class="text-xs text-ink-500 leading-normal">
              拒绝无用鸡汤，为你匹配 3 条最适副业方向，并附上本周即可落地的第一步行动 SOP。
            </p>
          </div>
        </div>
      </div>

      <!-- 答题需知说明 -->
      <div class="flex items-center justify-center gap-4 text-xs text-ink-400 mb-4">
        <span class="flex items-center gap-1">
          <Clock class="w-3.5 h-3.5" /> 预计耗时 3 分钟
        </span>
        <span>•</span>
        <span class="flex items-center gap-1">
          <ShieldCheck class="w-3.5 h-3.5" /> 纯前端隐私零上传
        </span>
        <span>•</span>
        <span class="flex items-center gap-1">
          <Share2 class="w-3.5 h-3.5" /> 支持一键生成海报
        </span>
      </div>
    </div>

    <!-- 底部常驻开启按钮 -->
    <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-5 bg-gradient-to-t from-cream-100 via-cream-100/95 to-transparent backdrop-blur-[2px] z-20">
      <button
        @click="startQuiz"
        class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-lavender-600 via-purple-600 to-indigo-600 text-white font-bold text-base shadow-float hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group animate-pulse-subtle"
      >
        <span>开启我的商业体质测试</span>
        <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Sparkles,
  Compass,
  Crown,
  Rocket,
  Clock,
  ShieldCheck,
  Share2,
  ArrowRight
} from 'lucide-vue-next'
import { useQuiz } from '../composables/useQuiz'

const { startQuiz } = useQuiz()

const tickerList = [
  '刚刚 @林小夕 测出了【感知力天花板美学买手】',
  '刚刚 @阿楚 测出了【暗线操盘手】',
  '刚刚 @Vivian 测出了【超级超级个体】',
  '刚刚 @Kevin 测出了【信息差套利猎手】',
  '刚刚 @麦子 测出了【私域高客单磁场王】',
  '刚刚 @周周 测出了【爆款风向标捕手】'
]

const currentLiveTicker = ref(tickerList[0])
let tickerTimer: any = null

onMounted(() => {
  let idx = 0
  tickerTimer = setInterval(() => {
    idx = (idx + 1) % tickerList.length
    currentLiveTicker.value = tickerList[idx]
  }, 2800)
})

onUnmounted(() => {
  if (tickerTimer) clearInterval(tickerTimer)
})
</script>
