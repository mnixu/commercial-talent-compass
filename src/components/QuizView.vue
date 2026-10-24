<template>
  <div class="min-h-screen max-w-md mx-auto px-5 pt-6 pb-12 flex flex-col justify-between">
    <!-- 顶部进度与导航 -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <button
          v-if="currentQuestionIndex > 0"
          @click="prevQuestion"
          class="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900 transition-colors py-1 px-2 -ml-2 rounded-lg active:bg-lavender-100"
        >
          <ChevronLeft class="w-4 h-4" />
          <span>上一题</span>
        </button>
        <div v-else class="text-xs text-ink-400 font-medium">
          商业微情境直觉测试
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-xs font-bold text-lavender-700 tracking-wider">
            {{ String(currentQuestionIndex + 1).padStart(2, '0') }}
          </span>
          <span class="text-xs text-ink-400">/</span>
          <span class="text-xs text-ink-400">{{ totalQuestions }}</span>
        </div>
      </div>

      <!-- 动态进度条 -->
      <div class="w-full h-1.5 bg-cream-300/60 rounded-full overflow-hidden mb-6">
        <div
          class="h-full bg-gradient-to-r from-lavender-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>

      <!-- 微情境卡片主体 -->
      <div class="transition-all duration-300">
        <!-- 情境分类标签 -->
        <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-lavender-200/80 shadow-sm text-xs font-semibold text-lavender-600 mb-3">
          <Sparkles class="w-3.5 h-3.5" />
          <span>情境 {{ currentQuestionIndex + 1 }} · {{ currentQuestion.scene }}</span>
        </div>

        <!-- 题目主标题 -->
        <h2 class="text-lg font-bold text-ink-900 leading-snug mb-2">
          {{ currentQuestion.title }}
        </h2>

        <!-- 情境提点 -->
        <p class="text-xs text-ink-500 mb-6 leading-relaxed flex items-center gap-1">
          <Info class="w-3.5 h-3.5 text-lavender-500 shrink-0" />
          <span>{{ currentQuestion.context }}</span>
        </p>

        <!-- 选项列表 -->
        <div class="space-y-3">
          <button
            v-for="(option, idx) in currentQuestion.options"
            :key="option.id"
            @click="onSelect(option.id)"
            class="w-full text-left p-4 rounded-2xl transition-all duration-200 relative group flex items-start gap-3.5"
            :class="[
              isSelected(option.id)
                ? 'bg-lavender-100/90 border-2 border-lavender-600 shadow-soft scale-[1.01]'
                : 'glass-card border border-white/80 hover:border-lavender-300 shadow-card active:scale-[0.99]'
            ]"
          >
            <!-- 选项序号字母徽章 -->
            <div
              class="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors mt-0.5"
              :class="[
                isSelected(option.id)
                  ? 'bg-lavender-600 text-white'
                  : 'bg-cream-200 text-ink-700 group-hover:bg-lavender-200 group-hover:text-lavender-800'
              ]"
            >
              {{ ['A', 'B', 'C', 'D'][idx] }}
            </div>

            <!-- 选项文字内容 -->
            <div class="flex-1 self-center">
              <p
                class="text-sm font-medium leading-relaxed transition-colors"
                :class="isSelected(option.id) ? 'text-lavender-900 font-semibold' : 'text-ink-800'"
              >
                {{ option.text }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部直觉提醒 -->
    <div class="text-center pt-8">
      <p class="text-[11px] text-ink-400">
        💡 凭第一直觉快速勾选，无需反复纠结，答案越真切报告越精准
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, Sparkles, Info } from 'lucide-vue-next'
import { useQuiz } from '../composables/useQuiz'

const {
  currentQuestionIndex,
  currentQuestion,
  totalQuestions,
  progressPercent,
  answers,
  selectOption,
  prevQuestion
} = useQuiz()

function isSelected(optId: string) {
  return answers.value[currentQuestion.value.id] === optId
}

function onSelect(optId: string) {
  selectOption(optId)
}
</script>
