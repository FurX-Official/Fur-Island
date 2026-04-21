<script setup lang="ts">
import { ref, computed } from 'vue'

interface Enchantment {
  id: string
  name: string
  maxLevel: number
  cost: number[]
  incompatible: string[]
  category: string
  description: string
}

const enchantments: Enchantment[] = [
  { id: 'protection', name: '保护', maxLevel: 4, cost: [1, 2, 3, 4], incompatible: ['fire_protection', 'blast_protection', 'projectile_protection'], category: 'armor', description: '减少所有伤害' },
  { id: 'fire_protection', name: '火焰保护', maxLevel: 4, cost: [1, 2, 3, 4], incompatible: ['protection', 'blast_protection', 'projectile_protection'], category: 'armor', description: '减少火焰伤害' },
  { id: 'blast_protection', name: '爆炸保护', maxLevel: 4, cost: [2, 3, 4, 5], incompatible: ['protection', 'fire_protection', 'projectile_protection'], category: 'armor', description: '减少爆炸伤害' },
  { id: 'projectile_protection', name: '弹射物保护', maxLevel: 4, cost: [1, 2, 3, 4], incompatible: ['protection', 'fire_protection', 'blast_protection'], category: 'armor', description: '减少弹射物伤害' },
  { id: 'feather_falling', name: '摔落保护', maxLevel: 4, cost: [1, 2, 3, 4], incompatible: [], category: 'boots', description: '减少掉落伤害' },
  { id: 'respiration', name: '水下呼吸', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'helmet', description: '延长水下呼吸时间' },
  { id: 'aqua_affinity', name: '水下速掘', maxLevel: 1, cost: [2], incompatible: [], category: 'helmet', description: '水下挖掘速度正常' },
  { id: 'thorns', name: '荆棘', maxLevel: 3, cost: [4, 5, 6], incompatible: [], category: 'armor', description: '反弹伤害给攻击者' },
  { id: 'depth_strider', name: '深海探索者', maxLevel: 3, cost: [2, 3, 4], incompatible: ['frost_walker'], category: 'boots', description: '加快水下行走速度' },
  { id: 'frost_walker', name: '冰霜行者', maxLevel: 2, cost: [2, 4], incompatible: ['depth_strider'], category: 'boots', description: '在水上行走生成冰' },
  { id: 'binding_curse', name: '绑定诅咒', maxLevel: 1, cost: [4], incompatible: [], category: 'armor', description: '无法取下装备' },

  { id: 'sharpness', name: '锋利', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: ['smite', 'bane_of_arthropods'], category: 'sword', description: '增加近战伤害' },
  { id: 'smite', name: '亡灵杀手', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: ['sharpness', 'bane_of_arthropods'], category: 'sword', description: '对亡灵生物额外伤害' },
  { id: 'bane_of_arthropods', name: '节肢杀手', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: ['sharpness', 'smite'], category: 'sword', description: '对节肢生物额外伤害' },
  { id: 'knockback', name: '击退', maxLevel: 2, cost: [1, 2], incompatible: [], category: 'sword', description: '增加击退距离' },
  { id: 'fire_aspect', name: '火焰附加', maxLevel: 2, cost: [2, 4], incompatible: [], category: 'sword', description: '使目标着火' },
  { id: 'looting', name: '抢夺', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'sword', description: '增加掉落物数量' },
  { id: 'sweeping', name: '横扫之刃', maxLevel: 3, cost: [1, 2, 3], incompatible: [], category: 'sword', description: '增加横扫攻击伤害' },

  { id: 'efficiency', name: '效率', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: [], category: 'tool', description: '加快挖掘速度' },
  { id: 'silk_touch', name: '精准采集', maxLevel: 1, cost: [4], incompatible: ['fortune'], category: 'tool', description: '方块本身掉落' },
  { id: 'fortune', name: '时运', maxLevel: 3, cost: [2, 3, 4], incompatible: ['silk_touch'], category: 'tool', description: '增加方块掉落' },
  { id: 'unbreaking', name: '耐久', maxLevel: 3, cost: [1, 2, 3], incompatible: [], category: 'all', description: '减少耐久消耗' },
  { id: 'mending', name: '经验修补', maxLevel: 1, cost: [4], incompatible: [], category: 'all', description: '用经验修复装备' },
  { id: 'vanishing_curse', name: '消失诅咒', maxLevel: 1, cost: [4], incompatible: [], category: 'all', description: '死亡时物品消失' },

  { id: 'power', name: '力量', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: [], category: 'bow', description: '增加弓箭伤害' },
  { id: 'punch', name: '冲击', maxLevel: 2, cost: [2, 3], incompatible: [], category: 'bow', description: '增加弓箭击退' },
  { id: 'flame', name: '火矢', maxLevel: 1, cost: [2], incompatible: [], category: 'bow', description: '箭矢燃烧' },
  { id: 'infinity', name: '无限', maxLevel: 1, cost: [4], incompatible: ['mending'], category: 'bow', description: '不消耗普通箭' },

  { id: 'luck_of_the_sea', name: '海之眷顾', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'fishing', description: '增加宝藏几率' },
  { id: 'lure', name: '饵钓', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'fishing', description: '加快上钩速度' },

  { id: 'loyalty', name: '忠诚', maxLevel: 3, cost: [1, 2, 3], incompatible: ['riptide'], category: 'trident', description: '三叉戟返回' },
  { id: 'impaling', name: '穿刺', maxLevel: 5, cost: [1, 2, 3, 4, 5], incompatible: [], category: 'trident', description: '对水生生物额外伤害' },
  { id: 'riptide', name: '激流', maxLevel: 3, cost: [2, 3, 4], incompatible: ['loyalty', 'channeling'], category: 'trident', description: '水中/雨中冲刺' },
  { id: 'channeling', name: '引雷', maxLevel: 1, cost: [4], incompatible: ['riptide'], category: 'trident', description: '雷雨天召唤闪电' },

  { id: 'multishot', name: '多重射击', maxLevel: 1, cost: [2], incompatible: ['piercing'], category: 'crossbow', description: '一次射3支箭' },
  { id: 'quick_charge', name: '快速装填', maxLevel: 3, cost: [1, 2, 3], incompatible: [], category: 'crossbow', description: '加快装填速度' },
  { id: 'piercing', name: '穿透', maxLevel: 4, cost: [1, 2, 3, 4], incompatible: ['multishot'], category: 'crossbow', description: '箭穿透多个目标' },

  { id: 'soul_speed', name: '灵魂疾行', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'boots', description: '灵魂沙上加速' },
  { id: 'swift_sneak', name: '迅捷潜行', maxLevel: 3, cost: [2, 3, 4], incompatible: [], category: 'legs', description: '潜行速度加快' },
]

const categories = [
  { id: 'all', name: '全部', icon: '📦' },
  { id: 'armor', name: '盔甲', icon: '🛡️' },
  { id: 'helmet', name: '头盔', icon: '⛑️' },
  { id: 'legs', name: '护腿', icon: '🦵' },
  { id: 'boots', name: '靴子', icon: '👢' },
  { id: 'sword', name: '剑', icon: '⚔️' },
  { id: 'tool', name: '工具', icon: '⛏️' },
  { id: 'bow', name: '弓', icon: '🏹' },
  { id: 'crossbow', name: '弩', icon: '🎯' },
  { id: 'fishing', name: '钓鱼竿', icon: '🎣' },
  { id: 'trident', name: '三叉戟', icon: '🔱' },
]

const selectedCategory = ref('all')

const selectedEnchantments = ref<{ id: string, level: number }[]>([])

const filteredEnchantments = computed(() => {
  if (selectedCategory.value === 'all') return enchantments
  if (selectedCategory.value === 'armor') {
    return enchantments.filter(e => ['armor', 'helmet', 'legs', 'boots', 'all'].includes(e.category))
  }
  return enchantments.filter(e => [selectedCategory.value, 'all'].includes(e.category))
})

const toggleEnchantment = (id: string) => {
  const existing = selectedEnchantments.value.find(e => e.id === id)
  if (existing) {
    selectedEnchantments.value = selectedEnchantments.value.filter(e => e.id !== id)
  } else {
    const ench = enchantments.find(e => e.id === id)
    if (ench) {
      selectedEnchantments.value.push({ id, level: ench.maxLevel })
    }
  }
}

const setLevel = (id: string, level: number) => {
  const existing = selectedEnchantments.value.find(e => e.id === id)
  if (existing) {
    existing.level = level
  }
}

const isSelected = (id: string) => selectedEnchantments.value.some(e => e.id === id)

const getEnchantment = (id: string) => enchantments.find(e => e.id === id)

const totalCost = computed(() => {
  let sum = 0
  selectedEnchantments.value.forEach(sel => {
    const ench = getEnchantment(sel.id)
    if (ench) {
      sum += ench.cost[sel.level - 1] * 2
    }
  })
  return sum
})

const totalLevels = computed(() => {
  const n = selectedEnchantments.value.length
  return n > 0 ? Math.ceil(totalCost.value / n) : 0
})

const incompatibleList = computed(() => {
  const conflicts: string[][] = []
  const list = selectedEnchantments.value.map(e => e.id)
  
  for (let i = 0; i < list.length; i++) {
    const ench = getEnchantment(list[i])
    if (!ench) continue
    
    for (const incomp of ench.incompatible) {
      if (list.includes(incomp) && !conflicts.some(c => 
        (c.includes(ench!.id) && c.includes(incomp))
      )) {
        conflicts.push([ench.id, incomp])
      }
    }
  }
  
  return conflicts
})
</script>

<template>
  <div class="enchantment-calculator">
    <div class="component-header">
      <span class="header-icon">✨</span>
      <span class="header-text">附魔计算器</span>
    </div>

    <div class="calculator-content">
      <p class="calculator-subtitle">计算附魔所需的经验等级，检查冲突搭配</p>

      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="tab-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
        </button>
      </div>

      <div class="enchantments-grid">
        <div
          v-for="ench in filteredEnchantments"
          :key="ench.id"
          class="enchantment-card"
          :class="{ 
            selected: isSelected(ench.id),
            incompatible: isSelected(ench.id) && incompatibleList.flat().includes(ench.id)
          }"
          @click="toggleEnchantment(ench.id)"
        >
          <div class="ench-header">
            <span class="ench-name">{{ ench.name }}</span>
            <span class="ench-max">Lv.{{ ench.maxLevel }}</span>
          </div>
          <p class="ench-desc">{{ ench.description }}</p>
          
          <div v-if="isSelected(ench.id)" class="level-selector" @click.stop>
            <button
              v-for="l in ench.maxLevel"
              :key="l"
              class="level-btn"
              :class="{ active: selectedEnchantments.find(e => e.id === ench.id)?.level === l }"
              @click="setLevel(ench.id, l)"
            >
              {{ l }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="incompatibleList.length > 0" class="warning-box">
        <div class="warning-icon">⚠️</div>
        <div class="warning-content">
          <h4>存在附魔冲突！</h4>
          <p v-for="(pair, i) in incompatibleList" :key="i">
            ❌ {{ getEnchantment(pair[0])?.name }} ↔ {{ getEnchantment(pair[1])?.name }}
          </p>
        </div>
      </div>

      <div v-if="selectedEnchantments.length > 0" class="result-summary">
        <h4>📊 结算结果</h4>
        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-icon">🔮</span>
            <span class="stat-value">{{ selectedEnchantments.length }}</span>
            <span class="stat-label">附魔数量</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">💎</span>
            <span class="stat-value">{{ totalCost }}</span>
            <span class="stat-label">总代价</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">{{ totalLevels }}</span>
            <span class="stat-label">推荐等级</span>
          </div>
        </div>
        
        <div class="selected-list">
          <span
            v-for="sel in selectedEnchantments"
            :key="sel.id"
            class="selected-tag"
          >
            {{ getEnchantment(sel.id)?.name }} {{ sel.level }}
            <button @click.stop="toggleEnchantment(sel.id)">×</button>
          </span>
        </div>

        <button class="clear-btn" @click="selectedEnchantments = []">
          🔄 清空全部
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.enchantment-calculator {
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

.calculator-content {
  padding: 32px;
}

.calculator-subtitle {
  font-size: 15px;
  color: var(--fur-text-secondary);
  margin: 0 0 24px 0;
  text-align: center;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
}

.tab-btn {
  padding: 8px 14px;
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
    background: rgba(139, 92, 246, 0.1);
  }

  &.active {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-color: transparent;
    color: white;
  }
}

.enchantments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.enchantment-card {
  padding: 14px;
  background: var(--fur-bg-soft);
  border: 2px solid var(--fur-border);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
  }

  &.selected {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    border-color: var(--fur-primary);
  }

  &.incompatible {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.15));
    border-color: #ef4444;
    animation: shake 0.3s ease;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.ench-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ench-name {
  font-weight: 800;
  color: var(--fur-text);
  font-size: 14px;
}

.ench-max {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--fur-primary);
  color: white;
  border-radius: 20px;
  font-weight: 800;
}

.ench-desc {
  font-size: 12px;
  color: var(--fur-text-secondary);
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.level-selector {
  display: flex;
  gap: 6px;
  padding-top: 10px;
  border-top: 2px dashed var(--fur-border);
}

.level-btn {
  flex: 1;
  padding: 6px;
  border: 2px solid var(--fur-border);
  border-radius: 8px;
  background: var(--fur-bg-card);
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
  }

  &.active {
    background: var(--fur-primary);
    border-color: transparent;
    color: white;
  }
}

.warning-box {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1));
  border: 2px solid #ef4444;
  border-radius: 16px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.warning-icon {
  font-size: 28px;
}

.warning-content h4 {
  margin: 0 0 8px 0;
  color: #ef4444;
  font-weight: 900;
}

.warning-content p {
  margin: 4px 0;
  font-size: 14px;
  font-weight: 700;
}

.result-summary {
  padding: 24px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 18px;
  border: 2px solid var(--fur-primary);
}

.result-summary h4 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--fur-primary);
  text-align: center;
}

.result-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--fur-bg-card);
  border-radius: 14px;
  border: 2px solid var(--fur-border);
}

.stat-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 900;
  color: var(--fur-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--fur-text-secondary);
  font-weight: 700;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 12px;
    cursor: pointer;
    font-weight: 900;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
}

.clear-btn {
  width: 100%;
  padding: 12px;
  background: var(--fur-bg-soft);
  border: 2px solid var(--fur-border);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  color: var(--fur-text);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
    background: rgba(139, 92, 246, 0.1);
  }
}

@media (max-width: 768px) {
  .enchantments-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .result-stats {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    justify-content: flex-start;
  }
}
</style>
