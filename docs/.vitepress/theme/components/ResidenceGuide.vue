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
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🏠</span>
        Residence 领地教程
      </h2>
      <p class="guide-subtitle">保护你的建筑，设置权限，安心建造</p>
    </div>

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
              <div class="code-block">
                <code>/res select 20</code>
              </div>
              <p>以你为中心，选择 20x20x20 的立方体区域</p>
              <p class="tip">💡 推荐新手使用此方式</p>
            </div>
            <div class="method-card">
              <h5>方式二：锄头选择</h5>
              <p>手持 <strong>木棍</strong> 左键选择第一个点</p>
              <p>右键选择第二个点</p>
              <div class="code-block">
                <code>// 两点围成的矩形就是你的领地范围</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="step-big">
        <div class="step-num">2</div>
        <div class="step-content">
          <h4>确认并创建</h4>
          <p>选择后会显示选择的区域大小，输入命令创建：</p>
          <div class="code-block large">
            <code>/res create 我的家</code>
          </div>
          <p class="success-text">✅ 创建成功！领地已受保护！</p>
        </div>
      </div>

      <div class="step-big">
        <div class="step-num">3</div>
        <div class="step-content">
          <h4>调整大小（可选）</h4>
          <p>面向要扩大的方向，输入：</p>
          <div class="code-block large">
            <code>/res expand 10</code>
          </div>
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
        <div class="code-block large">
          <code>/res pset 领地名称 玩家ID trusted true</code>
        </div>
        <p class="perm-desc">这会给该玩家所有权限（建造、开箱等）</p>
      </div>

      <div class="perm-example">
        <h4>只允许开门和按钮</h4>
        <div class="code-block large">
          <code>/res pset 领地名称 玩家ID use true</code>
        </div>
      </div>

      <div class="perm-example">
        <h4>移除玩家权限</h4>
        <div class="code-block large">
          <code>/res pset 领地名称 玩家ID trusted remove</code>
        </div>
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
</template>

<style scoped lang="scss">
.residence-guide {
  padding: 32px 0;
  max-width: 1000px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 48px;

  .guide-title {
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

  .guide-subtitle {
    font-size: 15px;
    color: var(--fur-text-secondary);
    margin: 0;
  }
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: var(--fur-text);
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.command-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--fur-shadow-card);
    border-color: rgba(var(--fur-primary-rgb), 0.3);
  }

  .cmd-icon {
    font-size: 24px;
  }

  .cmd-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: var(--fur-primary);
  }

  .cmd-desc {
    font-size: 12px;
    color: var(--fur-text-secondary);
  }
}

.step-big {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--fur-border);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .step-num {
    width: 56px;
    height: 56px;
    background: var(--fur-gradient-primary);
    color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(var(--fur-primary-rgb), 0.25);
  }

  .step-content {
    flex: 1;

    h4 {
      margin: 6px 0 16px 0;
      font-size: 18px;
      font-weight: 600;
    }

    p {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
    }

    .success-text {
      color: #10b981;
      font-weight: 600;
    }

    .tip {
      margin-top: 8px;
      color: #f59e0b;

      code {
        color: #f59e0b;
        background: rgba(245, 158, 11, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }
  }

  .step-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .method-card {
    background: var(--fur-bg-soft);
    border-radius: 12px;
    padding: 16px;

    h5 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
    }

    p {
      font-size: 13px;
      margin: 4px 0;
    }
  }
}

.code-block {
  background: var(--fur-bg-elevated);
  border: 1px solid var(--fur-border);
  border-radius: 10px;
  padding: 12px 16px;
  margin: 12px 0;

  &.large {
    padding: 14px 20px;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--fur-primary);
    font-weight: 600;
  }
}

.flags-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.flag-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--fur-shadow-card);
  }

  .flag-title {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .flag-name {
    display: inline-block;
    background: var(--fur-bg-soft);
    padding: 2px 10px;
    border-radius: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--fur-text-secondary);
    margin-bottom: 8px;
  }

  .flag-desc {
    margin: 0 0 10px 0;
    font-size: 12px;
    color: var(--fur-text-secondary);
  }

  .flag-values {
    display: flex;
    gap: 8px;
    justify-content: center;

    .flag-true {
      padding: 3px 8px;
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    .flag-false {
      padding: 3px 8px;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
  }
}

.perm-example {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--fur-primary);
  }

  .perm-desc {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
  }
}

.tips-card {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding: 20px 24px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 14px;

  .tips-icon {
    font-size: 32px;
    flex-shrink: 0;
  }

  .tips-content {
    h5 {
      margin: 0 0 10px 0;
      font-size: 15px;
      font-weight: 600;
      color: #f59e0b;
    }

    ul {
      margin: 0;
      padding-left: 0;
      list-style: none;

      li {
        margin-bottom: 6px;
        font-size: 13px;
        color: var(--fur-text-secondary);

        code {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
        }
      }
    }
  }
}

.help-section {
  margin-top: 48px;

  .help-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 28px;
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.1) 0%,
      rgba(59, 130, 246, 0.05) 100%
    );
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 16px;

    .help-icon {
      font-size: 40px;
      flex-shrink: 0;
    }

    .help-content {
      flex: 1;

      h4 {
        margin: 0 0 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #10b981;
      }

      p {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: var(--fur-text-secondary);

        code {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
        }
      }

      .help-btn {
        display: inline-block;
        padding: 8px 20px;
        background: var(--fur-gradient-primary);
        color: white;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .flags-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-cards {
    grid-template-columns: 1fr;
  }
}
</style>
