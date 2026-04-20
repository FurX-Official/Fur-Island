<script setup lang="ts">
import { ref, computed } from 'vue'

const direction = ref<'overworld' | 'nether'>('overworld')

const overworldX = ref(0)
const overworldZ = ref(0)
const overworldY = ref(64)

const netherX = computed(() => Math.round(overworldX.value / 8))
const netherZ = computed(() => Math.round(overworldZ.value / 8))
const netherErrorX = computed(() => Math.abs(overworldX.value - netherX.value * 8))
const netherErrorZ = computed(() => Math.abs(overworldZ.value - netherZ.value * 8))
const isAccurate = computed(() => netherErrorX.value <= 1 && netherErrorZ.value <= 1)

const portalNetherX = ref(0)
const portalNetherZ = ref(0)

const portalOverworldX = computed(() => portalNetherX.value * 8)
const portalOverworldZ = computed(() => portalNetherZ.value * 8)
const recommendedRange = computed(() => ({
  minX: portalOverworldX.value - 16,
  maxX: portalOverworldX.value + 16,
  minZ: portalOverworldZ.value - 16,
  maxZ: portalOverworldZ.value + 16
}))

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="coord-calculator">
    <div class="mode-switcher">
      <button
        v-for="d in ['overworld', 'nether']"
        :key="d"
        class="mode-btn"
        :class="{ active: direction === d }"
        @click="direction = d as any"
      >
        <span class="btn-icon">{{ d === 'overworld' ? '🌍' : '🔥' }}</span>
        <span class="btn-text">{{ d === 'overworld' ? '主世界 → 地狱' : '地狱 → 主世界' }}</span>
      </button>
    </div>

    <div v-if="direction === 'overworld'" class="converter-card">
      <div class="card-header">
        <div class="header-icon">📍</div>
        <div class="header-text">
          <h3>输入主世界坐标</h3>
          <p>将自动转换为对应地狱门位置</p>
        </div>
      </div>
      
      <div class="input-grid cols-3">
        <div class="input-item">
          <div class="input-label">X</div>
          <input v-model.number="overworldX" type="number" step="1">
        </div>
        <div class="input-item">
          <div class="input-label">Y</div>
          <input v-model.number="overworldY" type="number" step="1">
        </div>
        <div class="input-item">
          <div class="input-label">Z</div>
          <input v-model.number="overworldZ" type="number" step="1">
        </div>
      </div>

      <div class="divider">
        <span class="divider-icon">⚡</span>
      </div>

      <div class="result-section">
        <div class="result-header">
          <span class="result-icon">🌀</span>
          <span class="result-title">地狱门坐标</span>
          <span class="accuracy-badge" :class="{ accurate: isAccurate }">
            {{ isAccurate ? '✅ 精确匹配' : '⚠️ 建议校正' }}
          </span>
        </div>

        <div class="coord-display">
          <div class="coord-box">
            <div class="coord-axis">X</div>
            <div class="coord-value">{{ netherX }}</div>
            <button class="copy-btn" @click="copyToClipboard(String(netherX))">📋</button>
          </div>
          <div class="coord-box">
            <div class="coord-axis">Y</div>
            <div class="coord-value">{{ overworldY }}</div>
            <button class="copy-btn" @click="copyToClipboard(String(overworldY))">📋</button>
          </div>
          <div class="coord-box">
            <div class="coord-axis">Z</div>
            <div class="coord-value">{{ netherZ }}</div>
            <button class="copy-btn" @click="copyToClipboard(String(netherZ))">📋</button>
          </div>
        </div>

        <div v-if="!isAccurate" class="error-hint">
          <strong>💡 精度提示</strong>
          <p>当前坐标与标准 1:8 比例有误差：X 轴偏移 {{ netherErrorX }} 格，Z 轴偏移 {{ netherErrorZ }} 格</p>
          <p class="hint-small">建议使用 8 的倍数坐标，以获得最佳的传送精度</p>
        </div>

        <div class="formula">
          <code>主世界坐标 ÷ 8 = 地狱坐标</code>
        </div>
      </div>
    </div>

    <div v-else class="converter-card">
      <div class="card-header">
        <div class="header-icon">🔥</div>
        <div class="header-text">
          <h3>输入地狱门坐标</h3>
          <p>计算对应主世界生成范围</p>
        </div>
      </div>
      
      <div class="input-grid cols-2">
        <div class="input-item">
          <div class="input-label">X</div>
          <input v-model.number="portalNetherX" type="number" step="1">
        </div>
        <div class="input-item">
          <div class="input-label">Z</div>
          <input v-model.number="portalNetherZ" type="number" step="1">
        </div>
      </div>

      <div class="divider">
        <span class="divider-icon">⚡</span>
      </div>

      <div class="result-section">
        <div class="result-header">
          <span class="result-icon">🌍</span>
          <span class="result-title">主世界生成区域</span>
        </div>

        <div class="coord-display">
          <div class="coord-box highlight">
            <div class="coord-axis">X</div>
            <div class="coord-value">{{ portalOverworldX }}</div>
            <button class="copy-btn" @click="copyToClipboard(String(portalOverworldX))">📋</button>
          </div>
          <div class="coord-box highlight">
            <div class="coord-axis">Z</div>
            <div class="coord-value">{{ portalOverworldZ }}</div>
            <button class="copy-btn" @click="copyToClipboard(String(portalOverworldZ))">📋</button>
          </div>
        </div>

        <div class="range-info">
          <div class="range-title">🎯 推荐建造范围</div>
          <div class="range-grid">
            <div class="range-item">
              <span class="range-label">X 轴</span>
              <span class="range-value">{{ recommendedRange.minX }} ~ {{ recommendedRange.maxX }}</span>
            </div>
            <div class="range-item">
              <span class="range-label">Z 轴</span>
              <span class="range-value">{{ recommendedRange.minZ }} ~ {{ recommendedRange.maxZ }}</span>
            </div>
          </div>
          <p class="range-desc">在此 32×32 范围内建造，可保证正确链接</p>
        </div>

        <div class="formula">
          <code>地狱坐标 × 8 = 主世界坐标</code>
        </div>
      </div>
    </div>

    <div class="tips-card">
      <div class="tips-header">
        <span class="tips-icon">💡</span>
        <span class="tips-title">建造技巧</span>
      </div>
      <div class="tips-list">
        <div class="tip-item">
          <span class="tip-num">1</span>
          <span class="tip-text">两个地狱门至少相距 128 格以上才不会相互链接错误</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">2</span>
          <span class="tip-text">推荐在 Y = 116 层建造地狱交通网络</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">3</span>
          <span class="tip-text">使用 8 的倍数坐标，获得最佳传送精度</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coord-calculator {
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

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 480px;
    margin: 0 auto;
  }

  &.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    &.cols-2,
    &.cols-3 {
      grid-template-columns: 1fr;
      max-width: 360px;
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

.result-section {
  padding: 32px;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .result-icon {
    font-size: 28px;
  }

  .result-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.accuracy-badge {
  margin-left: auto;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;

  &.accurate {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
}

.coord-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
}

.coord-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: var(--fur-bg-muted);
  border-radius: 16px;
  border: 4px solid transparent;
  transition: all 0.2s ease;

  &.highlight {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
  }

  &:hover {
    border-color: var(--fur-primary);
  }

  .coord-axis {
    font-size: 14px;
    font-weight: 800;
    color: var(--fur-primary);
    text-transform: uppercase;
  }

  .coord-value {
    flex: 1;
    font-size: 30px;
    font-weight: 900;
    color: var(--fur-text);
    text-align: center;
  }

  .copy-btn {
    padding: 4px 8px;
    border: none;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.6;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      background: rgba(139, 92, 246, 0.1);
    }
  }
}

.error-hint {
  padding: 16px;
  background: rgba(239, 68, 68, 0.08);
  border-radius: 16px;
  border-left: 6px solid #ef4444;
  margin-bottom: 16px;

  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #ef4444;
    margin-bottom: 6px;
  }

  p {
    margin: 0 0 4px 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
  }

  .hint-small {
    font-size: 12px;
    color: #ef4444;
  }
}

.range-info {
  padding: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
  margin-bottom: 16px;
}

.range-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--fur-text);
  margin-bottom: 12px;
}

.range-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 8px;
}

.range-item {
  display: flex;
  justify-content: space-between;

  .range-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--fur-text-secondary);
  }

  .range-value {
    font-size: 13px;
    font-weight: 800;
    color: #10b981;
  }
}

.range-desc {
  margin: 0;
  font-size: 12px;
  color: var(--fur-text-secondary);
}

.formula {
  text-align: center;

  code {
    display: inline-block;
    padding: 8px 16px;
    background: var(--fur-bg-muted);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    color: var(--fur-primary);
    font-family: inherit;
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

.tips-list {
  padding: 24px 28px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--fur-border);
  }

  .tip-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    color: white;
    font-size: 14px;
    font-weight: 800;
  }

  .tip-text {
    flex: 1;
    padding-top: 5px;
    font-size: 15px;
    color: var(--fur-text-secondary);
    line-height: 1.7;
  }
}
</style>
