<script setup lang="ts">
import { ref, computed } from 'vue'

interface Potion {
  id: string
  name: string
  effect: string
  duration: string
  amplifier: string
  base: string
  ingredient: string
  type: 'positive' | 'negative' | 'neutral'
  icon: string
}

const potions: Potion[] = [
  { id: 'speed', name: '速度', effect: '提高移动速度', duration: '3:00 / 8:00', amplifier: '+20% / +40%', base: '粗制的药水', ingredient: '糖', type: 'positive', icon: '🏃' },
  { id: 'slowness', name: '缓慢', effect: '降低移动速度', duration: '1:30 / 4:00', amplifier: '-15% / -30%', base: '粗制的药水', ingredient: '发酵蛛眼', type: 'negative', icon: '🐌' },
  { id: 'strength', name: '力量', effect: '提高近战伤害', duration: '3:00 / 8:00', amplifier: '+3 / +6', base: '粗制的药水', ingredient: '烈焰粉', type: 'positive', icon: '💪' },
  { id: 'weakness', name: '虚弱', effect: '降低近战伤害', duration: '1:30 / 4:00', amplifier: '-2', base: '粗制的药水', ingredient: '发酵蛛眼', type: 'negative', icon: '💔' },
  { id: 'healing', name: '瞬间治疗', effect: '立即恢复生命', duration: '瞬间', amplifier: '4 ❤️ / 8 ❤️', base: '粗制的药水', ingredient: '闪烁的西瓜', type: 'positive', icon: '💚' },
  { id: 'harming', name: '瞬间伤害', effect: '立即造成伤害', duration: '瞬间', amplifier: '6 ❤️ / 12 ❤️', base: '治疗/剧毒', ingredient: '发酵蛛眼', type: 'negative', icon: '💀' },
  { id: 'jump', name: '跳跃提升', effect: '提高跳跃高度', duration: '3:00 / 8:00', amplifier: '+1 / +2.5格', base: '粗制的药水', ingredient: '兔子脚', type: 'positive', icon: '🦘' },
  { id: 'regen', name: '生命恢复', effect: '持续恢复生命', duration: '0:45 / 2:00', amplifier: '0.5❤️/s', base: '粗制的药水', ingredient: '恶魂之泪', type: 'positive', icon: '❤️‍🩹' },
  { id: 'poison', name: '中毒', effect: '持续造成伤害', duration: '0:45 / 2:00', amplifier: '0.5❤️/s', base: '粗制的药水', ingredient: '蜘蛛眼', type: 'negative', icon: '☠️' },
  { id: 'night_vision', name: '夜视', effect: '黑暗中看清', duration: '3:00 / 8:00', amplifier: '无', base: '粗制的药水', ingredient: '金胡萝卜', type: 'positive', icon: '🌙' },
  { id: 'invisibility', name: '隐身', effect: '身体变为透明', duration: '3:00 / 8:00', amplifier: '无', base: '夜视', ingredient: '发酵蛛眼', type: 'positive', icon: '👻' },
  { id: 'water_breathing', name: '水下呼吸', effect: '水下不会缺氧', duration: '3:00 / 8:00', amplifier: '无', base: '粗制的药水', ingredient: '河豚', type: 'positive', icon: '🐟' },
  { id: 'fire_resistance', name: '抗火', effect: '免疫火焰伤害', duration: '3:00 / 8:00', amplifier: '无', base: '粗制的药水', ingredient: '岩浆膏', type: 'positive', icon: '🔥' },
  { id: 'turtle_master', name: '神龟之力', effect: '减伤+缓慢', duration: '0:20 / 0:40', amplifier: '减伤60%', base: '粗制的药水', ingredient: '海龟壳', type: 'neutral', icon: '🐢' },
  { id: 'slow_falling', name: '缓降', effect: '掉落不受伤害', duration: '1:30 / 4:00', amplifier: '无', base: '粗制的药水', ingredient: '幻翼膜', type: 'positive', icon: '🪂' },
  { id: 'luck', name: '幸运', effect: '提高钓鱼运气', duration: '5:00', amplifier: '+1幸运', base: '粗制的药水', ingredient: '蒲公英', type: 'positive', icon: '🍀' },
]

const modifiers = [
  { name: '红石粉', effect: '延长持续时间至 8:00', icon: '⏱️' },
  { name: '荧石粉', effect: '增强效果至 Ⅱ 级', icon: '⚡' },
  { name: '火药', effect: '变为喷溅型药水', icon: '💥' },
  { name: '龙息', effect: '变为滞留型药水', icon: '🌀' },
]

const searchQuery = ref('')
const selectedType = ref<'all' | 'positive' | 'negative' | 'neutral'>('all')

const filteredPotions = computed(() => {
  let results = potions
  
  if (selectedType.value !== 'all') {
    results = results.filter(p => p.type === selectedType.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.effect.toLowerCase().includes(query) ||
      p.ingredient.toLowerCase().includes(query)
    )
  }
  
  return results
})

const typeLabels = {
  all: { label: '全部', icon: '📦', color: '#6b7280' },
  positive: { label: '增益', icon: '✨', color: '#10b981' },
  negative: { label: '负面', icon: '💀', color: '#ef4444' },
  neutral: { label: '特殊', icon: '🔮', color: '#8b5cf6' },
}
</script>

<template>
  <div class="potion-finder">
    <div class="component-header">
      <span class="header-icon">🧪</span>
      <span class="header-text">药水配方查询器</span>
    </div>

    <div class="finder-content">
      <p class="finder-subtitle">搜索和查看所有药水的酿造配方与效果</p>

      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索药水名称、效果或材料..."
        >
        <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''">×</button>
      </div>

      <div class="type-filters">
        <button
          v-for="(type, key) in typeLabels"
          :key="key"
          class="filter-btn"
          :class="{ active: selectedType === key }"
          :style="selectedType === key ? { background: type.color } : {}"
          @click="selectedType = key as any"
        >
          <span>{{ type.icon }}</span>
          <span>{{ type.label }}</span>
        </button>
      </div>

      <div class="potions-grid">
        <div
          v-for="potion in filteredPotions"
          :key="potion.id"
          class="potion-card"
          :class="potion.type"
        >
          <div class="potion-header">
            <span class="potion-icon">{{ potion.icon }}</span>
            <div>
              <h4 class="potion-name">{{ potion.name }}</h4>
              <span class="potion-effect">{{ potion.effect }}</span>
            </div>
          </div>

          <div class="potion-details">
            <div class="detail-row">
              <span class="detail-label">⏱️ 持续时间</span>
              <span class="detail-value">{{ potion.duration }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📈 效果强度</span>
              <span class="detail-value">{{ potion.amplifier }}</span>
            </div>
          </div>

          <div class="recipe-section">
            <h5>📋 酿造配方</h5>
            <div class="recipe-steps">
              <div class="recipe-step">
                <span class="step-icon">🧪</span>
                <span class="step-text">基础: {{ potion.base }}</span>
              </div>
              <div class="recipe-arrow">↓</div>
              <div class="recipe-step">
                <span class="step-icon">🌿</span>
                <span class="step-text">材料: {{ potion.ingredient }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modifiers-section">
        <h4>🔧 药水改性剂</h4>
        <div class="modifiers-grid">
          <div v-for="mod in modifiers" :key="mod.name" class="modifier-card">
            <span class="mod-icon">{{ mod.icon }}</span>
            <span class="mod-name">{{ mod.name }}</span>
            <span class="mod-effect">{{ mod.effect }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.potion-finder {
  max-width: 1100px;
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
  background: linear-gradient(135deg, #10b981, #059669);
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

.finder-content {
  padding: 32px;
}

.finder-subtitle {
  font-size: 15px;
  color: var(--fur-text-secondary);
  margin: 0 0 24px 0;
  text-align: center;
}

.search-bar {
  position: relative;
  margin-bottom: 16px;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    opacity: 0.5;
  }

  input {
    width: 100%;
    padding: 14px 20px;
    padding-left: 50px;
    padding-right: 50px;
    border: 2px solid var(--fur-border);
    border-radius: 16px;
    background: var(--fur-bg-soft);
    font-size: 14px;
    font-weight: 600;
    color: var(--fur-text);
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    &::placeholder {
      color: var(--fur-text-secondary);
    }
  }

  .clear-search {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: var(--fur-border);
    color: var(--fur-text);
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: var(--fur-primary);
      color: white;
    }
  }
}

.type-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 18px;
  background: var(--fur-bg-soft);
  border: 2px solid var(--fur-border);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--fur-text);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: var(--fur-primary);
  }

  &.active {
    border-color: transparent;
    color: white;
  }
}

.potions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.potion-card {
  padding: 18px;
  background: var(--fur-bg-soft);
  border: 2px solid var(--fur-border);
  border-radius: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &.positive {
    border-color: #10b981;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), var(--fur-bg-soft));
  }

  &.negative {
    border-color: #ef4444;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), var(--fur-bg-soft));
  }

  &.neutral {
    border-color: #8b5cf6;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), var(--fur-bg-soft));
  }
}

.potion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 2px dashed var(--fur-border);
}

.potion-icon {
  font-size: 32px;
}

.potion-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 900;
  color: var(--fur-text);
}

.potion-effect {
  font-size: 12px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.potion-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 12px;
  color: var(--fur-text-secondary);
  font-weight: 700;
}

.detail-value {
  font-size: 12px;
  font-weight: 800;
  color: var(--fur-primary);
}

.recipe-section h5 {
  margin: 0 0 10px 0;
  font-size: 13px;
  font-weight: 900;
  color: var(--fur-primary);
}

.recipe-steps {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.recipe-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--fur-bg-card);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}

.step-icon {
  font-size: 16px;
}

.step-text {
  font-size: 12px;
  font-weight: 700;
}

.recipe-arrow {
  font-size: 14px;
  font-weight: 900;
  color: var(--fur-primary);
}

.modifiers-section h4 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--fur-primary);
  text-align: center;
}

.modifiers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.modifier-card {
  padding: 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border: 2px solid var(--fur-border);
  border-radius: 14px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
  }
}

.mod-icon {
  display: block;
  font-size: 24px;
  margin-bottom: 6px;
}

.mod-name {
  display: block;
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 4px;
}

.mod-effect {
  display: block;
  font-size: 11px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px;
  color: var(--fur-text-secondary);

  .empty-icon {
    font-size: 48px;
    display: block;
    margin-bottom: 12px;
  }
}

@media (max-width: 768px) {
  .potions-grid {
    grid-template-columns: 1fr;
  }

  .modifiers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
