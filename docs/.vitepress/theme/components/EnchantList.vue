<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const categoryFilter = ref('all')

interface Enchantment {
  id: string
  name: string
  chinese: string
  maxLevel: number
  items: string[]
  description: string
  category: string
  incompatible: string[]
}

const enchantments: Enchantment[] = [
  { id: 'protection', name: 'Protection', chinese: '保护', maxLevel: 4, items: ['盔甲'], description: '减少受到的所有类型伤害', category: 'armor', incompatible: [] },
  { id: 'fire_protection', name: 'Fire Protection', chinese: '火焰保护', maxLevel: 4, items: ['盔甲'], description: '减少火焰伤害', category: 'armor', incompatible: ['protection', 'blast_protection', 'projectile_protection'] },
  { id: 'blast_protection', name: 'Blast Protection', chinese: '爆炸保护', maxLevel: 4, items: ['盔甲'], description: '减少爆炸伤害和击退', category: 'armor', incompatible: ['protection', 'fire_protection', 'projectile_protection'] },
  { id: 'projectile_protection', name: 'Projectile Protection', chinese: '弹射物保护', maxLevel: 4, items: ['盔甲'], description: '减少弹射物伤害', category: 'armor', incompatible: ['protection', 'fire_protection', 'blast_protection'] },
  { id: 'feather_falling', name: 'Feather Falling', chinese: '摔落保护', maxLevel: 4, items: ['靴子'], description: '减少掉落伤害', category: 'armor', incompatible: [] },
  { id: 'respiration', name: 'Respiration', chinese: '水下呼吸', maxLevel: 3, items: ['头盔'], description: '延长水下呼吸时间', category: 'armor', incompatible: [] },
  { id: 'aqua_affinity', name: 'Aqua Affinity', chinese: '水下速掘', maxLevel: 1, items: ['头盔'], description: '水下挖掘速度正常', category: 'armor', incompatible: [] },
  { id: 'thorns', name: 'Thorns', chinese: '荆棘', maxLevel: 3, items: ['盔甲'], description: '反弹伤害给攻击者', category: 'armor', incompatible: [] },
  { id: 'depth_strider', name: 'Depth Strider', chinese: '深海探索者', maxLevel: 3, items: ['靴子'], description: '增加水下移动速度', category: 'armor', incompatible: ['frost_walker'] },
  { id: 'frost_walker', name: 'Frost Walker', chinese: '冰霜行者', maxLevel: 2, items: ['靴子'], description: '在水上行走生成冰', category: 'armor', incompatible: ['depth_strider'] },
  { id: 'binding_curse', name: 'Curse of Binding', chinese: '绑定诅咒', maxLevel: 1, items: ['盔甲'], description: '无法移除已装备物品', category: 'curse', incompatible: [] },
  { id: 'sharpness', name: 'Sharpness', chinese: '锋利', maxLevel: 5, items: ['剑', '斧'], description: '增加近战伤害', category: 'weapon', incompatible: [] },
  { id: 'smite', name: 'Smite', chinese: '亡灵杀手', maxLevel: 5, items: ['剑', '斧'], description: '对亡灵生物造成额外伤害', category: 'weapon', incompatible: ['sharpness', 'bane_of_arthropods'] },
  { id: 'bane_of_arthropods', name: 'Bane of Arthropods', chinese: '节肢杀手', maxLevel: 5, items: ['剑', '斧'], description: '对节肢生物造成额外伤害', category: 'weapon', incompatible: ['sharpness', 'smite'] },
  { id: 'knockback', name: 'Knockback', chinese: '击退', maxLevel: 2, items: ['剑'], description: '增加攻击击退距离', category: 'weapon', incompatible: [] },
  { id: 'fire_aspect', name: 'Fire Aspect', chinese: '火焰附加', maxLevel: 2, items: ['剑'], description: '使目标着火', category: 'weapon', incompatible: [] },
  { id: 'looting', name: 'Looting', chinese: '抢夺', maxLevel: 3, items: ['剑'], description: '增加生物掉落物数量', category: 'weapon', incompatible: [] },
  { id: 'sweeping', name: 'Sweeping Edge', chinese: '横扫之刃', maxLevel: 3, items: ['剑'], description: '增加横扫攻击伤害', category: 'weapon', incompatible: [] },
  { id: 'efficiency', name: 'Efficiency', chinese: '效率', maxLevel: 5, items: ['镐', '铲', '斧', '锄', '剪刀'], description: '增加挖掘速度', category: 'tool', incompatible: [] },
  { id: 'silk_touch', name: 'Silk Touch', chinese: '精准采集', maxLevel: 1, items: ['镐', '铲', '斧', '锄'], description: '采集方块本身', category: 'tool', incompatible: ['fortune'] },
  { id: 'unbreaking', name: 'Unbreaking', chinese: '耐久', maxLevel: 3, items: ['所有工具/武器/盔甲'], description: '减少耐久消耗', category: 'universal', incompatible: [] },
  { id: 'fortune', name: 'Fortune', chinese: '时运', maxLevel: 3, items: ['镐', '铲', '斧', '锄'], description: '增加方块掉落数量', category: 'tool', incompatible: ['silk_touch'] },
  { id: 'power', name: 'Power', chinese: '力量', maxLevel: 5, items: ['弓'], description: '增加弓箭伤害', category: 'ranged', incompatible: [] },
  { id: 'punch', name: 'Punch', chinese: '冲击', maxLevel: 2, items: ['弓'], description: '增加弓箭击退距离', category: 'ranged', incompatible: [] },
  { id: 'flame', name: 'Flame', chinese: '火矢', maxLevel: 1, items: ['弓'], description: '点燃目标', category: 'ranged', incompatible: [] },
  { id: 'infinity', name: 'Infinity', chinese: '无限', maxLevel: 1, items: ['弓'], description: '射击不消耗普通箭', category: 'ranged', incompatible: ['mending'] },
  { id: 'luck_of_the_sea', name: 'Luck of the Sea', chinese: '海之眷顾', maxLevel: 3, items: ['钓鱼竿'], description: '增加宝藏概率', category: 'tool', incompatible: [] },
  { id: 'lure', name: 'Lure', chinese: '饵钓', maxLevel: 3, items: ['钓鱼竿'], description: '加快咬钩速度', category: 'tool', incompatible: [] },
  { id: 'mending', name: 'Mending', chinese: '经验修补', maxLevel: 1, items: ['所有物品'], description: '用经验修补耐久', category: 'universal', incompatible: ['infinity'] },
  { id: 'vanishing_curse', name: 'Curse of Vanishing', chinese: '消失诅咒', maxLevel: 1, items: ['所有物品'], description: '死亡时物品消失', category: 'curse', incompatible: [] },
  { id: 'multishot', name: 'Multishot', chinese: '多重射击', maxLevel: 1, items: ['弩'], description: '一次发射三支箭', category: 'ranged', incompatible: ['piercing'] },
  { id: 'quick_charge', name: 'Quick Charge', chinese: '快速装填', maxLevel: 3, items: ['弩'], description: '加快装填速度', category: 'ranged', incompatible: [] },
  { id: 'piercing', name: 'Piercing', chinese: '穿透', maxLevel: 4, items: ['弩'], description: '箭穿透多个目标', category: 'ranged', incompatible: ['multishot'] },
  { id: 'loyalty', name: 'Loyalty', chinese: '忠诚', maxLevel: 3, items: ['三叉戟'], description: '投掷后自动返回', category: 'weapon', incompatible: ['riptide'] },
  { id: 'impaling', name: 'Impaling', chinese: '穿刺', maxLevel: 5, items: ['三叉戟'], description: '对水生生物额外伤害', category: 'weapon', incompatible: [] },
  { id: 'riptide', name: 'Riptide', chinese: '激流', maxLevel: 3, items: ['三叉戟'], description: '水中/雨中冲刺', category: 'weapon', incompatible: ['loyalty', 'channeling'] },
  { id: 'channeling', name: 'Channeling', chinese: '引雷', maxLevel: 1, items: ['三叉戟'], description: '雷雨天气召唤雷电', category: 'weapon', incompatible: ['riptide'] },
  { id: 'soul_speed', name: 'Soul Speed', chinese: '灵魂疾行', maxLevel: 3, items: ['靴子'], description: '灵魂沙上加速', category: 'armor', incompatible: [] },
  { id: 'swift_sneak', name: 'Swift Sneak', chinese: '迅捷潜行', maxLevel: 3, items: ['护腿'], description: '增加潜行速度', category: 'armor', incompatible: [] }
]

const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'armor', name: '盔甲', icon: '🛡️' },
  { id: 'weapon', name: '武器', icon: '⚔️' },
  { id: 'tool', name: '工具', icon: '⛏️' },
  { id: 'ranged', name: '远程', icon: '🏹' },
  { id: 'universal', name: '通用', icon: '✨' },
  { id: 'curse', name: '诅咒', icon: '💀' }
]

const filteredEnchantments = computed(() => {
  return enchantments.filter(e => {
    const matchSearch = !searchQuery.value || 
      e.chinese.includes(searchQuery.value) || 
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = categoryFilter.value === 'all' || e.category === categoryFilter.value
    return matchSearch && matchCategory
  })
})

const toRoman = (num: number) => {
  const roman = ['', 'I', 'II', 'III', 'IV', 'V']
  return roman[num] || String(num)
}
</script>

<template>
  <div class="enchant-list">
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 搜索附魔名称..."
      >
    </div>

    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-tab"
        :class="{ active: categoryFilter === cat.id }"
        @click="categoryFilter = cat.id"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <div class="enchant-grid">
      <div v-for="enchant in filteredEnchantments" :key="enchant.id" class="enchant-card">
        <div class="enchant-header">
          <span class="enchant-name">{{ enchant.chinese }}</span>
          <span class="enchant-level">Ⅰ ~ {{ toRoman(enchant.maxLevel) }}</span>
        </div>
        <div class="enchant-id">{{ enchant.name }}</div>
        <p class="enchant-desc">{{ enchant.description }}</p>
        <div class="enchant-info">
          <div class="info-row">
            <span class="info-label">适用</span>
            <span class="info-value">{{ enchant.items.join(', ') }}</span>
          </div>
          <div v-if="enchant.incompatible.length" class="info-row incompatible">
            <span class="info-label">❌ 互斥</span>
            <span class="info-value">
              {{ enchant.incompatible.map(i => enchantments.find(e => e.id === i)?.chinese || i).join(', ') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.enchant-list {
  max-width: 900px;
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

.search-bar input {
  width: 100%;
  padding: 14px 20px;
  border: 2px solid var(--fur-border);
  border-radius: 12px;
  background: var(--fur-bg-muted);
  color: var(--fur-text);
  font-size: 15px;
  transition: border-color 0.2s;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: var(--fur-primary);
  }
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.category-tab {
  padding: 8px 14px;
  border: 1px solid var(--fur-border);
  border-radius: 8px;
  background: var(--fur-bg-card);
  color: var(--fur-text-secondary);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &.active {
    background: var(--fur-primary);
    border-color: var(--fur-primary);
    color: white;
  }

  &:hover:not(.active) {
    border-color: var(--fur-primary);
  }
}

.enchant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.enchant-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--fur-primary);
    box-shadow: var(--fur-shadow-card);
  }
}

.enchant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.enchant-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--fur-primary);
}

.enchant-level {
  font-size: 12px;
  padding: 2px 8px;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  color: var(--fur-primary);
  font-weight: 600;
}

.enchant-id {
  font-size: 11px;
  color: var(--fur-text-muted);
  margin-bottom: 10px;
  font-family: monospace;
}

.enchant-desc {
  font-size: 13px;
  color: var(--fur-text-secondary);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.enchant-info {
  border-top: 1px solid var(--fur-border-light);
  padding-top: 12px;
}

.info-row {
  display: flex;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 6px;

  &.incompatible {
    color: #ef4444;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.info-label {
  font-weight: 600;
  color: var(--fur-text-muted);
  min-width: 40px;
}

.info-value {
  flex: 1;
  color: var(--fur-text-secondary);
}
</style>
