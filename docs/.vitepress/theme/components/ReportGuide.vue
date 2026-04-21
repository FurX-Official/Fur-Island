<script setup lang="ts">
import { ref } from 'vue'

const reportTypes = ref([
  { id: 'grief', title: '破坏/偷窃', icon: '💥', desc: '建筑被破坏、物品被盗', color: '#ef4444' },
  { id: 'cheat', title: '作弊/外挂', icon: '🚫', desc: '使用外挂、飞行、透视等', color: '#f59e0b' },
  { id: 'chat', title: '聊天违规', icon: '💬', desc: '骂人、广告、刷屏', color: '#8b5cf6' },
  { id: 'pvp', title: '恶意PVP', icon: '⚔️', desc: '非公平对战、追杀新手', color: '#3b82f6' },
  { id: 'other', title: '其他违规', icon: '📋', desc: '其他违反规则的行为', color: '#6b7280' }
])

const quickCommands = ref([
  { cmd: '/report', desc: '打开举报GUI界面', icon: '🖱️' },
  { cmd: '/report list', desc: '查看你提交的举报', icon: '📋' },
  { cmd: '/report reload', desc: '管理员重载配置', icon: '🔄' },
  { cmd: '/reports', desc: '管理所有举报（管理）', icon: '⚙️' }
])

const steps = ref([
  { title: '打开举报菜单', cmd: '/report' },
  { title: '选择举报类型', cmd: '点击对应类别' },
  { title: '选择在线玩家（可选）', cmd: '点击玩家头颅' },
  { title: '输入详细描述', cmd: '在聊天框输入' },
  { title: '确认提交', cmd: '点击确认按钮' }
])
</script>

<template>
  <div class="report-guide">
    <div class="component-header">
      <span class="header-icon">📢</span>
      <span class="header-text">举报系统使用教程</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">UltimateReports 插件 · 快速举报违规行为，维护良好游戏环境</p>

      <div class="quick-cards">
        <h3 class="section-title">⚡ 快捷指令</h3>
        <div class="commands-grid">
          <div
            v-for="(item, index) in quickCommands"
            :key="index"
            class="command-card"
          >
            <span class="cmd-icon">{{ item.icon }}</span>
            <span class="cmd-text">{{ item.cmd }}</span>
            <span class="cmd-desc">{{ item.desc }}</span>
          </div>
        </div>
      </div>

      <div class="steps-section">
        <h3 class="section-title">📝 完整举报流程</h3>
        
        <div class="steps-timeline">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="timeline-item"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <CodeBlock :code="step.cmd" v-if="step.cmd.startsWith('/')" />
              <p class="step-action" v-else>{{ step.cmd }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="types-section">
        <h3 class="section-title">🎯 举报类型说明</h3>
        <div class="types-grid">
          <div
            v-for="type in reportTypes"
            :key="type.id"
            class="type-card"
            :style="{ '--type-color': type.color }"
          >
            <div class="type-icon">{{ type.icon }}</div>
            <h4 class="type-title">{{ type.title }}</h4>
            <p class="type-desc">{{ type.desc }}</p>
          </div>
        </div>
      </div>

      <div class="tips-section">
        <h3 class="section-title">💡 有效举报技巧</h3>
        
        <div class="tips-grid">
          <div class="tip-card good">
            <span class="tip-icon">✅</span>
            <h5>推荐这样做</h5>
            <ul>
              <li>填写<strong>详细</strong>的违规描述</li>
              <li>记录下违规发生的<strong>时间和地点</strong></li>
              <li>截取<strong>截图</strong>作为证据（可发群里）</li>
              <li>提供违规玩家的<strong>完整ID</strong></li>
              <li>一次举报只举报<strong>一个</strong>玩家</li>
            </ul>
          </div>

          <div class="tip-card bad">
            <span class="tip-icon">❌</span>
            <h5>请不要这样</h5>
            <ul>
              <li>不要<strong>恶意举报</strong>或虚假举报</li>
              <li>不要重复提交<strong>相同内容</strong>的举报</li>
              <li>不要举报<strong>鸡毛蒜皮</strong>的小事</li>
              <li>不要在举报里<strong>骂人</strong>或发泄情绪</li>
              <li>不要用举报系统<strong>聊天</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="note-card">
        <div class="note-icon">ℹ️</div>
        <div class="note-content">
          <h4>重要说明</h4>
          <ul>
            <li>所有举报都会<strong>匿名</strong>处理，请放心提交</li>
            <li>管理员会在<strong>24小时内</strong>处理你的举报</li>
            <li>处理结果会通过<strong>游戏内邮件</strong>通知你</li>
            <li>恶意举报人将受到<strong>严厉处罚</strong></li>
          </ul>
        </div>
      </div>

      <div class="emergency-section">
        <h3 class="section-title">🚨 紧急情况</h3>
        <div class="emergency-card">
          <p>如果遇到正在发生的严重违规（如正在拆家）</p>
          <p class="highlight">请直接在 QQ 群 @管理员 进行快速处理！</p>
          <a href="https://qm.qq.com/q/RLnf8Z7vmq" target="_blank" class="qq-btn">
            💬 立即加入 QQ 群
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-guide {
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
  background: linear-gradient(135deg, #ef4444, #f59e0b);
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

.guide-subtitle {
  font-size: 15px;
  color: var(--fur-text-secondary);
  margin: 0 0 32px 0;
  text-align: center;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--fur-primary);
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quick-cards {
  margin-bottom: 36px;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.command-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;
  gap: 8px;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.cmd-icon {
  font-size: 28px;
}

.cmd-text {
  font-weight: 800;
  font-size: 15px;
  color: var(--fur-primary);
  padding: 8px 14px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.cmd-desc {
  font-size: 13px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.steps-section {
  margin-bottom: 36px;
}

.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
}

.step-content {
  flex: 1;
  padding: 18px 22px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);

  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 800;
  }
}

.code-block {
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 12px;
  border: 2px solid rgba(139, 92, 246, 0.2);

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    font-size: 14px;
  }
}

.types-section {
  margin-bottom: 36px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 16px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;
  border-top: 4px solid var(--type-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.type-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.type-title {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 800;
  color: var(--type-color);
}

.type-desc {
  margin: 0;
  font-size: 13px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.tips-section {
  margin-bottom: 36px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.tip-card {
  padding: 24px;
  border-radius: 20px;
  border: 3px solid var(--fur-border);

  &.good {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
    border-color: rgba(16, 185, 129, 0.3);
  }

  &.bad {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
    border-color: rgba(239, 68, 68, 0.3);
  }

  h5 {
    margin: 0 0 16px 0;
    font-size: 17px;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
  }
}

.tip-icon {
  font-size: 22px;
}

.note-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  margin-bottom: 36px;

  h4 {
    margin: 0 0 12px 0;
    font-size: 17px;
    font-weight: 900;
    color: #3b82f6;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
  }
}

.note-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.emergency-section {
  margin-bottom: 16px;
}

.emergency-card {
  text-align: center;
  padding: 28px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1));
  border: 4px solid rgba(239, 68, 68, 0.4);
  border-radius: 20px;

  p {
    margin: 0 0 12px 0;
    font-size: 15px;
    font-weight: 600;
  }

  .highlight {
    font-size: 18px;
    font-weight: 900;
    color: #ef4444;
    margin-bottom: 20px;
  }
}

.qq-btn {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #12b7f5, #0099ff);
  color: white;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(18, 183, 245, 0.4);
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

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .types-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .note-card {
    flex-direction: column;
    text-align: center;
  }

  .commands-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .types-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
