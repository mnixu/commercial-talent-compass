<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all"
  >
    <div class="relative w-full max-w-sm max-h-[90vh] bg-cream-100 rounded-3xl p-4 shadow-float flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <!-- 弹窗顶栏 -->
      <div class="flex items-center justify-between pb-3 mb-2 border-b border-cream-300">
        <div class="flex items-center gap-1.5 text-xs font-bold text-ink-900">
          <Sparkles class="w-4 h-4 text-lavender-600" />
          <span>长图海报已生成</span>
        </div>
        <button
          @click="$emit('close')"
          class="w-7 h-7 rounded-full bg-cream-200 flex items-center justify-center text-ink-500 hover:text-ink-900 active:scale-95"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- 提示文字 -->
      <div class="bg-lavender-50 border border-lavender-200/60 rounded-xl px-3 py-1.5 text-[11px] text-lavender-700 text-center mb-3">
        📱 手机端可<strong>长按下方图片</strong>直接“保存到相册”
      </div>

      <!-- 海报图片预览滚动区 -->
      <div class="flex-1 overflow-y-auto rounded-2xl bg-white shadow-inner border border-cream-200 hide-scrollbar p-1">
        <img
          :src="imageUrl"
          alt="商业天赋测评海报"
          class="w-full h-auto rounded-xl object-contain pointer-events-auto"
        />
      </div>

      <!-- 底部操作按钮 -->
      <div class="pt-3 mt-1 flex gap-2">
        <button
          @click="downloadImage"
          class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-lavender-600 to-indigo-600 text-white font-bold text-xs shadow-md active:scale-98 flex items-center justify-center gap-1.5"
        >
          <Download class="w-3.5 h-3.5" />
          <span>点击下载海报</span>
        </button>
        <button
          @click="$emit('close')"
          class="py-3 px-4 rounded-xl bg-cream-200 text-ink-700 font-medium text-xs active:scale-98"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Download, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  imageUrl: string
}>()

defineEmits(['close'])

function downloadImage() {
  if (!props.imageUrl) return
  const a = document.createElement('a')
  a.href = props.imageUrl
  a.download = `商业天赋与搞钱体质罗盘_${Date.now()}.png`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>
