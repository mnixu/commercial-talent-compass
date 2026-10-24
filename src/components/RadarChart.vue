<template>
  <div class="relative w-full aspect-[380/320] max-w-[360px] mx-auto flex items-center justify-center">
    <svg viewBox="0 0 380 320" class="w-full h-full overflow-visible">
      <defs>
        <!-- 数据多边形填充渐变 -->
        <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C084FC" stop-opacity="0.60" />
          <stop offset="50%" stop-color="#F472B6" stop-opacity="0.50" />
          <stop offset="100%" stop-color="#FBBF24" stop-opacity="0.60" />
        </linearGradient>

        <!-- 描边高亮渐变 -->
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E9D5FF" />
          <stop offset="50%" stop-color="#FBCFE8" />
          <stop offset="100%" stop-color="#FEF08A" />
        </linearGradient>
      </defs>

      <!-- 蛛网背景多边形层级 (25%, 50%, 75%, 100%) -->
      <polygon
        v-for="level in [0.25, 0.5, 0.75, 1.0]"
        :key="level"
        :points="getPolygonPoints(level)"
        fill="none"
        :stroke="level === 1.0 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.20)'"
        :stroke-width="level === 1.0 ? 1.5 : 1"
        :stroke-dasharray="level === 1.0 ? '' : '3 3'"
      />

      <!-- 轴线 -->
      <line
        v-for="(axis, index) in axes"
        :key="'axis-' + index"
        :x1="centerX"
        :y1="centerY"
        :x2="axis.x"
        :y2="axis.y"
        stroke="rgba(255, 255, 255, 0.28)"
        stroke-width="1.2"
      />

      <!-- 用户得分多边形 (发光渐变填充) -->
      <polygon
        :points="dataPolygonPoints"
        fill="url(#polygonGradient)"
        stroke="url(#strokeGradient)"
        stroke-width="2.5"
        stroke-linejoin="round"
        class="transition-all duration-700 ease-out"
      />

      <!-- 数据顶点圆点 -->
      <g v-for="(point, index) in dataPoints" :key="'point-' + index">
        <circle
          :cx="point.x"
          :cy="point.y"
          r="4.5"
          fill="#FFFFFF"
          stroke="#F472B6"
          stroke-width="2"
        />
        <circle
          :cx="point.x"
          :cy="point.y"
          r="2"
          fill="#FDE047"
        />
      </g>

      <!-- 维度名称与得分文本标签 (纯白加粗 + 明黄得分，无滤镜以确保 html2canvas 100% 绝对精确渲染不漂移) -->
      <g v-for="(label, index) in labels" :key="'label-' + index">
        <text
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          dominant-baseline="central"
          font-size="11"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          <tspan font-weight="700" fill="#FFFFFF">{{ label.name }} </tspan>
          <tspan font-weight="800" fill="#FDE047">{{ label.score }}%</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DimensionKey } from '../types/quiz'
import { DIMENSIONS, DIMENSION_KEYS } from '../data/dimensions'

const props = defineProps<{
  scores: Record<DimensionKey, number>
}>()

// 宽 380 高 320 的黄金比例画布，给左右两侧的文本留足 80px 充裕边距，绝不被切断
const width = 380
const height = 320
const centerX = width / 2  // 190
const centerY = height / 2 // 160
const radius = 82          // 蛛网主体半径

// 计算正六边形角度
function getAngle(index: number): number {
  return (Math.PI * 2 * index) / 6 - Math.PI / 2
}

// 获取各级蛛网的多边形点
function getPolygonPoints(scale: number): string {
  return DIMENSION_KEYS.map((_, i) => {
    const angle = getAngle(i)
    const x = centerX + Math.cos(angle) * (radius * scale)
    const y = centerY + Math.sin(angle) * (radius * scale)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// 6条轴线终点
const axes = computed(() => {
  return DIMENSION_KEYS.map((_, i) => {
    const angle = getAngle(i)
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    }
  })
})

// 计算用户实际得分的顶点位置
const dataPoints = computed(() => {
  return DIMENSION_KEYS.map((key, i) => {
    const score = props.scores[key] || 70
    const ratio = Math.max(0.2, Math.min(1.0, score / 100))
    const angle = getAngle(i)
    return {
      x: centerX + Math.cos(angle) * (radius * ratio),
      y: centerY + Math.sin(angle) * (radius * ratio)
    }
  })
})

const dataPolygonPoints = computed(() => {
  return dataPoints.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
})

// 标签外扩位置与排版：左右标签精准留空，绝不出界
const labels = computed(() => {
  return DIMENSION_KEYS.map((key, i) => {
    const angle = getAngle(i)
    // 顶部和底部外扩稍微多一点，左右紧随蛛网顶点
    const isTopOrBottom = i === 0 || i === 3
    const labelRadius = radius + (isTopOrBottom ? 22 : 18)
    const x = centerX + Math.cos(angle) * labelRadius
    const y = centerY + Math.sin(angle) * labelRadius

    let anchor = 'middle'
    if (Math.abs(Math.cos(angle)) > 0.3) {
      anchor = Math.cos(angle) > 0 ? 'start' : 'end'
    }

    return {
      name: DIMENSIONS[key].name,
      score: props.scores[key] || 80,
      color: DIMENSIONS[key].color,
      x: Math.round(x),
      y: Math.round(y),
      anchor
    }
  })
})
</script>
