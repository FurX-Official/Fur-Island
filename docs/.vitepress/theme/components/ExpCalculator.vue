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
    <div class="calc-tabs">
      <button
        v-for="m in ['levelToExp', 'expToLevel']"
        :key="m"
        class="calc-tab"
        :class="{ active: mode === m }"
        @click="mode = m as any"
      >
        {{ m === 'levelToExp' ? '📈 等级 → 经验' : '📉 经验 → 等级' }}
      </button>
    </div>

    <div v-if="mode === 'levelToExp'" class="exp-card">
      <div class="section-title">📊 输入等级范围</div>
      
      <div class="level-inputs">
        <div class="input-group">
          <label>当前等级</label>
          <input v-model.number="fromLevel" type="number" min="0" max="100">
        </div>
        <div class="input-arrow">→</div>
        <div class="input-group">
          <label>目标等级</label>
          <input v-model.number="toLevel" type="number" min="0" max="100">
        </div>
      </div>

      <div class="result-display">
        <div class="result-main">
          <span class="result-value">{{ formatNumber(requiredExp) }}</span>
          <span class="result-unit">经验值</span>
        </div>
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

    <div v-else class="exp-card">
      <div class="section-title">✨ 输入当前经验值</div>
      
      <div class="exp-input">
        <input 
          v-model.number="expInput" 
          type="number" 
          min="0" 
          placeholder="输入总经验值..."
        >
      </div>

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

    <AccordionPanel title="查看各等级所需经验表" icon="📋">
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
    </AccordionPanel>
  </div>
</template>

<style scoped lang="scss">
.exp-calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 0;
}

.guide-header {
  text-align: center;
  margin-bottom: 32px;

  .guide-title {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    background: var(--fur-gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    .title-icon {
      font-size: 32px;
    }
  }

  .guide-subtitle {
    font-size: 14px;
    color: var(--fur-text-secondary);
    margin: 0;
  }
}

.calc-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: var(--fur-bg-muted);
  padding: 6px;
  border-radius: 12px;
}

.calc-tab {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--fur-text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background: var(--fur-primary);
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
}

.exp-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--fur-text);
}

.level-inputs {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.input-arrow {
  font-size: 24px;
  color: var(--fur-primary);
  font-weight: 700;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--fur-text-secondary);
  }

  input {
    padding: 12px 16px;
    border: 2px solid var(--fur-border);
    border-radius: 10px;
    background: var(--fur-bg-muted);
    color: var(--fur-text);
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
    }
  }
}

.exp-input input {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--fur-border);
  border-radius: 10px;
  background: var(--fur-bg-muted);
  color: var(--fur-text);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  transition: border-color 0.2s;
  margin-bottom: 24px;

  &:focus {
    outline: none;
    border-color: var(--fur-primary);
  }
}

.result-display {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.result-main {
  .result-value {
    display: block;
    font-size: 36px;
    font-weight: 700;
    color: var(--fur-primary);
  }

  .result-unit {
    font-size: 14px;
    color: var(--fur-text-secondary);
  }
}

.level-display {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15));
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.level-main {
  margin-bottom: 16px;

  .level-value {
    font-size: 48px;
    font-weight: 700;
    color: #10b981;
  }

  .level-label {
    font-size: 18px;
    color: var(--fur-text-secondary);
  }
}

.level-progress {
  margin-bottom: 12px;
}

.progress-bar {
  height: 10px;
  background: var(--fur-border);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 13px;
  color: var(--fur-text-secondary);
}

.level-hint {
  margin: 0;
  font-size: 14px;

  strong {
    color: var(--fur-primary);
  }
}

.resource-list {
  display: grid;
  gap: 12px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--fur-bg-muted);
  border-radius: 10px;
}

.resource-icon {
  font-size: 24px;
}

.resource-name {
  flex: 1;
  font-size: 14px;
  color: var(--fur-text-secondary);
}

.resource-count {
  font-size: 16px;
  font-weight: 700;
  color: var(--fur-primary);
}

.exp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid var(--fur-border-light);
  }

  th {
    font-weight: 600;
    color: var(--fur-text-secondary);
  }

  td:last-child {
    color: var(--fur-primary);
    font-weight: 600;
  }
}
</style>
