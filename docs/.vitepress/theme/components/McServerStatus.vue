<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ServerStats {
  online: boolean
  ip: string
  port: number
  motd: string
  version: string
  players: {
    online: number
    max: number
  }
  ping: number
}

const javaStats = ref<ServerStats | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const loadStats = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://api.unborder.online/api/stats/Star')
    if (!response.ok) throw new Error('Failed to fetch server status')
    const data = await response.json()
    console.log('API Response:', data)
    javaStats.value = {
      online: data.online || data.status || false,
      ip: 'play.fur-island.asia',
      port: data.port || data.portinfo?.port || 25565,
      motd: data.motd || data.motd_json?.clean || '',
      version: data.version || data.server || '未知',
      players: {
        online: data.players?.online || data.players_online || 0,
        max: data.players?.max || data.players_max || 20
      },
      ping: data.ping || 0
    }
  } catch (err) {
    error.value = null
    javaStats.value = {
      online: false,
      ip: 'play.fur-island.asia',
      port: 25565,
      motd: '',
      version: '未知',
      players: {
        online: 0,
        max: 20
      },
      ping: 0
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatMotd = (motd: string) => {
  if (!motd || motd === 'No MOTD') return ''
  return motd.replace(/§[0-9a-fklmnor]/g, '')
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="mc-server-status">
    <div class="mc-server-status-inner">
      <div class="mc-server-header">
        <h3 class="mc-server-title">
          <span class="mc-icon-paw">🐾</span>
          <span class="mc-title-furry">欢迎来到</span>
          <span class="mc-title-main">Fur-Island</span>
          <span class="mc-icon-paw">🐾</span>
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
              <span class="mc-server-icon">🐾</span>
              <span class="mc-server-name-text">Fur-Island 服务器</span>
            </div>
            <span class="mc-status-indicator" :class="{ online: javaStats?.online }">
              <span class="mc-status-dot"></span>
              {{ javaStats?.online ? '在线' : '离线' }}
            </span>
          </div>

          <div v-if="javaStats?.online" class="mc-stats-row-main">
            <div class="mc-stat-item-main">
              <span class="mc-stat-icon-furry">🦊</span>
              <div class="mc-stat-content">
                <span class="mc-stat-label-main">岛上小伙伴</span>
                <span class="mc-stat-value-main">{{ javaStats.players.online }} / {{ javaStats.players.max }}</span>
              </div>
            </div>
            <div class="mc-stat-item-main">
              <span class="mc-stat-icon-furry">💖</span>
              <div class="mc-stat-content">
                <span class="mc-stat-label-main">连接心跳</span>
                <span class="mc-stat-value-main">{{ javaStats.ping }}ms</span>
              </div>
            </div>
            <div class="mc-stat-item-main">
              <span class="mc-stat-icon-furry">🏠</span>
              <div class="mc-stat-content">
                <span class="mc-stat-label-main">服务版本</span>
                <span class="mc-stat-value-main">{{ javaStats.version }}</span>
              </div>
            </div>
          </div>

          <div class="mc-connection-section">
            <h4 class="mc-section-title">🐾 登岛方式</h4>
            
            <div class="mc-connection-grid">
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

        <div class="mc-server-tip-furry">
          <span class="mc-tip-icon">✨</span>
          用爪子踏上 Fur-Island 吧！Java 版无需端口，基岩版记得带上端口 51650 哦~
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc-server-status {
  max-width: 800px;
  margin: 2rem auto;
  position: relative;
  padding: 3px;
  border-radius: 24px;
  background: linear-gradient(135deg, 
    #ff9a9e 0%, 
    #fecfef 25%, 
    #a8edea 50%, 
    #fed6e3 75%, 
    #ff9a9e 100%);
  background-size: 200% 200%;
  animation: furry-gradient 4s ease infinite;
  box-shadow: 0 0 40px rgba(255, 154, 158, 0.3);
  transition: all 0.5s ease;
  cursor: pointer;
}

.mc-server-status:hover {
  box-shadow: 0 0 60px rgba(255, 154, 158, 0.5),
              0 0 100px rgba(168, 237, 234, 0.3);
  transform: translateY(-2px);
  animation-duration: 2s;
}

.mc-server-status-inner {
  padding: 1.5rem;
  border-radius: 21px;
  background: var(--vp-c-bg);
  position: relative;
  z-index: 1;
}

@keyframes furry-gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
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
  gap: 0.75rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a8edea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mc-icon-paw {
  font-size: 1.75rem;
  animation: paw-bounce 2s ease-in-out infinite;
}

.mc-icon-paw:first-child {
  animation-delay: -0.5s;
}

.mc-icon-paw:last-child {
  animation-delay: -1s;
}

@keyframes paw-bounce {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
}

.mc-title-furry {
  font-size: 1rem;
  opacity: 0.8;
}

.mc-title-main {
  letter-spacing: 0.05em;
}

.mc-refresh-btn {
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mc-refresh-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
  color: white;
}

.mc-refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mc-refresh-icon {
  width: 1.25rem;
  height: 1.25rem;
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
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.mc-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--vp-c-divider);
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
  border-radius: 8px;
  color: #ef4444;
  text-align: center;
  justify-content: center;
}

.mc-error-icon {
  font-size: 1.25rem;
}

.mc-server-card {
  padding: 1.5rem;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.mc-server-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0.5) 0%, 
    rgba(254, 207, 239, 0.5) 50%, 
    rgba(168, 237, 234, 0.5) 100%);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.mc-server-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 154, 158, 0.15);
}

.mc-server-card:hover::before {
  opacity: 1;
}

.mc-server-card.offline {
  filter: grayscale(50%);
  opacity: 0.8;
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

.mc-status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.mc-status-indicator.online {
  color: #ff9a9e;
  font-weight: 600;
}

.mc-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  box-shadow: 0 0 0 0 rgba(255, 154, 158, 0.4);
}

.mc-status-indicator.online .mc-status-dot {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  animation: furry-pulse 2s ease-in-out infinite;
}

@keyframes furry-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 154, 158, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 154, 158, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 154, 158, 0);
  }
}

.mc-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.mc-type-badge.java {
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0.2) 0%, 
    rgba(254, 207, 239, 0.2) 100%);
  color: #e87a90;
}

.mc-type-badge.bedrock {
  background: linear-gradient(135deg, 
    rgba(168, 237, 234, 0.2) 0%, 
    rgba(254, 214, 227, 0.2) 100%);
  color: #56c5bf;
}

.mc-stats-row-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mc-stat-item-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-mute);
  border-radius: 12px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mc-stat-item-main::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0) 0%, 
    rgba(255, 154, 158, 0.08) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mc-stat-item-main:hover {
  border-color: rgba(255, 154, 158, 0.3);
  transform: translateY(-2px);
}

.mc-stat-item-main:hover::before {
  opacity: 1;
}

.mc-stat-icon-furry {
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.mc-stat-item-main:hover .mc-stat-icon-furry {
  transform: scale(1.15) rotate(10deg);
}

.mc-stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mc-stat-label-main {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mc-stat-value-main {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.mc-connection-section {
  margin-top: 1.5rem;
}

.mc-section-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mc-connection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.mc-connection-item {
  padding: 1rem;
  background: var(--vp-c-bg-mute);
  border-radius: 12px;
}

.mc-connection-header {
  margin-bottom: 0.75rem;
}

.mc-address-row,
.mc-port-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mc-address-row {
  margin-bottom: 0.5rem;
}

.mc-label {
  width: 40px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.mc-address,
.mc-port {
  flex: 1;
  padding: 0.375rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  border: 1px solid var(--vp-c-divider);
}

.mc-port-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.mc-copy-btn {
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.mc-copy-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: scale(1.05);
}

.mc-motd {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.mc-motd-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.mc-motd-text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.mc-server-tip-furry {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0.15) 0%, 
    rgba(168, 237, 234, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 154, 158, 0.3);
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.6;
  position: relative;
  overflow: hidden;
}

.mc-server-tip-furry::before {
  content: '🐾';
  position: absolute;
  top: -5px;
  left: 10px;
  font-size: 0.7rem;
  opacity: 0.5;
}

.mc-server-tip-furry::after {
  content: '🐾';
  position: absolute;
  bottom: -5px;
  right: 10px;
  font-size: 0.7rem;
  opacity: 0.5;
}

.mc-tip-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.dark .mc-server-status {
  box-shadow: 0 0 60px rgba(255, 154, 158, 0.4);
}

.dark .mc-server-status-inner {
  background: var(--vp-c-bg);
}

.dark .mc-server-card {
  background: var(--vp-c-bg-soft);
}

.dark .mc-address,
.dark .mc-port,
.dark .mc-motd,
.dark .mc-stat-item-main,
.dark .mc-connection-item {
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .mc-server-status {
    margin: 1rem auto;
    border-radius: 20px;
  }

  .mc-server-status-inner {
    padding: 1rem;
    border-radius: 17px;
  }

  .mc-server-title {
    font-size: 1.2rem;
    gap: 0.5rem;
  }

  .mc-icon-paw {
    font-size: 1.4rem;
  }

  .mc-title-furry {
    display: none;
  }

  .mc-stats-row-main {
    grid-template-columns: 1fr;
  }

  .mc-connection-grid {
    grid-template-columns: 1fr;
  }

  .mc-server-header-main {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .mc-server-tip-furry {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .mc-server-status {
    margin: 0.5rem -0.5rem;
    border-radius: 16px;
  }

  .mc-server-status-inner {
    padding: 0.75rem;
    border-radius: 13px;
  }

  .mc-server-card {
    padding: 1rem;
    border-radius: 16px;
  }

  .mc-server-name-text {
    font-size: 1rem;
  }

  .mc-stat-item-main {
    padding: 0.75rem;
  }

  .mc-connection-item {
    padding: 0.75rem;
  }

  .mc-address-row,
  .mc-port-row {
    flex-wrap: wrap;
  }

  .mc-label {
    width: 100%;
    margin-bottom: 0.25rem;
  }

  .mc-address,
  .mc-port {
    flex: 1;
    min-width: 0;
    font-size: 0.75rem;
  }

  .mc-server-tip-furry {
    padding: 0.75rem;
    font-size: 0.75rem;
    line-height: 1.5;
  }
}
</style>
