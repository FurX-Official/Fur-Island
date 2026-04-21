<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('java')

const tabs = [
  { key: 'java', label: 'Java 版', icon: '☕' },
  { key: 'bedrock', label: '基岩版', icon: '📱' }
]

const javaSteps = [
  {
    step: 1,
    title: '启动 Minecraft',
    desc: '打开 Minecraft 启动器，选择 1.7.x - 26.1.x 版本'
  },
  {
    step: 2,
    title: '添加服务器',
    desc: '点击"多人游戏" → "添加服务器"'
  },
  {
    step: 3,
    title: '输入地址',
    desc: '服务器地址：play.fur-island.asia',
    copy: true
  },
  {
    step: 4,
    title: '开始游戏',
    desc: '点击服务器加入，开启冒险之旅！'
  }
]

const bedrockSteps = [
  {
    step: 1,
    title: '进入游戏',
    desc: '打开 Minecraft 基岩版（手机/Win10/主机）'
  },
  {
    step: 2,
    title: '添加服务器',
    desc: '点击"游戏" → "服务器" → "添加服务器"'
  },
  {
    step: 3,
    title: '输入地址',
    desc: '地址：play.fur-island.asia 端口：51650',
    copy: true
  },
  {
    step: 4,
    title: '开始游戏',
    desc: '保存后点击服务器即可加入！'
  }
]

const copyAddress = () => {
  navigator.clipboard.writeText('play.fur-island.asia')
}
</script>

<template>
  <div class="connect-guide">
    <div class="component-header">
      <span class="header-icon">🚀</span>
      <span class="header-text">加入服务器指南</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">跨平台支持 · 支持 Java 版与基岩版互通</p>
      
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <div class="steps">
        <div
          v-for="step in activeTab === 'java' ? javaSteps : bedrockSteps"
          :key="step.step"
          class="step-item"
        >
          <div class="step-number">{{ step.step }}</div>
          <div class="step-content">
            <h4 class="step-title">{{ step.title }}</h4>
            <p class="step-desc">
              {{ step.desc }}
              <span v-if="step.copy" class="copy-text" @click="copyAddress">
                点击复制
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.connect-guide {
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

.tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;

  .tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--fur-bg-soft);
    border: 3px solid var(--fur-border);
    border-radius: 14px;
    font-size: 15px;
    font-weight: 800;
    color: var(--fur-text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;

    .tab-icon {
      font-size: 18px;
    }

    &:hover {
      border-color: var(--fur-primary);
    }

    &.active {
      background: linear-gradient(135deg, #8b5cf6, #3b82f6);
      border-color: transparent;
      color: white;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    gap: 8px;
    .tab {
      padding: 10px 18px;
      font-size: 14px;
    }
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.step-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 16px;
  border-radius: 18px;
  border: 3px solid var(--fur-border);
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--fur-primary);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.step-content {
  flex: 1;
}

.step-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 800;
}

.step-desc {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--fur-text-secondary);
  line-height: 1.5;
}

.copy-text {
  display: inline-block;
  margin: 10px auto 0;
  padding: 6px 12px;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 10px;
  color: var(--fur-primary);
  font-weight: 800;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.25);
    transform: scale(1.05);
  }
}

@media (max-width: 900px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
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
}

@media (max-width: 520px) {
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
