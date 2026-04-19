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
  <div class="login-guide-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🔐</span>
        服务器登录教程
      </h2>
      <p class="guide-subtitle">
        本服务器采用 <strong>正版验证 + 皮肤站</strong> 双验证系统，让你与好友轻松联机
      </p>
    </div>

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
          <h4>🌟 正版玩家 / 皮肤站玩家</h4>
          <p class="limbo-result">✅ 直接进入服务器，无需任何额外操作！</p>
        </div>
        <div class="limbo-card offline">
          <h4>👤 离线玩家（需要注册）</h4>
          <p>首次进入会被传送到 <strong>Limbo 等候大厅</strong>：</p>
          <div class="lobby-image">
            <img src="/pics/login/login-lobby.png" alt="等候大厅">
          </div>
          <div class="register-steps">
            <div class="register-step">
              <span class="cmd">/register 密码 重复密码</span>
              <p>首次进入时注册账号</p>
            </div>
            <div class="register-step">
              <span class="cmd">/login 密码</span>
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
</template>

<style scoped lang="scss">
.login-guide-section {
  padding: 32px 0;
  max-width: 900px;
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

.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  .type-card {
    background: var(--fur-bg-card);
    border: 1px solid var(--fur-border);
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--fur-shadow-card);
    }

    &.success {
      border-top: 3px solid var(--fur-success);
    }

    &.warning {
      border-top: 3px solid var(--fur-warning);
    }

    .type-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 12px;
    }

    h4 {
      margin: 0 0 8px 0;
      font-size: 15px;
      font-weight: 600;
    }

    .type-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 8px;
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
      font-size: 13px;
      color: var(--fur-text-secondary);
    }
  }
}

.steps-timeline {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--fur-border);
  }

  .step-item {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;
    position: relative;

    .step-number {
      width: 50px;
      height: 50px;
      background: var(--fur-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
      z-index: 1;
      box-shadow: 0 4px 12px rgba(var(--fur-primary-rgb), 0.3);
    }

    .step-content {
      flex: 1;
      padding-top: 8px;

      .step-title {
        margin: 0 0 6px 0;
        font-size: 16px;
        font-weight: 600;
      }

      .step-desc {
        margin: 0 0 16px 0;
        font-size: 14px;
        color: var(--fur-text-secondary);
      }

      .step-image {
        img {
          max-height: 320px;
          border-radius: 12px;
          border: 2px solid var(--fur-border);
          box-shadow: var(--fur-shadow-card);
        }
      }
    }
  }
}

.limbo-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .limbo-card {
    background: var(--fur-bg-card);
    border: 1px solid var(--fur-border);
    border-radius: 14px;
    padding: 24px;

    &.verified {
      border-top: 3px solid #10b981;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      h4 {
        margin-bottom: 12px;
      }
    }

    &.offline {
      border-top: 3px solid #f59e0b;
    }

    h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .limbo-result {
      font-size: 15px;
      color: #10b981;
      font-weight: 600;
    }

    p {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
    }

    .lobby-image {
      margin-bottom: 20px;

      img {
        width: 100%;
        border-radius: 10px;
        border: 2px solid var(--fur-border);
      }
    }

    .register-steps {
      .register-step {
        margin-bottom: 12px;

        .cmd {
          display: inline-block;
          background: var(--fur-bg-soft);
          padding: 6px 14px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--fur-primary);
          font-weight: 600;
          margin-bottom: 4px;
        }

        p {
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
}

.faq-list {
  .faq-item {
    background: var(--fur-bg-card);
    border: 1px solid var(--fur-border);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 12px;

    h4 {
      margin: 0 0 6px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--fur-primary);
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
    }
  }
}

.help-card {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding: 24px 28px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(236, 72, 153, 0.05) 100%
  );
  border: 1px solid rgba(139, 92, 246, 0.2);
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
      color: #8b5cf6;
    }

    p {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
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

@media (max-width: 768px) {
  .types-grid,
  .limbo-cards {
    grid-template-columns: 1fr;
  }

  .help-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
