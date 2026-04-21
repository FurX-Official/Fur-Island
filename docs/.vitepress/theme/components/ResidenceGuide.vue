<script setup lang="ts">
import { ref } from 'vue'

const quickCommands = ref([
  { cmd: '/res select [大小]', desc: '以你为中心选择领地范围', icon: '🎯' },
  { cmd: '/res create [名称]', desc: '创建领地', icon: '✨' },
  { cmd: '/res remove [名称]', desc: '删除领地', icon: '🗑️' },
  { cmd: '/res expand [格数]', desc: '向视线方向扩大领地', icon: '📐' },
  { cmd: '/res contract [格数]', desc: '缩小领地', icon: '📏' },
  { cmd: '/res tp [名称]', desc: '传送到领地', icon: '🚀' }
])

const flagPermissions = ref([
  { flag: 'build', title: '建造', desc: '放置/破坏方块', true: '允许', false: '禁止' },
  { flag: 'destroy', title: '破坏', desc: '破坏方块', true: '允许', false: '禁止' },
  { flag: 'place', title: '放置', desc: '放置方块', true: '允许', false: '禁止' },
  { flag: 'pvp', title: 'PVP', desc: '玩家对战', true: '开启', false: '关闭' },
  { flag: 'container', title: '容器', desc: '箱子/桶等', true: '可打开', false: '锁定' },
  { flag: 'use', title: '使用', desc: '按钮/门/开关', true: '可使用', false: '禁用' },
  { flag: 'move', title: '移动', desc: '进入领地', true: '允许', false: '禁止' },
  { flag: 'tp', title: '传送', desc: '传送到此领地', true: '允许', false: '禁止' }
])

const tabs = ref(['选择领地', '玩家权限', '常用指令'])
const activeTab = ref(0)
</script>

<template>
  <div class="residence-guide">
    <div class="component-header">
      <span class="header-icon">🏠</span>
      <span class="header-text">Residence 领地教程</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">保护你的建筑，设置权限，安心建造</p>

      <div class="quick-cards">
        <h3 class="section-title">⚡ 快速入门指令</h3>
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
        <h3 class="section-title">📝 创建领地完整步骤</h3>

        <div class="step-big">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>选择领地范围</h4>
            <div class="step-cards">
              <div class="method-card">
                <h5>方式一：快捷选择</h5>
                <CodeBlock code="/res select 20" />
                <p>以你为中心，选择 20x20x20 的立方体区域</p>
                <p class="tip">💡 推荐新手使用此方式</p>
              </div>
              <div class="method-card">
                <h5>方式二：锄头选择</h5>
                <p>手持 <strong>木棍</strong> 左键选择第一个点</p>
                <p>右键选择第二个点</p>
                <p class="tip">// 两点围成的矩形就是你的领地范围</p>
              </div>
            </div>
          </div>
        </div>

        <div class="step-big">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>确认并创建</h4>
            <p>选择后会显示选择的区域大小，输入命令创建：</p>
            <CodeBlock code="/res create 我的家" :large="true" />
            <p class="success-text">✅ 创建成功！领地已受保护！</p>
          </div>
        </div>

        <div class="step-big">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>调整大小（可选）</h4>
            <p>面向要扩大的方向，输入：</p>
            <CodeBlock code="/res expand 10" :large="true" />
            <p>领地向你面向的方向扩大 10 格</p>
            <p class="tip">💡 也可以使用 <code>/res contract 5</code> 缩小领地</p>
          </div>
        </div>
      </div>

      <div class="flags-section">
        <h3 class="section-title">🔐 权限标志说明</h3>
        <div class="flags-grid">
          <div
            v-for="(flag, index) in flagPermissions"
            :key="index"
            class="flag-card"
          >
            <h5 class="flag-title">{{ flag.title }}</h5>
            <span class="flag-name">{{ flag.flag }}</span>
            <p class="flag-desc">{{ flag.desc }}</p>
            <div class="flag-values">
              <span class="flag-true">✓ {{ flag.true }}</span>
              <span class="flag-false">✕ {{ flag.false }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="player-perms-section">
        <h3 class="section-title">👥 给玩家设置权限</h3>

        <div class="perm-example">
          <h4>给好友权限</h4>
          <CodeBlock code="/res pset 领地名称 玩家ID trusted true" :large="true" />
          <p class="perm-desc">这会给该玩家所有权限（建造、开箱等）</p>
        </div>

        <div class="perm-example">
          <h4>只允许开门和按钮</h4>
          <CodeBlock code="/res pset 领地名称 玩家ID use true" :large="true" />
        </div>

        <div class="perm-example">
          <h4>移除玩家权限</h4>
          <CodeBlock code="/res pset 领地名称 玩家ID trusted remove" :large="true" />
        </div>

        <div class="tips-card">
          <span class="tips-icon">💡</span>
          <div class="tips-content">
            <h5>常用小技巧</h5>
            <ul>
              <li>站在领地内可以省略领地名称，直接输入 <code>/res pset 玩家ID trusted true</code></li>
              <li>输入 <code>/res info</code> 查看当前领地的所有权限</li>
              <li>领地默认关闭 PVP，很安全</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="help-section">
        <div class="help-card">
          <span class="help-icon">❓</span>
          <div class="help-content">
            <h4>还有问题？</h4>
            <p>输入 <code>/res ?</code> 在游戏内查看帮助，或加入 QQ 群询问</p>
            <a href="https://qm.qq.com/q/RLnf8Z7vmq" target="_blank" class="help-btn">
              加入 QQ 群
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.residence-guide {
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
  font-size: 14px;
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

.step-big {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 3px solid var(--fur-border);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .step-num {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 900;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
  }

  .step-content {
    flex: 1;

    h4 {
      margin: 6px 0 16px 0;
      font-size: 18px;
      font-weight: 800;
    }

    p {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.step-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.method-card {
  padding: 20px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);

  h5 {
    margin: 0 0 12px 0;
    font-size: 15px;
    font-weight: 800;
  }

  p {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .tip {
    color: var(--fur-primary);
    font-weight: 700;
  }
}

.code-block {
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 12px;
  border: 2px solid rgba(139, 92, 246, 0.2);

  &.large {
    padding: 16px 24px;
    margin: 12px 0;
  }

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    font-size: 14px;
  }
}

.success-text {
  margin-top: 16px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08));
  border-radius: 12px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  font-weight: 800;
  font-size: 15px;
}

.tip {
  font-size: 14px;
  font-weight: 600;
  color: var(--fur-text-secondary);

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    padding: 2px 8px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 6px;
  }
}

.flags-section {
  margin-bottom: 36px;
}

.flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.flag-card {
  padding: 20px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.flag-title {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 800;
}

.flag-name {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-weight: 700;
  color: var(--fur-primary);
  font-size: 12px;
  margin-bottom: 10px;
}

.flag-desc {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.flag-values {
  display: flex;
  gap: 8px;
}

.flag-true,
.flag-false {
  flex: 1;
  text-align: center;
  padding: 6px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.flag-true {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.flag-false {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.player-perms-section {
  margin-bottom: 36px;
}

.perm-example {
  margin-bottom: 16px;
  padding: 20px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);

  h4 {
    margin: 0 0 12px 0;
    font-size: 15px;
    font-weight: 800;
  }
}

.perm-desc {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: var(--fur-text-secondary);
  font-weight: 600;
}

.tips-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  margin-top: 24px;

  h5 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 800;
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

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    padding: 2px 8px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 6px;
  }
}

.tips-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.help-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 28px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.08));
  border: 3px solid rgba(139, 92, 246, 0.35);
  border-radius: 20px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 17px;
    font-weight: 900;
    color: var(--fur-primary);
  }

  p {
    margin: 0 0 16px 0;
    font-size: 14px;
    font-weight: 600;
  }

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    padding: 2px 8px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 6px;
  }
}

.help-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.help-btn {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, #12b7f5, #0099ff);
  color: white;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 14px;
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

  .step-big {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .step-cards {
    grid-template-columns: 1fr;
  }

  .flags-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tips-card,
  .help-card {
    flex-direction: column;
    text-align: center;
  }

  .commands-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .flags-grid {
    grid-template-columns: 1fr;
  }
}
</style>
