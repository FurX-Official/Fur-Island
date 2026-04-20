<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

interface Potion {
  name: string
  icon: string
  effect: string
  duration: string
  ingredients: string[]
  base?: string
  enhanced?: string
  extended?: string
}

const potions: Potion[] = [
  {
    name: '粗制的药水',
    icon: '🧪',
    effect: '无效果 - 基础药水',
    duration: '-',
    ingredients: ['水瓶', '地狱疣']
  },
  {
    name: '再生药水',
    icon: '❤️',
    effect: '生命恢复',
    duration: '0:45',
    ingredients: ['粗制的药水', '恶魂之泪'],
    enhanced: '0:22',
    extended: '2:00'
  },
  {
    name: '迅捷药水',
    icon: '⚡',
    effect: '移动速度 +20%',
    duration: '3:00',
    ingredients: ['粗制的药水', '糖'],
    enhanced: '1:30',
    extended: '8:00'
  },
  {
    name: '防火药水',
    icon: '🔥',
    effect: '免疫火焰伤害',
    duration: '3:00',
    ingredients: ['粗制的药水', '岩浆膏'],
    extended: '8:00'
  },
  {
    name: '治疗药水',
    icon: '💚',
    effect: '立即恢复 4 点生命',
    duration: '瞬间',
    ingredients: ['粗制的药水', '闪烁的西瓜'],
    enhanced: '恢复 8 点'
  },
  {
    name: '力量药水',
    icon: '💪',
    effect: '攻击伤害 +130%',
    duration: '3:00',
    ingredients: ['粗制的药水', '烈焰粉'],
    enhanced: '1:30 (+260%)',
    extended: '8:00'
  },
  {
    name: '夜视药水',
    icon: '👁️',
    effect: '黑暗中看清物体',
    duration: '3:00',
    ingredients: ['粗制的药水', '金胡萝卜'],
    extended: '8:00'
  },
  {
    name: '剧毒药水',
    icon: '☠️',
    effect: '中毒 (每 1.25 秒 1 伤害)',
    duration: '0:45',
    ingredients: ['粗制的药水', '蜘蛛眼'],
    enhanced: '0:21',
    extended: '2:00'
  },
  {
    name: '虚弱药水',
    icon: '😵',
    effect: '攻击伤害 -0.5 心',
    duration: '1:30',
    base: '水瓶',
    ingredients: ['水瓶', '发酵蛛眼'],
    extended: '4:00'
  },
  {
    name: '迟缓药水',
    icon: '🐌',
    effect: '移动速度 -15%',
    duration: '1:30',
    ingredients: ['迅捷药水 / 跳跃药水', '发酵蛛眼'],
    extended: '4:00'
  },
  {
    name: '伤害药水',
    icon: '💀',
    effect: '立即造成 6 点伤害',
    duration: '瞬间',
    ingredients: ['治疗药水 / 剧毒药水', '发酵蛛眼'],
    enhanced: '12 点伤害'
  },
  {
    name: '水肺药水',
    icon: '🌊',
    effect: '水下不消耗氧气',
    duration: '3:00',
    ingredients: ['粗制的药水', '河豚'],
    extended: '8:00'
  },
  {
    name: '跳跃药水',
    icon: '🦘',
    effect: '跳跃高度 +50%',
    duration: '3:00',
    ingredients: ['粗制的药水', '兔子脚'],
    enhanced: '1:30 (+180%)',
    extended: '8:00'
  },
  {
    name: '隐身药水',
    icon: '👻',
    effect: '使玩家隐形',
    duration: '3:00',
    ingredients: ['夜视药水', '发酵蛛眼'],
    extended: '8:00'
  },
  {
    name: '缓降药水',
    icon: '🪂',
    effect: '免疫掉落伤害，下落缓慢',
    duration: '1:30',
    ingredients: ['粗制的药水', '幻翼膜'],
    extended: '4:00'
  },
  {
    name: '神龟药水',
    icon: '🐢',
    effect: '抗性 +60%，速度 -60%',
    duration: '0:20',
    ingredients: ['粗制的药水', '海龟壳'],
    enhanced: '0:40',
    extended: '1:00'
  },
  {
    name: '慢落药水',
    icon: '🍃',
    effect: '减缓下落速度',
    duration: '1:30',
    ingredients: ['粗制的药水', '幻翼膜'],
    extended: '4:00'
  }
]

const modifiers = [
  { icon: '✨', item: '萤石粉', effect: '增强效果 (II级)' },
  { icon: '🔴', item: '红石粉', effect: '延长时间' },
  { icon: '💨', item: '火药', effect: '喷溅药水' },
  { icon: '🔗', item: '龙息', effect: '滞留药水' }
]

const filteredPotions = ref(potions.filter(p => 
  !searchQuery.value || 
  p.name.includes(searchQuery.value) || 
  p.effect.includes(searchQuery.value)
))
</script>

<template>
  <div class="potion-brewing">
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 搜索药水名称或效果..."
        @input="filteredPotions = potions.filter(p => 
          !searchQuery || 
          p.name.includes(searchQuery) || 
          p.effect.includes(searchQuery)
        )"
      >
    </div>

    <div class="modifiers-card">
      <div class="modifiers-title">🎛️ 药水改性配方</div>
      <div class="modifiers-grid">
        <div v-for="mod in modifiers" :key="mod.item" class="modifier-item">
          <span class="mod-icon">{{ mod.icon }}</span>
          <span class="mod-item">{{ mod.item }}</span>
          <span class="mod-effect">{{ mod.effect }}</span>
        </div>
      </div>
    </div>

    <div class="potion-grid">
      <div v-for="potion in filteredPotions" :key="potion.name" class="potion-card">
        <div class="potion-header">
          <span class="potion-icon">{{ potion.icon }}</span>
          <div>
            <div class="potion-name">{{ potion.name }}</div>
            <div class="potion-duration">⏱️ {{ potion.duration }}</div>
          </div>
        </div>
        <p class="potion-effect">{{ potion.effect }}</p>
        
        <div class="brewing-path">
          <div class="path-title">📋 酿造材料</div>
          <div class="path-items">
            <span v-for="(item, i) in potion.ingredients" :key="i" class="path-item">
              {{ item }}
              <span v-if="i < potion.ingredients.length - 1" class="path-arrow">+</span>
            </span>
          </div>
        </div>

        <div class="potion-variants" v-if="potion.enhanced || potion.extended">
          <div v-if="potion.enhanced" class="variant">
            <span class="variant-icon">✨</span>
            <span class="variant-label">萤石增强:</span>
            <span class="variant-value">{{ potion.enhanced }}</span>
          </div>
          <div v-if="potion.extended" class="variant">
            <span class="variant-icon">🔴</span>
            <span class="variant-label">红石延长:</span>
            <span class="variant-value">{{ potion.extended }}</span>
          </div>
        </div>
      </div>
    </div>

    <AccordionPanel title="💡 酿造提示" icon="💡">
      <ul class="tips-list">
        <li>✅ 所有药水都可以加火药变成喷溅药水</li>
        <li>✅ 喷溅药水可以加龙息变成滞留药水</li>
        <li>⚠️ 有些药水无法同时增强 + 延长</li>
        <li>⚠️ 加入发酵蛛眼通常会反转药水效果</li>
        <li>💡 地狱疣 + 水瓶 = 绝大多数药水的基础</li>
      </ul>
    </AccordionPanel>
  </div>
</template>

<style scoped lang="scss">
.potion-brewing {
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
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: var(--fur-primary);
  }
}

.modifiers-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.modifiers-title {
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 15px;
}

.modifiers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.modifier-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--fur-bg-muted);
  border-radius: 8px;
  font-size: 13px;
}

.mod-icon {
  font-size: 18px;
}

.mod-item {
  font-weight: 600;
  min-width: 60px;
}

.mod-effect {
  color: var(--fur-text-secondary);
}

.potion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 16px;
}

.potion-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 18px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--fur-primary);
    box-shadow: var(--fur-shadow-card);
  }
}

.potion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.potion-icon {
  font-size: 32px;
}

.potion-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
}

.potion-duration {
  font-size: 12px;
  color: var(--fur-primary);
  font-weight: 600;
}

.potion-effect {
  font-size: 13px;
  color: var(--fur-text-secondary);
  margin: 0 0 14px 0;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--fur-border-light);
}

.brewing-path {
  margin-bottom: 14px;
}

.path-title {
  font-size: 12px;
  color: var(--fur-text-muted);
  margin-bottom: 8px;
}

.path-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.path-item {
  padding: 4px 10px;
  background: var(--fur-bg-muted);
  border-radius: 6px;
  font-weight: 500;
}

.path-arrow {
  color: var(--fur-primary);
  font-weight: 700;
}

.potion-variants {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed var(--fur-border-light);
}

.variant {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.variant-icon {
  font-size: 14px;
}

.variant-label {
  color: var(--fur-text-muted);
}

.variant-value {
  font-weight: 600;
  color: var(--fur-primary);
}

.tips-list {
  margin: 0;
  padding-left: 20px;

  li {
    padding: 4px 0;
    font-size: 14px;
  }
}
</style>
