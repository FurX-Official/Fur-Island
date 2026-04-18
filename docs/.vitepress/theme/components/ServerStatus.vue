<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ServerData {
  name: string
  online: boolean
  type: string
  version: string
  players: {
    online: number
    max: number
  }
  ping: number
  motd: string
}

const serverData = ref<ServerData | null>(null)
const loading = ref(true)
const error = ref(false)

const fetchServerStatus = async () => {
  try {
    const response = await fetch('https://api.unborder.online/api/stats/Star')
    if (!response.ok) throw new Error('Failed to fetch')
    serverData.value = await response.json()
    error.value = false
  } catch (e) {
    error.value = true
    serverData.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchServerStatus()
  const interval = setInterval(fetchServerStatus, 30000)
  return () => clearInterval(interval)
})

const copyAddress = () => {
  navigator.clipboard.writeText('play.fur-island.asia')
  alert('服务器地址已复制到剪贴板！')
}
</script>

<template>
  <div class="server-status-card">
    <div class="server-header">
      <div class="server-icon">
        <span class="icon">🌌</span>
        <span class="status-dot" :class="{ online: serverData?.online, offline: !serverData?.online }"></span>
      </div>
      <div class="server-info">
        <h3>暖绒星港</h3>
        <p class="server-address" @click="copyAddress" title="点击复制地址">
          play.fur-island.asia
          <span class="port-badge">JE:25565 | BE:51650</span>
        </p>
      </div>
    </div>

    <div class="server-stats">
      <div class="stat-item">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <span class="stat-value">{{ loading ? '...' : serverData?.players?.online ?? '?' }}</span>
          <span class="stat-label">在线玩家</span>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">📶</div>
        <div class="stat-content">
          <span class="stat-value">{{ loading ? '...' : serverData?.ping ?? '?' }}ms</span>
          <span class="stat-label">延迟</span>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">{{ serverData?.online ? '✅' : '❌' }}</div>
        <div class="stat-content">
          <span class="stat-value status-text" :class="{ online: serverData?.online, offline: !serverData?.online }">
            {{ loading ? '...' : (serverData?.online ? '在线' : '离线') }}
          </span>
          <span class="stat-label">状态</span>
        </div>
      </div>
    </div>

    <div class="server-footer">
      <span class="version-tag">
        {{ serverData?.version?.split(' ')[0] || '加载中...' }}
      </span>
      <span class="motd-text">
        {{ serverData?.motd !== 'No MOTD' ? serverData?.motd : '与毛毛一起共绘方块世界！' }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-status-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  max-width: 520px;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f472b6, #fb923c, #facc15);
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 
      0 20px 60px rgba(31, 38, 135, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.9);
  }

  :deep(.dark) & {
    background: rgba(30, 30, 40, 0.7);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.08);

    &:hover {
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.12);
    }
  }
}

.server-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.server-icon {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  font-size: 32px;
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.3);

  :deep(.dark) & {
    background: linear-gradient(135deg, #44403c 0%, #292524 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
}

.status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid white;
  transition: all 0.3s ease;

  :deep(.dark) & {
    border-color: #292524;
  }

  &.online {
    background: #22c55e;
    box-shadow: 0 0 12px rgba(34, 197, 94, 0.6);
    animation: pulse 2s infinite;
  }

  &.offline {
    background: #ef4444;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.server-info h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #ea580c, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;

  :deep(.dark) & {
    background: linear-gradient(135deg, #fb923c, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.server-address {
  margin: 6px 0 0;
  font-size: 14px;
  color: #78716c;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
  padding: 4px 12px;
  background: rgba(251, 146, 60, 0.08);
  border-radius: 8px;
  border: 1px dashed rgba(251, 146, 60, 0.3);

  &:hover {
    color: #ea580c;
    background: rgba(251, 146, 60, 0.15);
    border-color: rgba(251, 146, 60, 0.5);
  }

  :deep(.dark) & {
    color: #a8a29e;
    background: rgba(251, 146, 60, 0.1);

    &:hover {
      color: #fb923c;
      background: rgba(251, 146, 60, 0.2);
    }
  }
}

.port-badge {
  background: linear-gradient(135deg, #f97316, #facc15);
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.server-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.stat-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 14px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(251, 146, 60, 0.15);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f97316, #facc15);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(251, 146, 60, 0.2);

    &::after {
      opacity: 1;
    }
  }

  :deep(.dark) & {
    background: linear-gradient(135deg, rgba(60, 60, 80, 0.8) 0%, rgba(40, 40, 60, 0.6) 100%);
    border: 1px solid rgba(251, 146, 60, 0.2);
  }
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 6px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-value {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #ea580c, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  :deep(.dark) & {
    background: linear-gradient(135deg, #fb923c, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &.status-text {
    &.online {
      background: linear-gradient(135deg, #16a34a, #22c55e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    &.offline {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.stat-label {
  font-size: 12px;
  color: #78716c;
  font-weight: 600;

  :deep(.dark) & {
    color: #a8a29e;
  }
}

.server-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(251, 146, 60, 0.15);

  :deep(.dark) & {
    border-top: 1px solid rgba(251, 146, 60, 0.2);
  }
}

.version-tag {
  background: linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%);
  color: #57534e;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  :deep(.dark) & {
    background: linear-gradient(135deg, #44403c 0%, #292524 100%);
    color: #e7e5e4;
  }
}

.motd-text {
  font-size: 13px;
  color: #78716c;
  font-style: italic;
  text-align: right;
  max-width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :deep(.dark) & {
    color: #a8a29e;
  }
}
</style>
