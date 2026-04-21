<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface FavoriteCoord {
  id: string
  name: string
  x: number
  y: number
  z: number
  dimension: 'overworld' | 'nether' | 'end'
}

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

const favorites = ref<FavoriteCoord[]>([])
const newFavName = ref('')
const showAddFavorite = ref(false)

const saveFavorites = () => {
  localStorage.setItem('coord-favorites', JSON.stringify(favorites.value))
}

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('coord-favorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load favorites')
  }
}

const addToFavorites = () => {
  const currentX = direction.value === 'overworld' ? overworldX.value : portalNetherX.value
  const currentZ = direction.value === 'overworld' ? overworldZ.value : portalNetherZ.value
  const currentY = overworldY.value

  const newFavorite: FavoriteCoord = {
    id: Date.now().toString(),
    name: newFavName.value || `${direction.value === 'overworld' ? '主世界' : '地狱'}坐标`,
    x: currentX,
    y: currentY,
    z: currentZ,
    dimension: direction.value
  }

  favorites.value.push(newFavorite)
  saveFavorites()
  newFavName.value = ''
  showAddFavorite.value = false
}

const removeFavorite = (id: string) => {
  favorites.value = favorites.value.filter(f => f.id !== id)
  saveFavorites()
}

const loadFavorite = (fav: FavoriteCoord) => {
  if (fav.dimension === 'overworld') {
    direction.value = 'overworld'
    overworldX.value = fav.x
    overworldY.value = fav.y
    overworldZ.value = fav.z
  } else {
    direction.value = 'nether'
    portalNetherX.value = fav.x
    portalNetherZ.value = fav.z
    overworldY.value = fav.y
  }
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

const copyFullCoord = (fav: FavoriteCoord) => {
  copyToClipboard(`${fav.x} ${fav.y} ${fav.z}`)
}

onMounted(() => {
  loadFavorites()
})
</script>

<template>
  <div class="coord-calculator">
    <div class="component-header">
      <span class="header-icon">🗺️</span>
      <span class="header-text">坐标转换器</span>
    </div>

    <div class="component-content">
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

      <div v-if="direction === 'overworld'" class="converter-section">
        <div class="section-title">
          <span class="title-icon">📍</span>
          <span>输入主世界坐标</span>
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

        <div class="section-title">
          <span class="title-icon">🌀</span>
          <span>地狱门坐标</span>
          <span class="accuracy-badge" :class="{ accurate: isAccurate }">
            {{ isAccurate ? '✅ 精确' : '⚠️ 需校正' }}
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
          <p>X 轴偏移 {{ netherErrorX }} 格，Z 轴偏移 {{ netherErrorZ }} 格</p>
          <p class="hint-small">建议使用 8 的倍数坐标，获得最佳传送精度</p>
        </div>

        <div class="formula">
          <code>主世界坐标 ÷ 8 = 地狱坐标</code>
        </div>
      </div>

      <div v-else class="converter-section">
        <div class="section-title">
          <span class="title-icon">🔥</span>
          <span>输入地狱门坐标</span>
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

        <div class="section-title">
          <span class="title-icon">🌍</span>
          <span>主世界生成区域</span>
        </div>

        <div class="coord-display cols-2">
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

      <div class="favorites-section">
        <div class="favorites-header">
          <span class="favorites-icon">⭐</span>
          <span class="favorites-title">坐标收藏夹</span>
          <button class="add-fav-btn" @click="showAddFavorite = !showAddFavorite">
            {{ showAddFavorite ? '✕ 取消' : '+ 添加当前' }}
          </button>
        </div>

        <div v-if="showAddFavorite" class="add-fav-form">
          <input
            v-model="newFavName"
            type="text"
            placeholder="输入坐标名称（如：家、地狱门、要塞）..."
            @keyup.enter="addToFavorites"
          >
          <button class="confirm-btn" @click="addToFavorites">💾 保存</button>
        </div>

        <div v-if="favorites.length === 0" class="empty-fav">
          <span class="empty-icon">📭</span>
          <p>还没有收藏坐标，点击上方按钮保存常用坐标吧！</p>
        </div>

        <div v-else class="favorites-list">
          <div
            v-for="fav in favorites"
            :key="fav.id"
            class="favorite-item"
          >
            <div class="fav-info">
              <span class="fav-name">{{ fav.name }}</span>
              <span class="fav-coord">
                <span class="dim-badge" :class="fav.dimension">
                  {{ fav.dimension === 'overworld' ? '🌍' : '🔥' }}
                </span>
                {{ fav.x }}, {{ fav.y }}, {{ fav.z }}
              </span>
            </div>
            <div class="fav-actions">
              <button class="fav-btn" @click="loadFavorite(fav)" title="加载">📥</button>
              <button class="fav-btn" @click="copyFullCoord(fav)" title="复制坐标">📋</button>
              <button class="fav-btn delete" @click="removeFavorite(fav.id)" title="删除">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-section">
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
  </div>
</template>

<style scoped lang="scss">
.coord-calculator {
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
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
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

.mode-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
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
}

.converter-section {
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
  margin-bottom: 24px;
  flex-wrap: wrap;

  .title-icon {
    font-size: 28px;
  }

  span:nth-child(2) {
    font-size: 18px;
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
  border: 2px solid rgba(239, 68, 68, 0.2);

  &.accurate {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.2);
  }
}

.input-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.input-item {
  position: relative;
  min-width: 0;

  .input-label {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 14px 0 14px 0;
    font-size: 18px;
    font-weight: 900;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px 20px 68px;
    border: 4px solid var(--fur-border);
    border-radius: 16px;
    background: var(--fur-bg-card);
    color: var(--fur-text);
    font-size: 24px;
    font-weight: 900;
    text-align: left;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
      transform: translateY(-2px);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      opacity: 1;
      height: 40px;
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 8px 0 24px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--fur-border);
    border-radius: 2px;
  }

  .divider-icon {
    background: var(--fur-bg-muted);
    padding: 0 12px;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }
}

.coord-display {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;

  &:not(.cols-2) {
    grid-template-columns: repeat(3, 1fr);
  }

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.coord-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--fur-bg-card);
  border-radius: 16px;
  border: 4px solid var(--fur-border);
  transition: all 0.2s ease;
  min-width: 0;

  &.highlight {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    border-color: var(--fur-primary);
  }

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-1px);
  }

  .coord-axis {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 800;
    color: var(--fur-primary);
    text-transform: uppercase;
  }

  .coord-value {
    flex: 1;
    min-width: 0;
    font-size: 26px;
    font-weight: 900;
    color: var(--fur-text);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .copy-btn {
    flex-shrink: 0;
    padding: 6px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.6;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      background: rgba(139, 92, 246, 0.15);
    }
  }
}

.error-hint {
  padding: 16px;
  background: rgba(239, 68, 68, 0.08);
  border-radius: 16px;
  border-left: 6px solid #ef4444;
  border: 2px solid rgba(239, 68, 68, 0.2);
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
  padding: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
  border: 2px solid rgba(16, 185, 129, 0.2);
  margin-bottom: 16px;
}

.range-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--fur-text);
  margin-bottom: 14px;
}

.range-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 10px;
}

.range-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .range-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--fur-text-secondary);
  }

  .range-value {
    font-size: 15px;
    font-weight: 800;
    color: #10b981;
  }
}

.range-desc {
  margin: 0;
  font-size: 12px;
  color: var(--fur-text-secondary);
  text-align: center;
}

.formula {
  text-align: center;

  code {
    display: inline-block;
    padding: 10px 20px;
    background: var(--fur-bg-card);
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    color: var(--fur-primary);
    font-family: inherit;
    border: 2px solid var(--fur-border);
  }
}

.favorites-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.favorites-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  .favorites-icon {
    font-size: 24px;
  }

  .favorites-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
    flex: 1;
  }

  .add-fav-btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    }
  }
}

.add-fav-form {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--fur-bg-card);
  border-radius: 14px;
  border: 2px dashed var(--fur-primary);

  input {
    flex: 1;
    padding: 10px 16px;
    border: 2px solid var(--fur-border);
    border-radius: 10px;
    background: var(--fur-bg-soft);
    font-size: 13px;
    font-weight: 700;
    color: var(--fur-text);
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
    }
  }

  .confirm-btn {
    padding: 10px 20px;
    background: #10b981;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #059669;
      transform: scale(1.05);
    }
  }
}

.empty-fav {
  text-align: center;
  padding: 32px;
  color: var(--fur-text-secondary);

  .empty-icon {
    display: block;
    font-size: 40px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--fur-bg-card);
  border-radius: 14px;
  border: 2px solid var(--fur-border);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateX(4px);
  }
}

.fav-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fav-name {
  font-size: 14px;
  font-weight: 800;
  color: var(--fur-text);
}

.fav-coord {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--fur-primary);

  .dim-badge {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;

    &.overworld {
      background: rgba(16, 185, 129, 0.2);
    }

    &.nether {
      background: rgba(239, 68, 68, 0.2);
    }
  }
}

.fav-actions {
  display: flex;
  gap: 6px;
}

.fav-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background: var(--fur-bg-soft);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: scale(1.1);
  }

  &.delete:hover {
    background: rgba(239, 68, 68, 0.2);
  }
}

.tips-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  overflow: hidden;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  border-bottom: 4px solid var(--fur-border);

  .tips-icon {
    font-size: 26px;
  }

  .tips-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.tips-list {
  padding: 20px 24px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  align-items: flex-start;

  &:not(:last-child) {
    border-bottom: 2px solid var(--fur-border);
  }

  .tip-num {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    color: white;
    font-size: 13px;
    font-weight: 800;
    margin-top: 2px;
  }

  .tip-text {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: var(--fur-text-secondary);
    line-height: 1.7;
    font-weight: 600;
    word-break: break-word;
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

  .converter-section {
    padding: 20px;
  }

  .input-grid.cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }

  .coord-display:not(.cols-2) {
    grid-template-columns: repeat(2, 1fr);
  }

  .coord-box .coord-value {
    font-size: 22px;
  }
}

@media (max-width: 560px) {
  .input-grid.cols-2,
  .input-grid.cols-3 {
    grid-template-columns: 1fr;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .coord-display:not(.cols-2),
  .coord-display.cols-2 {
    grid-template-columns: 1fr;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .mode-btn {
    padding: 14px 16px;
    font-size: 14px;

    .btn-icon {
      font-size: 20px;
    }
  }

  .range-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .input-item {
    .input-label {
      width: 48px;
      height: 48px;
      font-size: 16px;
    }

    input {
      padding: 18px 16px 18px 60px;
      font-size: 22px;
    }
  }
}

@media (max-width: 440px) {
  .mode-switcher {
    grid-template-columns: 1fr;
  }

  .component-content {
    padding: 20px 16px;
  }

  .converter-section {
    padding: 16px;
  }

  .section-title {
    span:nth-child(2) {
      font-size: 16px;
    }
  }

  .accuracy-badge {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    text-align: center;
  }
}
</style>
