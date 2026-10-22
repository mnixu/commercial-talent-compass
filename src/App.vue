<template>
  <div class="min-h-screen bg-cream-100 flex justify-center">
    <!-- 移动端优先容器（在宽屏上呈现 iPhone 优雅视窗与微阴影，在手机上自然撑满） -->
    <main class="w-full max-w-[440px] min-h-screen bg-cream-50/50 shadow-2xl relative overflow-hidden flex flex-col">
      <transition name="fade" mode="out-in">
        <IntroView v-if="viewState === 'intro'" key="intro" />
        <QuizView v-else-if="viewState === 'quiz'" key="quiz" />
        <AnalyzingView v-else-if="viewState === 'analyzing'" key="analyzing" />
        <ReportView v-else-if="viewState === 'report'" key="report" />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from './composables/useQuiz'
import IntroView from './components/IntroView.vue'
import QuizView from './components/QuizView.vue'
import AnalyzingView from './components/AnalyzingView.vue'
import ReportView from './components/ReportView.vue'

const { viewState } = useQuiz()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

