<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ServerStats {
  name: string
  online: boolean
  type: 'java' | 'bedrock'
  version: string
  players: {
    online: number
    max: number
  }
  ping: number
  motd: string
  icon?: string
  timestamp: number
}

const javaStats = ref<ServerStats | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const apiBase = 'https://api.unborder.online'

async function fetchServerStats(): Promise<ServerStats | null> {
  try {
    const response = await fetch(`${apiBase}/api/stats/Star`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    return await response.json()
  } catch (err) {
    console.error('Failed to fetch server stats:', err)
    return null
  }
}

async function loadStats() {
  loading.value = true
  error.value = null
  
  try {
    const stats = await fetchServerStats()
    javaStats.value = stats
  } catch (err) {
    error.value = '加载服务器状态失败，请稍后重试'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatMotd(motd: string): string {
  return motd.replace(/§[0-9a-fk-or]/g, '').trim()
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="mc-server-status">
    <div class="mc-server-header">
      <h3 class="mc-server-title">
        <span class="mc-icon">⛏️</span>
        Fur-Island 服务器
      </h3>
      <button 
        @click="loadStats" 
        class="mc-refresh-btn"
        :disabled="loading"
        title="刷新状态"
      >
        <svg 
          class="mc-refresh-icon" 
          :class="{ spinning: loading }" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </button>
    </div>

    <div v-if="error" class="mc-error">
      <span class="mc-error-icon">⚠️</span>
      {{ error }}
    </div>

    <div v-if="loading" class="mc-loading">
      <div class="mc-spinner"></div>
      <span>正在加载服务器状态...</span>
    </div>

    <div v-else class="mc-server-single">
      <div class="mc-server-card" :class="{ offline: !javaStats?.online }">
        <div class="mc-server-header-main">
          <div class="mc-server-name">
            <span class="mc-server-icon">🌍</span>
            <span class="mc-server-name-text">{{ javaStats?.name || 'Star' }} 服务器</span>
          </div>
          <span class="mc-status-indicator" :class="{ online: javaStats?.online }">
            <span class="mc-status-dot"></span>
            {{ javaStats?.online ? '在线' : '离线' }}
          </span>
        </div>

        <div v-if="javaStats?.online" class="mc-stats-row-main">
          <div class="mc-stat-item-main">
            <span class="mc-stat-icon">👥</span>
            <div class="mc-stat-content">
              <span class="mc-stat-label-main">在线玩家</span>
              <span class="mc-stat-value-main">{{ javaStats.players.online }} / {{ javaStats.players.max }}</span>
            </div>
          </div>
          <div class="mc-stat-item-main">
            <span class="mc-stat-icon">📡</span>
            <div class="mc-stat-content">
              <span class="mc-stat-label-main">延迟</span>
              <span class="mc-stat-value-main">{{ javaStats.ping }}ms</span>
            </div>
          </div>
          <div class="mc-stat-item-main">
            <span class="mc-stat-icon">📦</span>
            <div class="mc-stat-content">
              <span class="mc-stat-label-main">版本</span>
              <span class="mc-stat-value-main">{{ javaStats.version }}</span>
            </div>
          </div>
        </div>

        <div class="mc-connection-section">
          <h4 class="mc-section-title">🔌 连接信息</h4>
          
          <div class="mc-connection-grid">
            <!-- Java 版连接 -->
            <div class="mc-connection-item">
              <div class="mc-connection-header">
                <span class="mc-type-badge java">Java 版</span>
              </div>
              <div class="mc-address-row">
                <span class="mc-label">地址</span>
                <code class="mc-address">play.fur-island.asia</code>
                <button 
                  class="mc-copy-btn" 
                  @click="navigator.clipboard.writeText('play.fur-island.asia')"
                  title="复制地址"
                >
                  📋
                </button>
              </div>
              <div class="mc-port-row">
                <span class="mc-label">端口</span>
                <span class="mc-port-text">默认 (无需输入)</span>
              </div>
            </div>

            <!-- 基岩版连接 -->
            <div class="mc-connection-item">
              <div class="mc-connection-header">
                <span class="mc-type-badge bedrock">基岩版</span>
              </div>
              <div class="mc-address-row">
                <span class="mc-label">地址</span>
                <code class="mc-address">play.fur-island.asia</code>
                <button 
                  class="mc-copy-btn" 
                  @click="navigator.clipboard.writeText('play.fur-island.asia')"
                  title="复制地址"
                >
                  📋
                </button>
              </div>
              <div class="mc-port-row">
                <span class="mc-label">端口</span>
                <code class="mc-port">51650</code>
              </div>
            </div>
          </div>
        </div>

        <div v-if="javaStats?.online && javaStats.motd && javaStats.motd !== 'No MOTD'" class="mc-motd">
          <span class="mc-motd-label">📝 服务器消息</span>
          <p class="mc-motd-text">{{ formatMotd(javaStats.motd) }}</p>
        </div>
      </div>
    </div>

    <div class="mc-server-tip">
      💡 Java 版无需输入端口，基岩版请使用端口 51650 连接
    </div>
  </div>
</template>

<style scoped>
.mc-server-status {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.mc-server-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.mc-server-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.mc-icon {
  font-size: 1.5rem;
}

.mc-refresh-btn {
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: var(--vp-c-brand-1, #18794e);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mc-refresh-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #156d45);
  transform: rotate(15deg);
}

.mc-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mc-refresh-icon {
  width: 20px;
  height: 20px;
}

.mc-refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.mc-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem;
  color: var(--vp-c-text-2);
}

.mc-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.mc-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: var(--vp-c-danger-1);
}

.mc-server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.mc-server-card {
  padding: 1.25rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.mc-server-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mc-server-card.offline {
  opacity: 0.7;
  border-color: var(--vp-c-danger-soft);
}

.mc-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.mc-type-badge.java {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.mc-type-badge.bedrock {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.mc-status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.mc-status-indicator.online {
  color: #10b981;
}

.mc-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}

.mc-status-indicator.online .mc-status-dot {
  background: #10b981;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.mc-address-row,
.mc-port-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mc-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.mc-address,
.mc-port {
  flex: 1;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
}

.mc-copy-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.mc-copy-btn:hover {
  background: var(--vp-c-bg-mute);
}

.mc-server-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mc-server-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mc-server-icon {
  font-size: 1.5rem;
}

.mc-server-name-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.mc-stats-row-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mc-stat-item-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
}

.mc-stat-icon {
  font-size: 1.5rem;
}

.mc-stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mc-stat-label-main {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.mc-stat-value-main {
  font-size: 0.95rem;
  font-weight: 600;
}

.mc-connection-section {
  margin-bottom: 1rem;
}

.mc-section-title {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.mc-connection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.mc-connection-item {
  padding: 1rem;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
}

.mc-connection-header {
  margin-bottom: 0.75rem;
}

.mc-port-text {
  flex: 1;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.mc-motd {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
}

.mc-motd-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.mc-motd-text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.mc-server-tip {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.dark .mc-server-card {
  background: var(--vp-c-bg-soft);
}

.dark .mc-address,
.dark .mc-port,
.dark .mc-motd,
.dark .mc-stat-item-main,
.dark .mc-connection-item {
  background: var(--vp-c-bg-mute);
}

@media (max-width: 640px) {
  .mc-server-status {
    padding: 1rem;
  }

  .mc-stats-row-main {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .mc-server-name-text {
    font-size: 1rem;
  }
}
</style>
