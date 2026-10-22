<template>
  <div class="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center p-2">
    <svg :viewBox="`0 0 ${size} ${size}`" class="w-full h-full overflow-visible drop-shadow-sm">
      <defs>
        <!-- 背景多边形填充渐变 -->
        <radialGradient id="radarBgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.04" />
          <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.12" />
        </radialGradient>

        <!-- 数据多边形填充渐变 -->
        <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.65" />
          <stop offset="50%" stop-color="#EC4899" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.55" />
        </linearGradient>

        <!-- 描边渐变 -->
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C3AED" />
          <stop offset="50%" stop-color="#DB2777" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      </defs>

      <!-- 蛛网背景多边形层级 (20%, 40%, 60%, 80%, 100%) -->
      <polygon
        v-for="level in [0.25, 0.5, 0.75, 1.0]"
        :key="level"
        :points="getPolygonPoints(level)"
        fill="none"
        stroke="#E9DFF7"
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
        stroke="#E6DAF7"
        stroke-width="1.2"
      />

      <!-- 用户得分多边形 (带微发光与渐变填充) -->
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
          stroke="#7C3AED"
          stroke-width="2.5"
        />
        <circle
          :cx="point.x"
          :cy="point.y"
          r="2"
          fill="#EC4899"
        />
      </g>

      <!-- 维度名称与得分文本标签 -->
      <g v-for="(label, index) in labels" :key="'label-' + index">
        <text
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          dominant-baseline="central"
          class="font-medium tracking-tight fill-ink-800 text-[11px]"
        >
          <tspan font-weight="600" fill="#2C2738">{{ label.name }}</tspan>
          <tspan dx="3" font-weight="700" :fill="label.color">{{ label.score }}%</tspan>
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

const size = 320
const center = size / 2
const radius = 105 // 最大半径

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
  const labelRadius = radius + 28
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
