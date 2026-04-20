<script setup lang="ts">
import { ref } from 'vue'

const selectedProfession = ref('all')

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
}

const trades: Trade[] = [
  { profession: 'farmer', level: 1, input: '小麦', inputCount: 20, output: '绿宝石', outputCount: 1 },
  { profession: 'farmer', level: 1, input: '绿宝石', inputCount: 1, output: '面包', outputCount: 6 },
  { profession: 'farmer', level: 2, input: '马铃薯', inputCount: 26, output: '绿宝石', outputCount: 1 },
  { profession: 'farmer', level: 2, input: '绿宝石', inputCount: 1, output: '南瓜派', outputCount: 4 },
  { profession: 'farmer', level: 3, input: '胡萝卜', inputCount: 22, output: '绿宝石', outputCount: 1 },
  { profession: 'farmer', level: 4, input: '西瓜', inputCount: 7, output: '绿宝石', outputCount: 1 },
  { profession: 'farmer', level: 5, input: '甜菜根', inputCount: 15, output: '绿宝石', outputCount: 1 },
  { profession: 'fisherman', level: 1, input: '鱼', inputCount: 20, output: '绿宝石', outputCount: 1 },
  { profession: 'fisherman', level: 1, input: '绿宝石', inputCount: 1, output: '熟鳕鱼', outputCount: 6 },
  { profession: 'fletcher', level: 1, input: '木棍', inputCount: 32, output: '绿宝石', outputCount: 1 },
  { profession: 'fletcher', level: 1, input: '绿宝石', inputCount: 2, output: '箭', outputCount: 16 },
  { profession: 'fletcher', level: 5, input: '绿宝石', inputCount: 8, output: '附魔弓', outputCount: 1, note: '极品附魔！' },
  { profession: 'shepherd', level: 1, input: '羊毛', inputCount: 18, output: '绿宝石', outputCount: 1 },
  { profession: 'shepherd', level: 1, input: '绿宝石', inputCount: 1, output: '剪刀', outputCount: 1 },
  { profession: 'mason', level: 1, input: '圆石', inputCount: 20, output: '绿宝石', outputCount: 1 },
  { profession: 'mason', level: 1, input: '绿宝石', inputCount: 1, output: '红砖', outputCount: 10 },
  { profession: 'armorer', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1 },
  { profession: 'armorer', level: 1, input: '绿宝石', inputCount: 5, output: '铁护腿', outputCount: 1 },
  { profession: 'armorer', level: 5, input: '绿宝石', inputCount: 64, output: '钻石胸甲', outputCount: 1 },
  { profession: 'weaponsmith', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1 },
  { profession: 'weaponsmith', level: 1, input: '绿宝石', inputCount: 3, output: '铁斧', outputCount: 1 },
  { profession: 'weaponsmith', level: 5, input: '绿宝石', inputCount: 13, output: '附魔钻石剑', outputCount: 1 },
  { profession: 'toolsmith', level: 1, input: '煤', inputCount: 15, output: '绿宝石', outputCount: 1 },
  { profession: 'toolsmith', level: 1, input: '绿宝石', inputCount: 4, output: '铁锹', outputCount: 1 },
  { profession: 'toolsmith', level: 5, input: '绿宝石', inputCount: 18, output: '附魔钻石镐', outputCount: 1 },
  { profession: 'butcher', level: 1, input: '生猪排', inputCount: 14, output: '绿宝石', outputCount: 1 },
  { profession: 'butcher', level: 1, input: '绿宝石', inputCount: 1, output: '熟猪排', outputCount: 5 },
  { profession: 'leatherworker', level: 1, input: '皮革', inputCount: 9, output: '绿宝石', outputCount: 1 },
  { profession: 'leatherworker', level: 1, input: '绿宝石', inputCount: 3, output: '皮裤', outputCount: 1 },
  { profession: 'cleric', level: 1, input: '腐肉', inputCount: 32, output: '绿宝石', outputCount: 1 },
  { profession: 'cleric', level: 1, input: '绿宝石', inputCount: 1, output: '红石', outputCount: 2 },
  { profession: 'cleric', level: 3, input: '金锭', inputCount: 3, output: '末影珍珠', outputCount: 1 },
  { profession: 'cartographer', level: 1, input: '纸', inputCount: 24, output: '绿宝石', outputCount: 1 },
  { profession: 'cartographer', level: 2, input: '绿宝石', inputCount: 7, output: '海洋探险家地图', outputCount: 1 },
  { profession: 'cartographer', level: 3, input: '绿宝石', inputCount: 14, output: '林地探险家地图', outputCount: 1 },
  { profession: 'librarian', level: 1, input: '纸', inputCount: 24, output: '绿宝石', outputCount: 1 },
  { profession: 'librarian', level: 1, input: '绿宝石', inputCount: 9, output: '书架', outputCount: 1 },
  { profession: 'librarian', level: 5, input: '绿宝石', inputCount: 5, output: '附魔书', outputCount: 1, note: '刷经验修补必备！' },
  { profession: 'librarian', level: 2, input: '绿宝石', inputCount: 5, output: '指南针', outputCount: 1 },
  { profession: 'wandering', level: 1, input: '绿宝石', inputCount: 1, output: '海泡菜', outputCount: 3 },
  { profession: 'wandering', level: 1, input: '绿宝石', inputCount: 5, output: '珊瑚扇', outputCount: 1 }
]

const filteredTrades = trades.filter(t => 
  selectedProfession.value === 'all' || t.profession === selectedProfession.value
)
</script>

<template>
  <div class="villager-trades">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🧑‍🌾</span>
        村民交易表
      </h2>
      <p class="guide-subtitle">全职业完整交易对照表</p>
    </div>

    <div class="profession-tabs">
      <button
        v-for="p in professions"
        :key="p.id"
        class="profession-tab"
        :class="{ active: selectedProfession === p.id }"
        @click="selectedProfession = p.id"
      >
        <span>{{ p.icon }}</span>
        <span class="tab-text">{{ p.name }}</span>
      </button>
    </div>

    <div class="trades-table-container">
      <table class="trades-table">
        <thead>
          <tr>
            <th>职业</th>
            <th>等级</th>
            <th>输入</th>
            <th>输出</th>
            <th>备注</th>
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
</template>

<style scoped lang="scss">
.villager-trades {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
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

.profession-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
}

.profession-tab {
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

.trades-table-container {
  overflow-x: auto;
}

.trades-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--fur-bg-card);
  border-radius: 12px;
  overflow: hidden;

  th, td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid var(--fur-border-light);
    font-size: 14px;
  }

  th {
    background: var(--fur-bg-muted);
    font-weight: 600;
    color: var(--fur-text-secondary);
  }

  tr:hover {
    background: rgba(139, 92, 246, 0.05);
  }
}

.prof-icon {
  margin-right: 6px;
}

.level-badge {
  padding: 3px 8px;
  background: var(--fur-primary);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
}

.item-count {
  padding: 2px 6px;
  background: var(--fur-bg-muted);
  border-radius: 4px;
  margin-right: 6px;
  font-weight: 600;

  &.output {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
  }
}

.trade-note {
  font-size: 12px;
  color: var(--fur-primary);
  font-weight: 600;
}

.tips-list {
  margin: 0;
  padding-left: 20px;

  li {
    padding: 6px 0;
    font-size: 14px;
  }
}
</style>
