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
    <div class="converter-card">
      <div class="card-header">
        <div class="header-icon">🔍</div>
        <div class="header-text">
          <h3>搜索药水</h3>
          <p>输入药水名称或效果关键词</p>
        </div>
      </div>
      
      <div class="input-grid cols-1">
        <div class="input-item">
          <div class="input-label">搜</div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="输入关键词..."
            @input="filteredPotions = potions.filter(p => 
              !searchQuery || 
              p.name.includes(searchQuery) || 
              p.effect.includes(searchQuery)
            )"
          >
        </div>
      </div>
    </div>

    <div class="converter-card">
      <div class="card-header">
        <div class="header-icon">🎛️</div>
        <div class="header-text">
          <h3>药水改性配方</h3>
          <p>所有药水都适用的通用改性方法</p>
        </div>
      </div>
      
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
        <div class="card-header potion-header">
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

    <div class="tips-card">
      <div class="tips-header">
        <span class="tips-icon">💡</span>
        <span class="tips-title">酿造提示</span>
      </div>
      <div class="tips-list">
        <div class="tip-item">
          <span class="tip-num">1</span>
          <span class="tip-text">所有药水都可以加火药变成喷溅药水</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">2</span>
          <span class="tip-text">喷溅药水可以加龙息变成滞留药水</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">3</span>
          <span class="tip-text">有些药水无法同时增强 + 延长</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">4</span>
          <span class="tip-text">加入发酵蛛眼通常会反转药水效果</span>
        </div>
        <div class="tip-item">
          <span class="tip-num">5</span>
          <span class="tip-text">地狱疣 + 水瓶 = 绝大多数药水的基础</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.potion-brewing {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 640px) {
    padding: 30px 16px;
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
  padding: 24px 28px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-bottom: 4px solid var(--fur-border);

  .header-icon {
    font-size: 36px;
  }

  h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 800;
    color: var(--fur-text);
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
  }

  &.potion-header {
    padding: 16px 20px;
    background: transparent;
    border-bottom: 2px solid var(--fur-border);
  }
}

.input-grid {
  display: grid;
  gap: 20px;
  padding: 28px;

  &.cols-1 {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
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
    font-size: 20px;
    font-weight: 800;
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

.modifiers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  padding: 28px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.modifier-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--fur-bg-muted);
  border-radius: 16px;
  border: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-1px);
  }

  .mod-icon {
    font-size: 24px;
  }

  .mod-item {
    font-size: 15px;
    font-weight: 800;
    color: var(--fur-text);
    min-width: 70px;
  }

  .mod-effect {
    flex: 1;
    font-size: 13px;
    color: var(--fur-text-secondary);
  }
}

.potion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.potion-card {
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--fur-primary);
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2);
  }

  .potion-icon {
    font-size: 36px;
  }

  .potion-name {
    font-size: 17px;
    font-weight: 800;
    margin-bottom: 2px;
    color: var(--fur-text);
  }

  .potion-duration {
    font-size: 12px;
    color: var(--fur-primary);
    font-weight: 700;
  }
}

.potion-effect {
  padding: 16px 20px;
  font-size: 14px;
  color: var(--fur-text-secondary);
  margin: 0;
  border-bottom: 2px solid var(--fur-border);
  font-weight: 600;
}

.brewing-path {
  padding: 16px 20px;
  border-bottom: 2px solid var(--fur-border);
}

.path-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--fur-primary);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.path-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.path-item {
  padding: 6px 12px;
  background: var(--fur-bg-muted);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--fur-text);
}

.path-arrow {
  color: var(--fur-primary);
  font-weight: 900;
}

.potion-variants {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.variant {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;

  .variant-icon {
    font-size: 16px;
  }

  .variant-label {
    font-weight: 700;
    color: var(--fur-text-secondary);
    min-width: 75px;
  }

  .variant-value {
    font-weight: 800;
    color: var(--fur-primary);
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
    border-bottom: 2px solid var(--fur-border);
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
    font-weight: 600;
  }
}
</style>
