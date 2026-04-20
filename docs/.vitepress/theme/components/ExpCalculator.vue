<script setup lang="ts">
import { ref, computed } from 'vue'

const mode = ref<'levelToExp' | 'expToLevel'>('levelToExp')

const fromLevel = ref(0)
const toLevel = ref(30)
const expInput = ref(0)

const expForLevel = (level: number): number => {
  if (level <= 16) return Math.floor(level * level + 2 * level)
  if (level <= 31) return Math.floor(2.5 * level * level - 40.5 * level + 360)
  return Math.floor(4.5 * level * level - 162.5 * level + 2220)
}

const requiredExp = computed(() => {
  const from = Math.min(fromLevel.value, toLevel.value)
  const to = Math.max(fromLevel.value, toLevel.value)
  return expForLevel(to) - expForLevel(from)
})

const levelFromExp = computed(() => {
  let level = 0
  let exp = expInput.value
  
  while (exp >= expForLevel(level + 1)) {
    level++
  }
  
  const currentLevelExp = expForLevel(level)
  const nextLevelExp = expForLevel(level + 1)
  const progress = nextLevelExp > currentLevelExp 
    ? Math.round(((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100)
    : 0
  
  return {
    level,
    progress,
    remaining: nextLevelExp - exp,
    current: exp - currentLevelExp,
    needed: nextLevelExp - currentLevelExp
  }
})

const expBottles = computed(() => Math.ceil(requiredExp.value / 11))
const enderDragonKills = computed(() => Math.ceil(requiredExp.value / 12000))
const zombieKills = computed(() => Math.ceil(requiredExp.value / 5))

const formatNumber = (num: number) => num.toLocaleString()
</script>

<template>
  <div class="exp-calculator">
    <div class="mode-switcher">
      <button
        v-for="m in ['levelToExp', 'expToLevel']"
        :key="m"
        class="mode-btn"
        :class="{ active: mode === m }"
        @click="mode = m as any"
      >
        <span class="btn-icon">{{ m === 'levelToExp' ? '📈' : '📉' }}</span>
        <span class="btn-text">{{ m === 'levelToExp' ? '等级 → 经验' : '经验 → 等级' }}</span>
      </button>
    </div>

    <div v-if="mode === 'levelToExp'" class="converter-card">
      <div class="card-header">
        <div class="header-icon">📊</div>
        <div class="header-text">
          <h3>输入等级范围</h3>
          <p>计算升级所需总经验值</p>
        </div>
      </div>
      
      <div class="input-grid cols-3">
        <div class="input-item">
          <div class="input-label">起</div>
          <input v-model.number="fromLevel" type="number" min="0" max="100">
        </div>
        <div class="input-arrow">
          <span>→</span>
        </div>
        <div class="input-item">
          <div class="input-label">终</div>
          <input v-model.number="toLevel" type="number" min="0" max="100">
        </div>
      </div>

      <div class="divider">
        <span class="divider-icon">⚡</span>
      </div>

      <div class="result-section">
        <div class="result-header">
          <span class="result-icon">💎</span>
          <span class="result-title">所需总经验</span>
        </div>

        <div class="main-result">
          <span class="result-value">{{ formatNumber(requiredExp) }}</span>
          <span class="result-unit">EXP</span>
        </div>

        <div class="resource-list">
          <div class="resource-item">
            <span class="resource-icon">🍶</span>
            <span class="resource-name">经验瓶</span>
            <span class="resource-count">× {{ formatNumber(expBottles) }}</span>
          </div>
          <div class="resource-item">
            <span class="resource-icon">🐉</span>
            <span class="resource-name">末影龙</span>
            <span class="resource-count">× {{ enderDragonKills }}</span>
          </div>
          <div class="resource-item">
            <span class="resource-icon">🧟</span>
            <span class="resource-name">僵尸</span>
            <span class="resource-count">× {{ formatNumber(zombieKills) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="converter-card">
      <div class="card-header">
        <div class="header-icon">✨</div>
        <div class="header-text">
          <h3>输入当前经验值</h3>
          <p>计算能达到的等级和进度</p>
        </div>
      </div>
      
      <div class="input-grid cols-1">
        <div class="input-item">
          <div class="input-label">EXP</div>
          <input 
            v-model.number="expInput" 
            type="number" 
            min="0" 
            placeholder="输入总经验值..."
          >
        </div>
      </div>

      <div class="divider">
        <span class="divider-icon">⚡</span>
      </div>

      <div v-if="expInput > 0" class="level-progress-section">
        <div class="progress-header">
          <span class="progress-level">Lv.{{ levelFromExp.level }}</span>
          <span class="progress-percent">{{ levelFromExp.progress }}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: levelFromExp.progress + '%' }">
            <div class="progress-bar-shine"></div>
          </div>
        </div>
        <div class="progress-details">
          <span class="progress-detail">💫 进度: {{ levelFromExp.current }} / {{ levelFromExp.needed }} EXP</span>
          <span class="progress-detail">🔜 升级还需: {{ levelFromExp.remaining }} EXP</span>
        </div>
      </div>

      <div class="result-section">
        <div class="level-display">
          <div class="level-main">
            <span class="level-value">{{ levelFromExp.level }}</span>
            <span class="level-label">级</span>
          </div>
          <div class="level-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: levelFromExp.progress + '%' }"
              ></div>
            </div>
            <div class="progress-text">
              升级进度: {{ levelFromExp.current }} / {{ levelFromExp.needed }} ({{ levelFromExp.progress }}%)
            </div>
          </div>
          <p class="level-hint">
            升至下一级还需: <strong>{{ levelFromExp.remaining }}</strong> 经验值
          </p>
        </div>
      </div>
    </div>

    <div class="tips-card">
      <div class="tips-header">
        <span class="tips-icon">📋</span>
        <span class="tips-title">各等级所需经验表</span>
      </div>
      <div class="table-container">
        <table class="exp-table">
          <thead>
            <tr>
              <th>等级</th>
              <th>总经验</th>
              <th>升级需求</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 30" :key="i">
              <td>{{ i - 1 }} → {{ i }}</td>
              <td>{{ formatNumber(expForLevel(i)) }}</td>
              <td>{{ formatNumber(expForLevel(i) - expForLevel(i - 1)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exp-calculator {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 640px) {
    padding: 30px 16px;
  }
}

.mode-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  color: var(--fur-text-secondary);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  .btn-icon {
    font-size: 24px;
  }

  &.active {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-color: transparent;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
  }

  &:hover:not(.active) {
    border-color: var(--fur-primary);
    color: var(--fur-primary);
  }

  @media (max-width: 480px) {
    .btn-text {
      display: none;
    }
  }
}

.converter-card {
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-bottom: 4px solid var(--fur-border);

  .header-icon {
    font-size: 44px;
  }

  h3 {
    margin: 0 0 6px 0;
    font-size: 22px;
    font-weight: 800;
    color: var(--fur-text);
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--fur-text-secondary);
  }
}

.input-grid {
  display: grid;
  gap: 20px;
  padding: 32px;
  align-items: end;

  &.cols-1 {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  &.cols-3 {
    grid-template-columns: 1fr auto 1fr;
  }

  @media (max-width: 640px) {
    &.cols-3 {
      grid-template-columns: 1fr;
      max-width: 360px;
      margin: 0 auto;
    }
  }

  @media (max-width: 400px) {
    .input-item {
      .input-label {
        width: 48px;
        height: 48px;
        font-size: 18px;
      }

      input {
        padding: 20px 20px 20px 64px;
        font-size: 24px;
      }
    }
  }
}

.input-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  color: var(--fur-primary);

  @media (max-width: 640px) {
    display: none;
  }
}

.input-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;

  .input-label {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 16px 0 16px 0;
    font-size: 20px;
    font-weight: 900;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0;
    z-index: 1;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  input {
    padding: 24px 24px 24px 76px;
    border: 4px solid var(--fur-border);
    border-radius: 16px;
    background: var(--fur-bg-muted);
    color: var(--fur-text);
    font-size: 28px;
    font-weight: 900;
    text-align: left;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
      transform: translateY(-2px);
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 32px;

  &::before {
    content: '';
    position: absolute;
    left: 32px;
    right: 32px;
    height: 4px;
    background: var(--fur-border);
  }

  .divider-icon {
    background: var(--fur-bg-card);
    padding: 0 12px;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }
}

.level-progress-section {
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
  border: 3px solid var(--fur-primary);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .progress-level {
    font-size: 28px;
    font-weight: 900;
    color: var(--fur-primary);
  }

  .progress-percent {
    font-size: 24px;
    font-weight: 900;
    color: #10b981;
  }
}

.progress-bar-container {
  height: 24px;
  background: var(--fur-bg-muted);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 14px;
  border: 3px solid var(--fur-border);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #3b82f6, #10b981);
  border-radius: 10px;
  position: relative;
  transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.progress-bar-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 150%; }
}

.progress-details {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;

  .progress-detail {
    font-size: 13px;
    font-weight: 700;
    color: var(--fur-text-secondary);
  }
}

.result-section {
  padding: 32px;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .result-icon {
    font-size: 28px;
  }

  .result-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.main-result {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
  border-radius: 16px;
  margin-bottom: 20px;

  .result-value {
    display: block;
    font-size: 48px;
    font-weight: 900;
    color: var(--fur-primary);
    line-height: 1.2;
  }

  .result-unit {
    font-size: 16px;
    font-weight: 700;
    color: var(--fur-text-secondary);
  }
}

.resource-list {
  display: grid;
  gap: 12px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: var(--fur-bg-muted);
  border-radius: 16px;
  border: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    border-color: var(--fur-primary);
  }

  .resource-icon {
    font-size: 28px;
  }

  .resource-name {
    flex: 1;
    font-size: 15px;
    font-weight: 700;
    color: var(--fur-text);
  }

  .resource-count {
    padding: 6px 14px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    border-radius: 12px;
    font-size: 15px;
    font-weight: 800;
    color: var(--fur-primary);
  }
}

.level-display {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
}

.level-main {
  margin-bottom: 20px;

  .level-value {
    font-size: 56px;
    font-weight: 900;
    color: #10b981;
    line-height: 1.2;
  }

  .level-label {
    font-size: 20px;
    font-weight: 700;
    color: var(--fur-text-secondary);
  }
}

.level-progress {
  margin-bottom: 16px;
}

.progress-bar {
  height: 12px;
  background: var(--fur-border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--fur-text-secondary);
}

.level-hint {
  margin: 0;
  font-size: 15px;
  font-weight: 600;

  strong {
    color: var(--fur-primary);
    font-weight: 800;
  }
}

.tips-card {
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 28px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  border-bottom: 4px solid var(--fur-border);

  .tips-icon {
    font-size: 28px;
  }

  .tips-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.table-container {
  padding: 24px;
  overflow-x: auto;
}

.exp-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 14px 16px;
    text-align: center;
    font-size: 14px;
    border-bottom: 2px solid var(--fur-border);
  }

  th {
    font-weight: 800;
    color: var(--fur-primary);
    background: var(--fur-bg-muted);
  }

  td {
    font-weight: 600;
    color: var(--fur-text);
  }

  tr:hover td {
    background: rgba(139, 92, 246, 0.05);
  }
}
</style>
