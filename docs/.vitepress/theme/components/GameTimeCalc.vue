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
    <div class="component-header">
      <span class="header-icon">🕐</span>
      <span class="header-text">游戏时间计算</span>
    </div>

    <div class="component-content">
      <div class="phase-display">
        <div class="phase-card" :style="{ '--phase-color': gamePhase.color }">
          <div class="phase-icon-big">{{ gamePhase.icon }}</div>
          <div class="phase-name-big">{{ gamePhase.name }}</div>
        </div>
      </div>

      <div class="time-section">
        <div class="section-title">
          <span class="title-icon">⏱️</span>
          <span>时间转换</span>
        </div>

        <div class="time-grid">
          <div class="time-card">
            <div class="time-icon">🌍</div>
            <div class="time-label">现实时间</div>
            <div class="time-value">{{ formattedRealTime }}</div>
          </div>

          <div class="time-arrow">⚡</div>

          <div class="time-card highlight">
            <div class="time-icon">🎮</div>
            <div class="time-label">游戏时间</div>
            <div class="time-value">{{ formattedGameTime }}</div>
            <div class="time-tick">Tick: {{ gameTime }}</div>
          </div>
        </div>

        <div class="bed-hint" :class="{ active: isBedTime }">
          <span v-if="isBedTime" class="bed-icon">💤</span>
          <span v-else class="bed-icon">🌞</span>
          <span v-if="isBedTime">现在可以上床睡觉啦！</span>
          <span v-else>还不能睡觉，再等等吧~</span>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">
          <span class="title-icon">📋</span>
          <span>时间对照表</span>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon">☀️</span>
            <div class="info-text">
              <span class="info-main">06:00 - 12:00</span>
              <span class="info-sub">白天</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🌙</span>
            <div class="info-text">
              <span class="info-main">18:00 - 05:00</span>
              <span class="info-sub">夜晚</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">💤</span>
            <div class="info-text">
              <span class="info-main">18:32 - 05:27</span>
              <span class="info-sub">可睡觉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-time-calc {
  max-width: 720px;
  margin: 0 auto;
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    box-shadow: 0 12px 48px rgba(139, 92, 246, 0.25);
  }
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;

  .header-icon {
    font-size: 40px;
  }

  .header-text {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
  }
}

.component-content {
  padding: 32px;
}

.phase-display {
  margin-bottom: 24px;
}

.phase-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 28px;
  background: linear-gradient(135deg, var(--phase-color), var(--phase-color)/30%);
  border-radius: 20px;
  border: 4px solid var(--fur-border);
  transition: all 0.5s ease;

  .phase-icon-big {
    font-size: 56px;
  }

  .phase-name-big {
    font-size: 32px;
    font-weight: 900;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}

.time-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .title-icon {
    font-size: 28px;
  }

  span:nth-child(2) {
    font-size: 18px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.time-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.time-card {
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;

  &.highlight {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    border-color: var(--fur-primary);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .time-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
}

.time-label {
  font-size: 14px;
  color: var(--fur-text-secondary);
  margin-bottom: 8px;
  font-weight: 600;
}

.time-value {
  font-size: 36px;
  font-weight: 900;
  font-family: 'Fira Code', monospace;
  color: var(--fur-text);
}

.time-tick {
  font-size: 13px;
  color: var(--fur-text-secondary);
  margin-top: 6px;
  font-weight: 600;
}

.time-arrow {
  font-size: 28px;
  color: var(--fur-primary);
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.bed-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  border-radius: 14px;
  background: var(--fur-bg-card);
  border: 3px solid var(--fur-border);
  font-size: 16px;
  font-weight: 700;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
    border-color: var(--fur-primary);
    color: var(--fur-primary);
  }

  .bed-icon {
    font-size: 22px;
  }
}

.info-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--fur-bg-card);
  border-radius: 14px;
  border: 3px solid var(--fur-border);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-1px);
  }

  .info-icon {
    font-size: 28px;
    flex-shrink: 0;
  }

  .info-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .info-main {
    font-size: 15px;
    font-weight: 800;
    color: var(--fur-text);
  }

  .info-sub {
    font-size: 13px;
    font-weight: 600;
    color: var(--fur-text-secondary);
  }
}

@media (max-width: 768px) {
  .component-header {
    padding: 20px 24px;

    .header-icon {
      font-size: 32px;
    }

    .header-text {
      font-size: 22px;
    }
  }

  .component-content {
    padding: 24px 20px;
  }

  .phase-card {
    .phase-icon-big {
      font-size: 44px;
    }

    .phase-name-big {
      font-size: 24px;
    }
  }

  .time-grid {
    grid-template-columns: 1fr;
  }

  .time-arrow {
    text-align: center;
    transform: rotate(90deg);
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .component-content {
    padding: 20px 16px;
  }

  .time-section,
  .info-section {
    padding: 16px;
  }

  .phase-card {
    flex-direction: column;
    gap: 8px;
    padding: 20px;
  }

  .bed-hint {
    flex-direction: column;
    text-align: center;
  }
}
</style>
