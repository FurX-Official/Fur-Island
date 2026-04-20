<script setup lang="ts">
import { ref, computed } from 'vue'

const direction = ref<'overworld' | 'nether'>('overworld')

const overworldX = ref(0)
const overworldZ = ref(0)
const overworldY = ref(64)

const netherX = computed(() => Math.floor(overworldX.value / 8))
const netherZ = computed(() => Math.floor(overworldZ.value / 8))

const portalNetherX = ref(0)
const portalNetherZ = ref(0)

const portalOverworldX = computed(() => portalNetherX.value * 8)
const portalOverworldZ = computed(() => portalNetherZ.value * 8)
</script>

<template>
  <div class="coord-calculator">
    <div class="calc-tabs">
      <button
        v-for="d in ['overworld', 'nether']"
        :key="d"
        class="calc-tab"
        :class="{ active: direction === d }"
        @click="direction = d as any"
      >
        <span>{{ d === 'overworld' ? '🌍 主世界 → 地狱' : '🔥 地狱 → 主世界' }}</span>
      </button>
    </div>

    <div v-if="direction === 'overworld'" class="coord-card">
      <div class="section-title">📍 输入主世界坐标</div>
      
      <div class="coord-inputs cols-3">
        <div class="input-group">
          <label>X</label>
          <input v-model.number="overworldX" type="number" step="1">
        </div>
        <div class="input-group">
          <label>Y</label>
          <input v-model.number="overworldY" type="number" step="1">
        </div>
        <div class="input-group">
          <label>Z</label>
          <input v-model.number="overworldZ" type="number" step="1">
        </div>
      </div>

      <div class="coord-result">
        <div class="result-label">🔥 对应地狱门位置</div>
        <div class="result-coords">
          <span class="coord-item">
            <span class="coord-x">X</span> {{ netherX }}
          </span>
          <span class="coord-item">
            <span class="coord-y">Y</span> {{ overworldY }}
          </span>
          <span class="coord-item">
            <span class="coord-z">Z</span> {{ netherZ }}
          </span>
        </div>
        <p class="result-hint">
          💡 主世界坐标 ÷ 8 = 地狱坐标
        </p>
      </div>
    </div>

    <div v-else class="coord-card">
      <div class="section-title">🔥 输入地狱门坐标</div>
      
      <div class="coord-inputs cols-2">
        <div class="input-group">
          <label>X</label>
          <input v-model.number="portalNetherX" type="number" step="1">
        </div>
        <div class="input-group">
          <label>Z</label>
          <input v-model.number="portalNetherZ" type="number" step="1">
        </div>
      </div>

      <div class="coord-result">
        <div class="result-label">🌍 对应主世界位置</div>
        <div class="result-coords">
          <span class="coord-item">
            <span class="coord-x">X</span> {{ portalOverworldX }}
          </span>
          <span class="coord-item">
            <span class="coord-z">Z</span> {{ portalOverworldZ }}
          </span>
        </div>
        <p class="result-hint">
          💡 地狱坐标 × 8 = 主世界坐标
        </p>
      </div>
    </div>

    <div class="info-card">
      <div class="info-icon">ℹ️</div>
      <div class="info-text">
        <strong>建造提示</strong>
        <p>两个地狱门之间至少需要相距 128 格以上才不会相互链接错误
        <br>推荐在 Y = 116 层建造地狱交通最快</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coord-calculator {
  max-width: 650px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 640px) {
    padding: 30px 16px;
  }
}

.calc-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: -1px;
  background: var(--fur-bg-muted);
  padding: 12px;
  border-radius: 20px 20px 0 0;
  border: 2px solid var(--fur-border);
  border-bottom: none;
}

.calc-tab {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: var(--fur-bg-card);
  color: var(--fur-text-secondary);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &.active {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
  }

  &:hover:not(.active) {
    border-color: var(--fur-primary);
    color: var(--fur-primary);
  }
}

.coord-card {
  background: var(--fur-bg-card);
  border: 2px solid var(--fur-border);
  border-radius: 0 0 20px 20px;
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 24px;
  text-align: center;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.coord-inputs {
  display: grid;
  gap: 20px;
  margin-bottom: 32px;

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }

  &.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    &.cols-3 {
      grid-template-columns: repeat(2, 1fr);
      max-width: 420px;
      margin-left: auto;
      margin-right: auto;

      .input-group:nth-child(3) {
        grid-column: span 2;
        max-width: 200px;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 520px) {
    &.cols-2,
    &.cols-3 {
      grid-template-columns: 1fr;
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 11px;
    font-weight: 800;
    color: var(--fur-primary);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }

  input {
    padding: 16px;
    border: 2px solid var(--fur-border);
    border-radius: 12px;
    background: var(--fur-bg-muted);
    color: var(--fur-text);
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
      transform: translateY(-1px);
    }
  }
}

.coord-result {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);
}

.result-label {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.result-coords {
  display: flex;
  gap: 32px;
  margin-bottom: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.coord-item {
  font-size: 32px;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  span {
    font-size: 14px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.75);
    margin-right: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.result-hint {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 600;
}

.info-card {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  background: var(--fur-bg-muted);
  border-radius: 16px;
  border-left: 4px solid var(--fur-primary);
  align-items: center;
}

.info-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.info-text {
  strong {
    display: block;
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 6px;
    color: var(--fur-text);
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    line-height: 1.7;
  }
}

@media (max-width: 520px) {
  .calc-tabs {
    padding: 8px;
    gap: 6px;
  }

  .calc-tab {
    padding: 12px;
    font-size: 12px;
  }

  .coord-card {
    padding: 24px 16px;
  }

  .result-coords {
    gap: 20px;
  }

  .coord-item {
    font-size: 24px;
  }

  .info-card {
    padding: 16px;
    flex-direction: column;
    text-align: center;
  }
}
</style>
