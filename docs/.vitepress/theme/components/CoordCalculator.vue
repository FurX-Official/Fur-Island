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
  gap: 0;
  margin-bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  padding: 8px;
  border-radius: 20px 20px 0 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-bottom: none;
}

.calc-tab {
  flex: 1;
  padding: 16px 20px;
  border: none;
  border-radius: 14px;
  background: transparent;
  color: var(--fur-text-secondary);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--fur-gradient-primary);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &.active {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);

    &::before {
      opacity: 1;
    }

    span {
      position: relative;
      z-index: 1;
    }
  }

  &:hover:not(.active) {
    background: rgba(139, 92, 246, 0.1);
    color: var(--fur-primary);
  }
}

.coord-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9), 
    rgba(139, 92, 246, 0.05)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 0 0 20px 20px;
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--fur-gradient-primary);
  }

  .dark & {
    background: linear-gradient(135deg, 
      rgba(30, 30, 40, 0.95), 
      rgba(139, 92, 246, 0.08)
    );
  }
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 24px;
  text-align: center;
  background: var(--fur-gradient-primary);
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
    padding: 18px 16px;
    border: 2px solid transparent;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08));
    color: var(--fur-text);
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2), 0 8px 24px rgba(139, 92, 246, 0.25);
      transform: translateY(-2px);
    }

    &:hover:not(:focus) {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.12));
    }
  }
}

.coord-result {
  background: var(--fur-gradient-primary);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 40%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 60%
    );
    animation: shine 3s infinite;
  }
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.result-label {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
}

.result-coords {
  display: flex;
  gap: 32px;
  margin-bottom: 12px;
  justify-content: center;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.coord-item {
  font-size: 32px;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  span {
    font-size: 14px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    margin-right: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.result-hint {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.info-card {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: 16px;
  border-left: 4px solid;
  border-image: var(--fur-gradient-primary) 1;
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
  .calc-tab {
    padding: 14px 12px;
    font-size: 13px;
  }

  .coord-card {
    padding: 24px 20px;
  }

  .result-coords {
    gap: 20px;
  }

  .coord-item {
    font-size: 24px;
  }
}
</style>
