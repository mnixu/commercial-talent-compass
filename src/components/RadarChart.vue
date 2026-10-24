<template>
  <div class="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center p-1">
    <svg :viewBox="`0 0 ${size} ${size}`" class="w-full h-full overflow-visible">
      <defs>
        <!-- 文字立体阴影滤镜，确保在任何深色背景下100%清晰 -->
        <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.85" />
        </filter>

        <!-- 数据多边形填充渐变（更通透、更协调的高级发光感） -->
        <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A855F7" stop-opacity="0.55" />
          <stop offset="50%" stop-color="#EC4899" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.55" />
        </linearGradient>

        <!-- 描边高亮纯白微光渐变 -->
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C084FC" />
          <stop offset="50%" stop-color="#F472B6" />
          <stop offset="100%" stop-color="#FDE047" />
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
        :x1="center"
        :y1="center"
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

      <!-- 维度名称与得分文本标签 (纯白加粗 + 明黄得分，100% 清晰防暗色遮挡) -->
      <g v-for="(label, index) in labels" :key="'label-' + index" filter="url(#textGlow)">
        <text
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          dominant-baseline="central"
          class="font-medium tracking-tight text-[11px]"
        >
          <tspan font-weight="700" fill="#FFFFFF">{{ label.name }}</tspan>
          <tspan dx="4" font-weight="800" fill="#FDE047">{{ label.score }}%</tspan>
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

const size = 330
const center = size / 2
const radius = 96 // 最大半径

// 计算正六边形角度
function getAngle(index: number): number {
  return (Math.PI * 2 * index) / 6 - Math.PI / 2
}

// 获取各级蛛网的多边形点
function getPolygonPoints(scale: number): string {
  return DIMENSION_KEYS.map((_, i) => {
    const angle = getAngle(i)
    const x = center + Math.cos(angle) * (radius * scale)
    const y = center + Math.sin(angle) * (radius * scale)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// 6条轴线终点
const axes = computed(() => {
  return DIMENSION_KEYS.map((_, i) => {
    const angle = getAngle(i)
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius
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
      x: center + Math.cos(angle) * (radius * ratio),
      y: center + Math.sin(angle) * (radius * ratio)
    }
  })
})

const dataPolygonPoints = computed(() => {
  return dataPoints.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
})

// 标签外扩位置与排版
const labels = computed(() => {
  const labelRadius = radius + 30
  return DIMENSION_KEYS.map((key, i) => {
    const angle = getAngle(i)
    const x = center + Math.cos(angle) * labelRadius
    const y = center + Math.sin(angle) * labelRadius

    let anchor = 'middle'
    if (Math.abs(Math.cos(angle)) > 0.3) {
      anchor = Math.cos(angle) > 0 ? 'start' : 'end'
    }

    return {
      name: DIMENSIONS[key].name,
      score: props.scores[key] || 80,
      color: DIMENSIONS[key].color,
      x,
      y,
      anchor
    }
  })
})
</script>
