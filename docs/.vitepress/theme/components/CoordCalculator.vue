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
        {{ d === 'overworld' ? '🌍 主世界 → 地狱' : '🔥 地狱 → 主世界' }}
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

.coord-card {
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

.coord-inputs {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  &.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.input-group {
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

.coord-result {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1));
  border-radius: 12px;
  padding: 20px;
}

.result-label {
  font-size: 13px;
  color: var(--fur-text-secondary);
  margin-bottom: 12px;
}

.result-coords {
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
}

.coord-item {
  font-size: 24px;
  font-weight: 700;
  color: var(--fur-primary);

  span {
    font-size: 14px;
    color: var(--fur-text-secondary);
    margin-right: 4px;
  }
}

.result-hint {
  margin: 0;
  font-size: 13px;
  color: var(--fur-text-muted);
}

.info-card {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.info-icon {
  font-size: 24px;
}

.info-text {
  strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    line-height: 1.6;
  }
}
</style>
