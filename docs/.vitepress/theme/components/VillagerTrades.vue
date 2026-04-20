<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedProfession = ref('all')
const simulatorMode = ref(false)

const simulatorProfession = ref('librarian')
const simulatorLevel = ref(1)
const emeralds = ref(64)
const refreshCount = ref(0)
const isRefreshing = ref(false)
const currentTrades = ref<Trade[]>([])
const history = ref<{ trade: Trade, count: number }[]>([])

const professions = [
  { id: 'all', name: '全部职业', icon: '👥' },
  { id: 'farmer', name: '农民', icon: '🌾' },
  { id: 'fisherman', name: '渔夫', icon: '🎣' },
  { id: 'fletcher', name: '制箭师', icon: '🏹' },
  { id: 'shepherd', name: '牧羊人', icon: '🐑' },
  { id: 'mason', name: '石匠', icon: '🧱' },
  { id: 'armorer', name: '盔甲匠', icon: '🛡️' },
  { id: 'weaponsmith', name: '武器匠', icon: '⚔️' },
  { id: 'toolsmith', name: '工具匠', icon: '🔧' },
  { id: 'butcher', name: '屠夫', icon: '🥩' },
  { id: 'leatherworker', name: '皮匠', icon: '🪓' },
  { id: 'cleric', name: '牧师', icon: '✨' },
  { id: 'cartographer', name: '制图师', icon: '🗺️' },
  { id: 'librarian', name: '图书管理员', icon: '📚' },
  { id: 'wandering', name: '流浪商人', icon: '🐪' }
]

interface Trade {
  profession: string
  level: number
  input: string
  inputCount: number
  output: string
  outputCount: number
  note?: string
  rarity?: 'common' | 'rare' | 'legendary'
}

const trades: Trade[] = [
  { profession: 'farmer', level: 1, input: '小麦', inputCount: 20, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'farmer', level: 1, input: '绿宝石', inputCount: 1, output: '面包', outputCount: 6, rarity: 'common' },
  { profession: 'farmer', level: 2, input: '马铃薯', inputCount: 26, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'farmer', level: 2, input: '绿宝石', inputCount: 1, output: '南瓜派', outputCount: 4, rarity: 'common' },
  { profession: 'farmer', level: 3, input: '胡萝卜', inputCount: 22, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'farmer', level: 4, input: '西瓜', inputCount: 7, output: '绿宝石', outputCount: 1, rarity: 'rare' },
  { profession: 'farmer', level: 5, input: '甜菜根', inputCount: 15, output: '绿宝石', outputCount: 1, rarity: 'rare' },
  { profession: 'fisherman', level: 1, input: '鱼', inputCount: 20, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'fisherman', level: 1, input: '绿宝石', inputCount: 1, output: '熟鳕鱼', outputCount: 6, rarity: 'common' },
  { profession: 'fletcher', level: 1, input: '木棍', inputCount: 32, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'fletcher', level: 1, input: '绿宝石', inputCount: 2, output: '箭', outputCount: 16, rarity: 'common' },
  { profession: 'fletcher', level: 5, input: '绿宝石', inputCount: 8, output: '附魔弓', outputCount: 1, note: '极品附魔！', rarity: 'legendary' },
  { profession: 'shepherd', level: 1, input: '羊毛', inputCount: 18, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'shepherd', level: 1, input: '绿宝石', inputCount: 1, output: '剪刀', outputCount: 1, rarity: 'common' },
  { profession: 'mason', level: 1, input: '圆石', inputCount: 20, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'mason', level: 1, input: '绿宝石', inputCount: 1, output: '红砖', outputCount: 10, rarity: 'common' },
  { profession: 'armorer', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'armorer', level: 1, input: '绿宝石', inputCount: 5, output: '铁护腿', outputCount: 1, rarity: 'common' },
  { profession: 'armorer', level: 5, input: '绿宝石', inputCount: 64, output: '钻石胸甲', outputCount: 1, rarity: 'legendary' },
  { profession: 'weaponsmith', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'weaponsmith', level: 1, input: '绿宝石', inputCount: 3, output: '铁斧', outputCount: 1, rarity: 'common' },
  { profession: 'weaponsmith', level: 5, input: '绿宝石', inputCount: 13, output: '附魔钻石剑', outputCount: 1, rarity: 'legendary' },
  { profession: 'toolsmith', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'toolsmith', level: 1, input: '绿宝石', inputCount: 4, output: '铁锹', outputCount: 1, rarity: 'common' },
  { profession: 'toolsmith', level: 5, input: '绿宝石', inputCount: 18, output: '附魔钻石镐', outputCount: 1, rarity: 'legendary' },
  { profession: 'butcher', level: 1, input: '生猪排', inputCount: 14, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'butcher', level: 1, input: '绿宝石', inputCount: 1, output: '熟猪排', outputCount: 5, rarity: 'common' },
  { profession: 'leatherworker', level: 1, input: '皮革', inputCount: 9, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'leatherworker', level: 1, input: '绿宝石', inputCount: 3, output: '皮裤', outputCount: 1, rarity: 'common' },
  { profession: 'cleric', level: 1, input: '腐肉', inputCount: 32, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'cleric', level: 1, input: '绿宝石', inputCount: 1, output: '红石', outputCount: 2, rarity: 'common' },
  { profession: 'cleric', level: 3, input: '金锭', inputCount: 3, output: '末影珍珠', outputCount: 1, rarity: 'rare' },
  { profession: 'cartographer', level: 1, input: '纸', inputCount: 24, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'cartographer', level: 2, input: '绿宝石', inputCount: 7, output: '海洋探险家地图', outputCount: 1, rarity: 'rare' },
  { profession: 'cartographer', level: 3, input: '绿宝石', inputCount: 14, output: '林地探险家地图', outputCount: 1, rarity: 'legendary' },
  { profession: 'librarian', level: 1, input: '纸', inputCount: 24, output: '绿宝石', outputCount: 1, rarity: 'common' },
  { profession: 'librarian', level: 1, input: '绿宝石', inputCount: 9, output: '书架', outputCount: 1, rarity: 'common' },
  { profession: 'librarian', level: 5, input: '绿宝石', inputCount: 5, output: '经验修补', outputCount: 1, note: '神级附魔！', rarity: 'legendary' },
  { profession: 'librarian', level: 2, input: '绿宝石', inputCount: 5, output: '指南针', outputCount: 1, rarity: 'common' },
  { profession: 'librarian', level: 3, input: '绿宝石', inputCount: 10, output: '时运III', outputCount: 1, note: '挖矿必备！', rarity: 'rare' },
  { profession: 'librarian', level: 4, input: '绿宝石', inputCount: 8, output: '无限', outputCount: 1, note: '弓箭神技！', rarity: 'rare' },
  { profession: 'wandering', level: 1, input: '绿宝石', inputCount: 1, output: '海泡菜', outputCount: 3, rarity: 'common' },
  { profession: 'wandering', level: 1, input: '绿宝石', inputCount: 5, output: '珊瑚扇', outputCount: 1, rarity: 'common' }
]

function generateTrades() {
  isRefreshing.value = true
  const cost = Math.min(simulatorLevel.value, 3)
  
  if (emeralds.value < cost) {
    isRefreshing.value = false
    return
  }
  
  emeralds.value -= cost
  refreshCount.value++
  
  setTimeout(() => {
    const availableTrades = trades.filter(t => 
      t.profession === simulatorProfession.value && t.level <= simulatorLevel.value
    )
    
    const shuffled = [...availableTrades].sort(() => Math.random() - 0.5)
    const tradeCount = Math.min(2 + simulatorLevel.value, shuffled.length)
    currentTrades.value = shuffled.slice(0, tradeCount)
    
    currentTrades.value.forEach(trade => {
      const existing = history.value.find(h => 
        h.trade.profession === trade.profession && 
        h.trade.output === trade.output
      )
      if (existing) {
        existing.count++
      } else {
        history.value.push({ trade, count: 1 })
      }
    })
    
    isRefreshing.value = false
  }, 600)
}

function resetSimulator() {
  emeralds.value = 64
  refreshCount.value = 0
  currentTrades.value = []
  history.value = []
}

function getRarityStyle(rarity?: string) {
  const styles: Record<string, any> = {
    common: { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.15)', text: '普通' },
    rare: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)', text: '稀有' },
    legendary: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.25)', text: '传说' }
  }
  return styles[rarity || 'common'] || styles.common
}

const refreshCost = computed(() => Math.min(simulatorLevel.value, 3))

const legendaryCount = computed(() => 
  history.value.filter(h => h.trade.rarity === 'legendary').reduce((a, b) => a + b.count, 0)
)

const filteredTrades = computed(() => 
  trades.filter(t => 
    selectedProfession.value === 'all' || t.profession === selectedProfession.value
  )
)
</script>

<template>
  <div class="villager-trades">
    <div class="component-header">
      <span class="header-icon">🤝</span>
      <span class="header-text">村民交易指南</span>
    </div>

    <div class="component-content">
      <div class="profession-tabs">
        <button
          v-for="p in professions"
          :key="p.id"
          class="profession-tab"
          :class="{ active: selectedProfession === p.id }"
          @click="selectedProfession = p.id"
        >
          <span class="tab-icon">{{ p.icon }}</span>
          <span class="tab-text">{{ p.name }}</span>
        </button>
      </div>

      <div class="trades-table-container">
        <table class="trades-table">
          <thead>
            <tr>
              <th>💼 职业</th>
              <th>⭐ 等级</th>
              <th>📥 输入</th>
              <th>📤 输出</th>
              <th>💡 备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, i) in filteredTrades" :key="i">
              <td>
                <span class="prof-icon">{{ professions.find(p => p.id === trade.profession)?.icon }}</span>
                {{ professions.find(p => p.id === trade.profession)?.name }}
              </td>
              <td><span class="level-badge">Lv.{{ trade.level }}</span></td>
              <td>
                <span class="item-count">{{ trade.inputCount }}×</span>
                {{ trade.input }}
              </td>
              <td>
                <span class="item-count output">{{ trade.outputCount }}×</span>
                {{ trade.output }}
              </td>
              <td><span class="trade-note">{{ trade.note }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mode-tabs">
        <button 
          class="mode-tab" 
          :class="{ active: !simulatorMode }"
          @click="simulatorMode = false"
        >
          📖 交易指南
        </button>
        <button 
          class="mode-tab" 
          :class="{ active: simulatorMode }"
          @click="simulatorMode = true"
        >
          🎮 交易模拟器
        </button>
      </div>

      <div v-if="simulatorMode" class="simulator-section">
        <div class="simulator-stats">
          <div class="stat-card">
            <div class="stat-icon">💎</div>
            <div class="stat-value">{{ emeralds }}</div>
            <div class="stat-label">绿宝石</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔄</div>
            <div class="stat-value">{{ refreshCount }}</div>
            <div class="stat-label">刷新次数</div>
          </div>
          <div class="stat-card highlight">
            <div class="stat-icon">⭐</div>
            <div class="stat-value">{{ legendaryCount }}</div>
            <div class="stat-label">传说获取</div>
          </div>
        </div>

        <div class="simulator-controls">
          <div class="control-group">
            <label class="control-label">👷 选择职业</label>
            <select v-model="simulatorProfession" class="simulator-select">
              <option v-for="p in professions.filter(p => p.id !== 'all')" :key="p.id" :value="p.id">
                {{ p.icon }} {{ p.name }}
              </option>
            </select>
          </div>

          <div class="control-group">
            <label class="control-label">⭐ 村民等级</label>
            <div class="level-slider">
              <input 
                v-model="simulatorLevel" 
                type="range" 
                min="1" 
                max="5" 
                step="1"
              >
              <span class="level-value">Lv.{{ simulatorLevel }}</span>
            </div>
          </div>
        </div>

        <div class="simulator-actions">
          <button 
            class="refresh-btn" 
            @click="generateTrades"
            :disabled="isRefreshing || emeralds < refreshCost"
          >
            <span v-if="isRefreshing" class="spinner">🌀</span>
            <span v-else>🔄</span>
            {{ isRefreshing ? '刷新中...' : `刷新交易 (${refreshCost}💎)` }}
          </button>
          <button class="reset-btn" @click="resetSimulator">
            🔃 重置
          </button>
        </div>

        <div v-if="currentTrades.length" class="trades-result">
          <h4 class="result-title">🎁 当前交易选项</h4>
          <div class="trades-grid">
            <div 
              v-for="(trade, i) in currentTrades" 
              :key="i" 
              class="trade-card-sim"
              :style="{ '--rarity-color': getRarityStyle(trade.rarity).color, '--rarity-bg': getRarityStyle(trade.rarity).bg }"
            >
              <div class="trade-rarity" :style="{ background: getRarityStyle(trade.rarity).bg, color: getRarityStyle(trade.rarity).color }">
                {{ getRarityStyle(trade.rarity).text }}
              </div>
              <div class="trade-content">
                <div class="trade-input">
                  <span class="trade-count">{{ trade.inputCount }}×</span>
                  {{ trade.input }}
                </div>
                <div class="trade-arrow">➡️</div>
                <div class="trade-output">
                  <span class="trade-count">{{ trade.outputCount }}×</span>
                  {{ trade.output }}
                </div>
              </div>
              <div v-if="trade.note" class="trade-note-sim">
                💡 {{ trade.note }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="history.length" class="history-section">
          <h4 class="result-title">📊 刷新历史</h4>
          <div class="history-list">
            <div 
              v-for="(item, i) in history.slice().reverse().slice(0, 10)" 
              :key="i" 
              class="history-item"
            >
              <span class="history-count">×{{ item.count }}</span>
              <span class="history-output">{{ item.trade.output }}</span>
              <span 
                class="history-rarity"
                :style="{ background: getRarityStyle(item.trade.rarity).bg, color: getRarityStyle(item.trade.rarity).color }"
              >
                {{ getRarityStyle(item.trade.rarity).text }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="trades-table-container">
        <table class="trades-table">
          <thead>
            <tr>
              <th>💼 职业</th>
              <th>⭐ 等级</th>
              <th>📥 输入</th>
              <th>📤 输出</th>
              <th>💡 备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, i) in filteredTrades" :key="i">
              <td>
                <span class="prof-icon">{{ professions.find(p => p.id === trade.profession)?.icon }}</span>
                {{ professions.find(p => p.id === trade.profession)?.name }}
              </td>
              <td><span class="level-badge">Lv.{{ trade.level }}</span></td>
              <td>
                <span class="item-count">{{ trade.inputCount }}×</span>
                {{ trade.input }}
              </td>
              <td>
                <span class="item-count output">{{ trade.outputCount }}×</span>
                {{ trade.output }}
              </td>
              <td><span class="trade-note">{{ trade.note }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <AccordionPanel title="💡 刷交易技巧" icon="⭐">
        <ul class="tips-list">
          <li>🎯 <strong>图书管理员</strong> - 刷出经验修补是终极目标！</li>
          <li>🏹 <strong>制箭师</strong> - 新手必刷！16根箭仅需2绿宝石</li>
          <li>⛏️ <strong>工具匠</strong> - 满级必出附魔钻石镐</li>
          <li>⚔️ <strong>武器匠</strong> - 满级出极品钻石剑</li>
          <li>💧 <strong>牧师</strong> - 用腐肉稳定换绿宝石 + 末影珍珠</li>
          <li>🚫 工作站放好，村民旁边放床就会自动绑定职业！</li>
        </ul>
      </AccordionPanel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.villager-trades {
  max-width: 1000px;
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

.profession-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  justify-content: center;
}

.profession-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  color: var(--fur-text-secondary);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  .tab-icon {
    font-size: 20px;
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
    transform: translateY(-1px);
  }
}

.trades-table-container {
  overflow-x: auto;
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  margin-bottom: 24px;
}

.trades-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--fur-bg-card);

  th, td {
    padding: 18px 20px;
    text-align: left;
    border-bottom: 2px solid var(--fur-border);
    font-size: 15px;
    font-weight: 600;
  }

  th {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    font-weight: 800;
    color: var(--fur-primary);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  tr {
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08));
    }

    &:last-child td {
      border-bottom: none;
    }
  }
}

.prof-icon {
  margin-right: 8px;
  font-size: 20px;
}

.level-badge {
  padding: 6px 12px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.item-count {
  padding: 6px 12px;
  background: var(--fur-bg-muted);
  border-radius: 10px;
  margin-right: 10px;
  font-weight: 800;
  font-size: 14px;
  border: 2px solid var(--fur-border);

  &.output {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.3);
  }
}

.trade-note {
  font-size: 14px;
  color: var(--fur-primary);
  font-weight: 800;
  padding: 6px 12px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(139, 92, 246, 0.2);
}

.mode-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
  justify-content: center;
}

.mode-tab {
  padding: 14px 28px;
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  color: var(--fur-text-secondary);
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-color: transparent;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
  }

  &:hover:not(.active) {
    border-color: var(--fur-primary);
  }
}

.simulator-section {
  margin-bottom: 28px;
}

.simulator-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  padding: 20px;
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  background: var(--fur-bg-card);
  text-align: center;
  transition: all 0.3s ease;

  &.highlight {
    border-color: #f59e0b;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
    box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
  }

  &:hover {
    transform: translateY(-2px);
  }
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  color: var(--fur-primary);
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--fur-text-secondary);
  font-weight: 700;
  margin-top: 4px;
}

.simulator-controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control-label {
  font-size: 15px;
  font-weight: 800;
  color: var(--fur-primary);
}

.simulator-select {
  padding: 16px 20px;
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  color: var(--fur-text);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--fur-primary);
  }
}

.level-slider {
  display: flex;
  align-items: center;
  gap: 16px;

  input[type="range"] {
    flex: 1;
    height: 8px;
    border-radius: 4px;
    background: var(--fur-border);
    cursor: pointer;
  }
}

.level-value {
  padding: 10px 16px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border-radius: 12px;
  font-weight: 800;
  font-size: 15px;
  min-width: 70px;
  text-align: center;
}

.simulator-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

.refresh-btn {
  flex: 1;
  padding: 18px 28px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.spinner {
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.reset-btn {
  padding: 18px 28px;
  border: 4px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  color: var(--fur-text);
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
}

.result-title {
  font-size: 18px;
  font-weight: 900;
  color: var(--fur-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.trades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.trade-card-sim {
  padding: 20px;
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;
  border-left-color: var(--rarity-color);
  border-left-width: 6px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.trade-rarity {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 14px;
}

.trade-content {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.trade-input,
.trade-output {
  flex: 1;
  font-weight: 700;
  font-size: 15px;
}

.trade-count {
  padding: 4px 10px;
  background: var(--fur-bg-muted);
  border-radius: 8px;
  margin-right: 8px;
  font-weight: 800;
  font-size: 13px;
}

.trade-arrow {
  font-size: 18px;
  color: var(--fur-primary);
}

.trade-note-sim {
  padding: 10px 14px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1));
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--fur-primary);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border: 3px solid var(--fur-border);
  border-radius: 14px;
  background: var(--fur-bg-card);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--fur-primary);
  }
}

.history-count {
  padding: 6px 12px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border-radius: 10px;
  font-weight: 800;
  font-size: 13px;
  min-width: 45px;
  text-align: center;
}

.history-output {
  flex: 1;
  font-weight: 700;
  font-size: 15px;
}

.history-rarity {
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
}

.tips-list {
  margin: 0;
  padding-left: 24px;
  list-style: none;

  li {
    padding: 12px 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.7;

    &:not(:last-child) {
      border-bottom: 2px solid var(--fur-border);
    }
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

  .profession-tab {
    padding: 10px 14px;
    font-size: 13px;

    .tab-icon {
      font-size: 18px;
    }
  }

  .trades-table {
    th, td {
      padding: 12px 14px;
      font-size: 13px;
    }

    th {
      font-size: 12px;
    }
  }

  .prof-icon {
    font-size: 18px;
  }

  .level-badge,
  .item-count,
  .trade-note {
    padding: 4px 8px;
    font-size: 12px;
  }

  .mode-tab {
    padding: 12px 20px;
    font-size: 14px;
  }

  .simulator-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-icon {
    font-size: 28px;
  }

  .stat-value {
    font-size: 28px;
  }

  .simulator-controls {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .simulator-actions {
    flex-direction: column;
  }

  .trades-grid {
    grid-template-columns: 1fr;
  }

  .history-item {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
