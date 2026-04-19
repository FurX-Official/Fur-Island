<script setup lang="ts">
import { ref } from 'vue'

const ruleCategories = ref([
  {
    icon: '🏠',
    title: '家园保护',
    color: '#f59e0b',
    rules: [
      '禁止任何形式的恶意破坏、偷窃他人财物',
      '禁止恶意利用漏洞破坏他人建筑或红石装置',
      '保护区域外建筑请自行做好防熊措施',
      '未经允许禁止进入他人私人领地'
    ]
  },
  {
    icon: '💬',
    title: '聊天规范',
    color: '#8b5cf6',
    rules: [
      '禁止刷屏、广告、恶意引战及人身攻击',
      '禁止发布色情、暴力、政治敏感内容',
      '友善交流，请勿使用不文明用语',
      '禁止泄露他人隐私信息'
    ]
  },
  {
    icon: '⚔️',
    title: 'PVP 与互动',
    color: '#f59e0b',
    rules: [
      '服务器允许自由 PVP，请自行承担风险',
      '禁止用陷阱、机关等方式恶意坑杀萌新',
      '玩家间交易请自行承担风险与责任',
      '恶意围堵、囚禁其他玩家是不被允许的'
    ]
  },
  {
    icon: '⚡',
    title: '生电说明',
    color: '#8b5cf6',
    rules: [
      '服务器允许生电、红石机械相关建造',
      '请勿建造过度卡顿的高频红石装置',
      '刷怪塔、物品分类等生电装置均可使用',
      '大型生电机组建议建在远离主区域位置'
    ]
  },
  {
    icon: '⛏️',
    title: '游戏公平',
    color: '#10b981',
    rules: [
      '允许使用不影响平衡的辅助模组（如小地图）',
      '禁止恶意利用服务器 Bug 复制物品等',
      '禁止飞行、穿墙、杀戮光环等作弊功能',
      '禁止高速连点器、自动攻击等破坏PVP平衡的辅助'
    ]
  },
  {
    icon: '🌐',
    title: '公共区域',
    color: '#3b82f6',
    rules: [
      '主城、出生点附近禁止建造不雅建筑',
      '公共资源区请合理采集，请勿垄断',
      '不要在主要交通要道旁建造遮挡建筑',
      '请保持公共区域整洁，勿乱扔垃圾'
    ]
  },
  {
    icon: '❤️',
    title: '社区氛围',
    color: '#ec4899',
    rules: [
      '欢迎新玩家，乐于助人是美德',
      '遇到问题请友好沟通，或联系管理员',
      '禁止宣传其他服务器及外部广告',
      '共同营造温馨和谐的社区环境'
    ]
  }
])
</script>

<template>
  <div class="rules-section">
    <div class="rules-header">
      <h2 class="rules-title">
        <span class="title-icon">📜</span>
        服务器规则
      </h2>
      <p class="rules-subtitle">共建温馨和谐的游戏环境，从遵守规则开始 💛</p>
    </div>

    <div class="rules-grid">
      <div
        v-for="(category, index) in ruleCategories"
        :key="index"
        class="rule-card"
      >
        <div class="card-header" :style="{ '--card-color': category.color }">
          <span class="category-icon">{{ category.icon }}</span>
          <h3 class="category-title">{{ category.title }}</h3>
        </div>

        <ul class="rule-list">
          <li v-for="(rule, idx) in category.rules" :key="idx" class="rule-item">
            <span class="rule-bullet"></span>
            <span class="rule-text">{{ rule }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="rules-footer">
      <div class="notice-card">
        <span class="notice-icon">⚠️</span>
        <div class="notice-content">
          <h4>温馨提示</h4>
          <p>违反规则将根据情节严重程度给予警告、临时封禁乃至永久封禁。<br>如果对处罚有异议，请联系管理员申诉。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rules-section {
  padding: 32px 0;
}

.rules-header {
  text-align: center;
  margin-bottom: 48px;

  .rules-title {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 12px 0;
    background: var(--fur-gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    .title-icon {
      font-size: 36px;
    }
  }

  .rules-subtitle {
    font-size: 15px;
    color: var(--fur-text-secondary);
    margin: 0;
  }
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.rule-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 18px;
  overflow: hidden;
  transition: all var(--fur-transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--fur-shadow-large);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  background: linear-gradient(
    90deg,
    var(--card-color) 0%,
    var(--card-color) 4px,
    rgba(var(--card-color), 0.1) 4px,
    transparent 100%
  );
  border-bottom: 1px solid var(--fur-border);

  .category-icon {
    font-size: 26px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .category-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--fur-text);
  }

  :deep(.dark) & .category-icon {
    background: rgba(0, 0, 0, 0.3);
  }
}

.rule-list {
  padding: 20px 22px;
  margin: 0;
  list-style: none;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--fur-border-light);
  }

  .rule-bullet {
    width: 6px;
    height: 6px;
    margin-top: 8px;
    background: var(--fur-primary);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .rule-text {
    font-size: 14px;
    color: var(--fur-text-secondary);
    line-height: 1.6;
  }
}

.rules-footer {
  .notice-card {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 28px;
    background: linear-gradient(
      135deg,
      rgba(251, 191, 36, 0.1) 0%,
      rgba(251, 146, 60, 0.05) 100%
    );
    border: 1px solid rgba(251, 191, 36, 0.2);
    border-radius: 16px;

    .notice-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    .notice-content {
      h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 700;
        color: #f59e0b;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: var(--fur-text-secondary);
        line-height: 1.7;
      }
    }
  }
}

@media (max-width: 640px) {
  .rules-grid {
    grid-template-columns: 1fr;
  }

  .rules-header {
    .rules-title {
      font-size: 26px;
    }
  }

  .notice-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
