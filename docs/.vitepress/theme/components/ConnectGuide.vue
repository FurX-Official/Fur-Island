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
    desc: '打开 Minecraft 启动器，选择 1.19.x - 1.20.x 版本'
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
    <h3 class="guide-title">🚀 加入服务器指南</h3>
    
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
</template>

<style scoped lang="scss">
.connect-guide {
  margin: 48px auto;
  max-width: 100%;
  padding: 36px 48px;
  background: var(--fur-bg-card);
  border-radius: 20px;
  border: 1px solid var(--fur-border);
  box-shadow: var(--fur-shadow-medium);

  :deep(.dark) & {
    background: var(--fur-bg-card);
  }

  @media (max-width: 768px) {
    margin: 32px auto;
    padding: 24px 20px;
  }
}

.guide-title {
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: var(--fur-text-primary);
}

.tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;

  .tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: var(--fur-bg-soft);
    border: 1px solid var(--fur-border);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--fur-text-secondary);
    cursor: pointer;
    transition: all var(--fur-transition-normal);

    .tab-icon {
      font-size: 16px;
    }

    &:hover {
      border-color: var(--fur-primary);
    }

    &.active {
      background: var(--fur-gradient-primary);
      border-color: transparent;
      color: white;
      box-shadow: var(--fur-shadow-glow);
    }
  }

  @media (max-width: 480px) {
    gap: 8px;
    .tab {
      padding: 8px 14px;
      font-size: 13px;
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
  padding: 20px 12px;
  border-radius: 16px;
  background: var(--fur-bg-soft);
  transition: all var(--fur-transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--fur-shadow-medium);
  }

  :deep(.dark) & {
    background: var(--fur-bg-soft);
  }
}

@media (max-width: 768px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fur-gradient-primary);
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  z-index: 2;
  box-shadow: var(--fur-shadow-glow);
}

.step-content {
  margin-top: 12px;

  .step-title {
    margin: 0 0 6px;
    font-size: 15px;
    font-weight: 600;
    color: var(--fur-text-primary);
  }

  .step-desc {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    line-height: 1.5;

    .copy-text {
      display: block;
      margin-top: 4px;
      color: var(--fur-primary);
      font-weight: 600;
      cursor: pointer;
    }
  }
}


</style>
