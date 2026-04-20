<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const realTime = ref(new Date())
const customTime = ref<Date | null>(null)

let timer: number

const gameTime = computed(() => {
  const now = customTime.value || realTime.value
  const totalSeconds = Math.floor(now.getTime() / 1000)
  const mcDaySeconds = 20 * 60
  let ticks = (totalSeconds % mcDaySeconds) * 24000 / mcDaySeconds
  return Math.floor(ticks) % 24000
})

const formattedGameTime = computed(() => {
  const gt = gameTime.value
  const hours = (Math.floor(gt / 1000) + 6) % 24
  const minutes = Math.floor((gt % 1000) / 1000 * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
})

const gamePhase = computed(() => {
  const gt = gameTime.value
  if (gt >= 0 && gt < 6000) return { name: '上午', icon: '🌤️', color: '#fbbf24' }
  if (gt >= 6000 && gt < 12000) return { name: '下午', icon: '☀️', color: '#f97316' }
  if (gt >= 12000 && gt < 13800) return { name: '黄昏', icon: '🌅', color: '#f97316' }
  if (gt >= 13800 && gt < 22200) return { name: '夜晚', icon: '🌙', color: '#4f46e5' }
  return { name: '黎明', icon: '🌄', color: '#ec4899' }
})

const formattedRealTime = computed(() => {
  const now = customTime.value || realTime.value
  return now.toLocaleTimeString('zh-CN', { hour12: false })
})

const isBedTime = computed(() => {
  const gt = gameTime.value
  return gt >= 12542 && gt < 23458
})

onMounted(() => {
  timer = window.setInterval(() => {
    realTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="game-time-calc">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🕐</span>
        MC 游戏时间计算器
      </h2>
      <p class="guide-desc">现实时间 → 游戏时间实时转换</p>
    </div>

    <div class="time-display">
      <div class="time-card phase" :style="{ '--phase-color': gamePhase.color }">
        <div class="phase-icon">{{ gamePhase.icon }}</div>
        <div class="phase-name">{{ gamePhase.name }}</div>
      </div>

      <div class="time-row">
        <div class="time-card">
          <div class="time-label">现实时间</div>
          <div class="time-value">{{ formattedRealTime }}</div>
        </div>
        <div class="time-arrow">→</div>
        <div class="time-card">
          <div class="time-label">游戏时间</div>
          <div class="time-value">{{ formattedGameTime }}</div>
          <div class="time-tick">Tick: {{ gameTime }}</div>
        </div>
      </div>

      <div class="bed-hint" :class="{ active: isBedTime }">
        <span v-if="isBedTime">💤 现在可以上床睡觉啦！</span>
        <span v-else>🌞 还不能睡觉，再等等吧~</span>
      </div>

      <div class="time-info">
        <div class="info-item">
          <span class="info-icon">☀️</span>
          <span>06:00 - 12:00 白天</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🌙</span>
          <span>18:00 - 05:00 夜晚</span>
        </div>
        <div class="info-item">
          <span class="info-icon">💤</span>
          <span>18:32 - 05:27 可睡觉</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-time-calc {
  max-width: 600px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 32px;

  .guide-title {
    font-size: 28px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .guide-desc {
    color: var(--fur-text-secondary);
  }
}

.time-display {
  background: var(--fur-bg-elevated);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--fur-border-light);
}

.time-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

.time-card {
  background: var(--fur-bg);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid var(--fur-border-light);

  &.phase {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(135deg, var(--phase-color), var(--phase-color)/30%);

    .phase-icon {
      font-size: 32px;
    }

    .phase-name {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
}

.time-label {
  font-size: 14px;
  color: var(--fur-text-secondary);
  margin-bottom: 8px;
}

.time-value {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
}

.time-tick {
  font-size: 12px;
  color: var(--fur-text-secondary);
  margin-top: 4px;
}

.time-arrow {
  font-size: 24px;
  color: var(--fur-primary);
  font-weight: bold;
}

.bed-hint {
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  background: var(--fur-bg);
  margin-bottom: 24px;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
    border: 1px solid var(--fur-primary);
  }
}

.time-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: var(--fur-bg);
  border-radius: 10px;
  font-size: 13px;

  .info-icon {
    font-size: 20px;
  }
}
</style>
