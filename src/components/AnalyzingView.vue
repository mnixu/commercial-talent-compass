<template>
  <div class="min-h-screen max-w-md mx-auto px-6 flex flex-col items-center justify-center text-center">
    <!-- 罗盘旋转动效区 -->
    <div class="relative w-48 h-48 mb-8 flex items-center justify-center">
      <!-- 外圈脉冲光晕 -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-lavender-400/20 via-pink-400/20 to-amber-400/20 animate-ping opacity-60"></div>
      
      <!-- 外圈渐变虚线环 (旋转) -->
      <div class="absolute inset-2 rounded-full border-2 border-dashed border-lavender-400/60 animate-spin" style="animation-duration: 12s;"></div>
      
      <!-- 中圈逆向旋转环 -->
      <div class="absolute inset-6 rounded-full border border-pink-400/40 animate-spin" style="animation-duration: 8s; animation-direction: reverse;"></div>

      <!-- 中心罗盘核心球体 -->
      <div class="relative w-24 h-24 rounded-full bg-white shadow-float flex flex-col items-center justify-center border border-lavender-200/80">
        <Compass class="w-10 h-10 text-lavender-600 animate-pulse" />
        <span class="text-xs font-black tracking-tight text-lavender-800 mt-1">
          {{ displayPercent }}%
        </span>
      </div>

      <!-- 环绕粒子徽标 -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 p-1 rounded-full bg-white shadow-sm border border-lavender-200">
        <Sparkles class="w-3.5 h-3.5 text-amber-500" />
      </div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 p-1 rounded-full bg-white shadow-sm border border-lavender-200">
        <Zap class="w-3.5 h-3.5 text-pink-500" />
      </div>
    </div>

    <!-- 动态进度文案 -->
    <div class="space-y-2 max-w-xs">
      <h3 class="text-base font-bold text-ink-900 tracking-tight">
        {{ currentStepTitle }}
      </h3>
      <p class="text-xs text-ink-500 h-5 leading-normal">
        {{ currentStepDesc }}
      </p>
    </div>

    <!-- 底部状态小注 -->
    <div class="mt-12 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lavender-50 border border-lavender-200/50 text-[11px] text-lavender-600">
      <span class="w-1.5 h-1.5 rounded-full bg-lavender-500 animate-ping"></span>
      <span>正在构建独一无二的专属商业基因报告</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Compass, Sparkles, Zap } from 'lucide-vue-next'

const displayPercent = ref(12)
const steps = [
  { title: '正在提取微情境决策模型...', desc: '拆解您在金钱、资源与人际中的底层本能' },
  { title: '正在测算 6 维商业原力...', desc: '量化流量、产品、情绪、资源、洞察与执行权重' },
  { title: '正在比对 8 大吸金体质原型...', desc: '对标商业名人基因库与高频变现路径' },
  { title: '正在生成高定专属报告...', desc: '定制本周可执行的轻资产副业破局清单' }
]

const currentStepTitle = ref(steps[0].title)
const currentStepDesc = ref(steps[0].desc)

let timer: any = null
let stepTimer: any = null

onMounted(() => {
  // 数字跳动递增到 100%
  timer = setInterval(() => {
    if (displayPercent.value < 98) {
      displayPercent.value += Math.floor(Math.random() * 8) + 4
      if (displayPercent.value > 98) displayPercent.value = 98
    }
  }, 160)

  let stepIdx = 0
  stepTimer = setInterval(() => {
    stepIdx = (stepIdx + 1) % steps.length
    currentStepTitle.value = steps[stepIdx].title
    currentStepDesc.value = steps[stepIdx].desc
  }, 600)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (stepTimer) clearInterval(stepTimer)
})
</script>
