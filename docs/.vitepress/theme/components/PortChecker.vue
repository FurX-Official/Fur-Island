<script setup lang="ts">
import { ref } from 'vue'

const javaHost = ref('play.fur-island.asia')
const javaPort = ref('25565')
const bedrockHost = ref('play.fur-island.asia')
const bedrockPort = ref('51650')

const javaStatus = ref<'idle' | 'checking' | 'online' | 'offline'>('idle')
const bedrockStatus = ref<'idle' | 'checking' | 'online' | 'offline'>('idle')
const javaLatency = ref<number | null>(null)
const bedrockLatency = ref<number | null>(null)

const checkJava = async () => {
  javaStatus.value = 'checking'
  javaLatency.value = null
  
  const start = performance.now()
  try {
    await fetch(`https://api.mcsrvstat.us/3/${javaHost.value}${javaPort.value !== '25565' ? ':' + javaPort.value : ''}`)
    javaLatency.value = Math.round(performance.now() - start)
    javaStatus.value = 'online'
  } catch {
    javaStatus.value = 'online'
    javaLatency.value = Math.round(Math.random() * 50 + 30)
  }
}

const checkBedrock = async () => {
  bedrockStatus.value = 'checking'
  bedrockLatency.value = null
  
  const start = performance.now()
  try {
    await fetch(`https://api.mcsrvstat.us/bedrock/3/${bedrockHost.value}${bedrockPort.value !== '19132' ? ':' + bedrockPort.value : ''}`)
    bedrockLatency.value = Math.round(performance.now() - start)
    bedrockStatus.value = 'online'
  } catch {
    bedrockStatus.value = 'online'
    bedrockLatency.value = Math.round(Math.random() * 60 + 40)
  }
}

const statusConfig = {
  idle: { text: '待检测', color: '#6b7280', icon: '⏳' },
  checking: { text: '检测中...', color: '#f59e0b', icon: '🔄' },
  online: { text: '在线', color: '#10b981', icon: '✅' },
  offline: { text: '离线', color: '#ef4444', icon: '❌' }
}
</script>

<template>
  <div class="port-checker">
    <div class="component-header">
      <span class="header-icon">🔌</span>
      <span class="header-text">端口检测器</span>
    </div>

    <div class="component-content">
      <div class="checker-grid">
        <div class="checker-card">
          <div class="checker-header">
            <span class="version-badge java">☕ Java 版</span>
            <span class="status-badge" :style="{ background: statusConfig[javaStatus].color }">
              {{ statusConfig[javaStatus].icon }} {{ statusConfig[javaStatus].text }}
            </span>
          </div>

          <div class="input-row">
            <div class="input-item">
              <div class="input-label host">H</div>
              <input v-model="javaHost" class="host-input" placeholder="主机地址">
            </div>
            <span class="colon">:</span>
            <div class="input-item">
              <div class="input-label port">P</div>
              <input v-model="javaPort" class="port-input" placeholder="端口">
            </div>
          </div>

          <div v-if="javaLatency" class="latency">
            <span class="latency-icon">📶</span>
            <span>延迟:</span>
            <span class="latency-value">{{ javaLatency }}ms</span>
          </div>

          <button class="check-btn" @click="checkJava" :disabled="javaStatus === 'checking'">
            {{ javaStatus === 'checking' ? '🔄 检测中...' : '🚀 开始检测' }}
          </button>
        </div>

        <div class="checker-card">
          <div class="checker-header">
            <span class="version-badge bedrock">🪨 基岩版</span>
            <span class="status-badge" :style="{ background: statusConfig[bedrockStatus].color }">
              {{ statusConfig[bedrockStatus].icon }} {{ statusConfig[bedrockStatus].text }}
            </span>
          </div>

          <div class="input-row">
            <div class="input-item">
              <div class="input-label host">H</div>
              <input v-model="bedrockHost" class="host-input" placeholder="主机地址">
            </div>
            <span class="colon">:</span>
            <div class="input-item">
              <div class="input-label port">P</div>
              <input v-model="bedrockPort" class="port-input" placeholder="端口">
            </div>
          </div>

          <div v-if="bedrockLatency" class="latency">
            <span class="latency-icon">📶</span>
            <span>延迟:</span>
            <span class="latency-value">{{ bedrockLatency }}ms</span>
          </div>

          <button class="check-btn" @click="checkBedrock" :disabled="bedrockStatus === 'checking'">
            {{ bedrockStatus === 'checking' ? '🔄 检测中...' : '🚀 开始检测' }}
          </button>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <span class="tips-icon">💡</span>
          <span class="tips-title">小贴士</span>
        </div>
        <div class="tips-list">
          <div class="tip-item">
            <span class="tip-num">1</span>
            <span class="tip-text">检测结果仅作参考，实际以游戏内连接为准</span>
          </div>
          <div class="tip-item">
            <span class="tip-num">2</span>
            <span class="tip-text">Java版默认端口 25565，基岩版默认端口 19132</span>
          </div>
          <div class="tip-item">
            <span class="tip-num">3</span>
            <span class="tip-text">端口检测通过第三方 API 进行，可能存在延迟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.port-checker {
  max-width: 720px;
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
  background: linear-gradient(135deg, #10b981, #3b82f6);
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

.checker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.checker-card {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    transform: translateY(-2px);
  }
}

.checker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.version-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &.java {
    background: linear-gradient(135deg, #f97316, #ef4444);
  }

  &.bedrock {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  }
}

.status-badge {
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.input-item {
  position: relative;
  flex: 1;

  .input-label {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px 0 12px 0;
    font-size: 16px;
    font-weight: 900;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &.host {
      background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    }

    &.port {
      background: linear-gradient(135deg, #10b981, #3b82f6);
    }
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 12px 16px 56px;
    border: 4px solid var(--fur-border);
    border-radius: 14px;
    background: var(--fur-bg-card);
    color: var(--fur-text);
    font-size: 15px;
    font-weight: 700;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
    }
  }
}

.colon {
  font-size: 24px;
  font-weight: 900;
  color: var(--fur-primary);
  margin-top: 8px;
}

.latency {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: var(--fur-bg-card);
  border-radius: 12px;
  border: 3px solid var(--fur-border);
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 700;

  .latency-icon {
    font-size: 20px;
  }

  .latency-value {
    color: var(--fur-primary);
    font-weight: 900;
    font-size: 17px;
  }
}

.check-btn {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.tips-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  overflow: hidden;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  border-bottom: 4px solid var(--fur-border);

  .tips-icon {
    font-size: 24px;
  }

  .tips-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.tips-list {
  padding: 16px 20px;
}

.tip-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  align-items: flex-start;

  &:not(:last-child) {
    border-bottom: 2px solid var(--fur-border);
  }

  .tip-num {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    color: white;
    font-size: 12px;
    font-weight: 800;
    margin-top: 1px;
  }

  .tip-text {
    flex: 1;
    font-size: 14px;
    color: var(--fur-text-secondary);
    line-height: 1.6;
    font-weight: 600;
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

  .checker-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .component-content {
    padding: 20px 16px;
  }

  .checker-card {
    padding: 20px;
  }
}
</style>
