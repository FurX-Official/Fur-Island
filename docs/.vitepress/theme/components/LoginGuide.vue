<script setup lang="ts">
import { ref } from 'vue'

const steps = ref([
  {
    title: '启动游戏',
    desc: '打开 Minecraft 启动器，进入游戏主界面',
    image: '/pics/login/login-gui.png'
  },
  {
    title: '进入多人游戏',
    desc: '点击主界面的「多人游戏」按钮',
    image: '/pics/login/click_online.png'
  },
  {
    title: '打开服务器列表',
    desc: '进入多人游戏服务器列表界面',
    image: '/pics/login/online-gui.png'
  },
  {
    title: '添加服务器',
    desc: '点击「添加服务器」按钮',
    image: '/pics/login/click_button_add.png'
  },
  {
    title: '输入服务器信息',
    desc: '在「服务器地址」栏输入：play.fur-island.asia',
    image: '/pics/login/add_server.png'
  },
  {
    title: '完成添加',
    desc: '点击「完成」按钮确认添加',
    image: '/pics/login/click_ok.png'
  },
  {
    title: '服务器已添加',
    desc: '服务器成功添加到列表中，点击即可进入游戏',
    image: '/pics/login/add-ok.png'
  }
])
</script>

<template>
  <div class="login-guide">
    <div class="component-header">
      <span class="header-icon">🔐</span>
      <span class="header-text">服务器登录教程</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">
        本服务器采用 <strong>正版验证 + 皮肤站</strong> 双验证系统，让你与好友轻松联机
      </p>

      <div class="player-types">
        <h3 class="section-title">✨ 玩家分类</h3>
        <div class="types-grid">
          <div class="type-card success">
            <span class="type-icon">🎮</span>
            <h4>Minecraft 正版</h4>
            <p class="type-badge">✅ 无需注册</p>
            <p class="type-desc">直接进入游戏</p>
          </div>
          <div class="type-card success">
            <span class="type-icon">🎨</span>
            <h4>统一皮肤站用户</h4>
            <p class="type-badge">✅ 无需注册</p>
            <p class="type-desc">直接进入游戏</p>
          </div>
          <div class="type-card warning">
            <span class="type-icon">👤</span>
            <h4>离线 / 其他玩家</h4>
            <p class="type-badge">⚠️ 需要注册</p>
            <p class="type-desc">在 Limbo 界面完成注册</p>
          </div>
        </div>
      </div>

      <div class="steps-section">
        <h3 class="section-title">🚀 七步快速添加服务器</h3>
        <div class="steps-timeline">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-item"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-desc">{{ step.desc }}</p>
              <div class="step-image">
                <img :src="step.image" :alt="step.title">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="limbo-section">
        <h3 class="section-title">🎮 进入服务器</h3>
        <div class="limbo-cards">
          <div class="limbo-card verified">
            <span class="verified-icon">✨</span>
            <h4>正版玩家 / 皮肤站玩家</h4>
            <p class="verified-text">✅ 直接进入服务器，无需任何额外操作！</p>
          </div>
          <div class="limbo-card offline">
            <h4>👤 离线玩家（需要注册）</h4>
            <p>首次进入会被传送到 <strong>Limbo 等候大厅</strong>：</p>
            <div class="lobby-image">
              <img src="/pics/login/login-lobby.png" alt="等候大厅">
            </div>
            <div class="register-steps">
              <div class="register-step">
                <CodeBlock code="/register 密码 重复密码" />
                <p>首次进入时注册账号</p>
              </div>
              <div class="register-step">
                <CodeBlock code="/login 密码" />
                <p>后续登录时验证</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-section">
        <h3 class="section-title">💡 常见问题</h3>
        <div class="faq-list">
          <div class="faq-item">
            <h4>Q: 注册提示「密码不一致」？</h4>
            <p>A: 确保两次输入的密码完全相同，请勿包含空格。</p>
          </div>
          <div class="faq-item">
            <h4>Q: 忘记密码怎么办？</h4>
            <p>A: 请加入 QQ 群联系管理员重置。</p>
          </div>
          <div class="faq-item">
            <h4>Q: 为什么我输入指令没反应？</h4>
            <p>A: 确保在聊天框输入，而不是在控制台。</p>
          </div>
          <div class="faq-item">
            <h4>Q: 皮肤站用户还需要注册吗？</h4>
            <p>A: 不需要，皮肤站验证用户直接进入服务器。</p>
          </div>
        </div>
      </div>

      <div class="help-card">
        <span class="help-icon">📞</span>
        <div class="help-content">
          <h4>遇到问题？</h4>
          <p>欢迎加入我们的 QQ 群寻求帮助</p>
          <a href="https://qm.qq.com/q/RLnf8Z7vmq" target="_blank" class="help-btn">
            👉 点击加入 QQ 群
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-guide {
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
  font-weight: 600;
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

.player-types {
  margin-bottom: 36px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.type-card {
  padding: 24px 20px;
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  background: var(--fur-bg-card);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }

  &.success {
    border-top: 4px solid #10b981;
  }

  &.warning {
    border-top: 4px solid #f59e0b;
  }

  .type-icon {
    font-size: 36px;
    display: block;
    margin-bottom: 12px;
  }

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 800;
  }

  .type-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  &.success .type-badge {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
  }

  &.warning .type-badge {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
  }

  .type-desc {
    margin: 0;
    font-size: 14px;
    color: var(--fur-text-secondary);
    font-weight: 600;
  }
}

.steps-section {
  margin-bottom: 36px;
}

.steps-timeline {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--fur-primary), var(--fur-border));
    border-radius: 2px;
  }

  .step-item {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;
    position: relative;

    .step-number {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #8b5cf6, #3b82f6);
      color: white;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 20px;
      flex-shrink: 0;
      z-index: 1;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    }

    .step-content {
      flex: 1;
      padding: 8px 0;

      .step-title {
        margin: 0 0 8px 0;
        font-size: 17px;
        font-weight: 800;
      }

      .step-desc {
        margin: 0 0 16px 0;
        font-size: 14px;
        color: var(--fur-text-secondary);
        font-weight: 600;
      }

      .step-image {
        border: 3px solid var(--fur-border);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          display: block;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.limbo-section {
  margin-bottom: 36px;
}

.limbo-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.limbo-card {
  padding: 24px;
  border: 3px solid var(--fur-border);
  border-radius: 20px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &.verified {
    border-color: rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
    display: flex;
    align-items: center;
    gap: 16px;

    .verified-icon {
      font-size: 40px;
      flex-shrink: 0;
    }

    h4 {
      margin: 0 0 8px 0;
      font-size: 17px;
      font-weight: 800;
      color: #10b981;
    }

    .verified-text {
      margin: 0;
      font-size: 14px;
      font-weight: 700;
      color: #10b981;
    }
  }

  &.offline {
    h4 {
      margin: 0 0 16px 0;
      font-size: 17px;
      font-weight: 800;
    }

    p {
      margin: 0 0 16px 0;
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.lobby-image {
  border: 3px solid var(--fur-border);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    display: block;
  }
}

.register-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.register-step {
  padding: 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-radius: 14px;
  border: 2px solid rgba(139, 92, 246, 0.25);
  text-align: center;

  .cmd {
    display: block;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 800;
    color: var(--fur-primary);
    font-size: 14px;
    padding: 8px 12px;
    background: rgba(139, 92, 246, 0.15);
    border-radius: 10px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    font-weight: 600;
  }
}

.faq-section {
  margin-bottom: 36px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  padding: 20px;
  border: 3px solid var(--fur-border);
  border-radius: 16px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-1px);
  }

  h4 {
    margin: 0 0 8px 0;
    font-size: 15px;
    font-weight: 800;
    color: var(--fur-primary);
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
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

  .types-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .register-steps {
    grid-template-columns: 1fr;
  }

  .help-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
