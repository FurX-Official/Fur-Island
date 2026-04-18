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
  background: linear-gradient(135deg, #ffedd5 0%, #fef3c7 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(230, 126, 34, 0.15);
  border: 1px solid rgba(230, 126, 34, 0.2);
  max-width: 500px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(230, 126, 34, 0.25);
  }

  :deep(.dark) & {
    background: linear-gradient(135deg, #4a3f35 0%, #3d342a 100%);
    border-color: rgba(230, 126, 34, 0.3);
  }
}

.server-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(230, 126, 34, 0.2);

  :deep(.dark) & {
    border-color: rgba(230, 126, 34, 0.25);
  }
}

.server-icon {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  font-size: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  :deep(.dark) & {
    background: #2d2a26;
  }
}

.status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  transition: background-color 0.3s ease;

  :deep(.dark) & {
    border-color: #2d2a26;
  }

  &.online {
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  }

  &.offline {
    background: #ef4444;
  }
}

.server-info h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #92400e;
  letter-spacing: 0.5px;

  :deep(.dark) & {
    color: #fbbf24;
  }
}

.server-address {
  margin: 4px 0 0;
  font-size: 13px;
  color: #b45309;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #92400e;
    text-decoration: underline;
  }

  :deep(.dark) & {
    color: #f59e0b;

    &:hover {
      color: #fbbf24;
    }
  }
}

.port-badge {
  background: rgba(230, 126, 34, 0.15);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;

  :deep(.dark) & {
    background: rgba(230, 126, 34, 0.25);
  }
}

.server-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 14px 12px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  :deep(.dark) & {
    background: rgba(0, 0, 0, 0.2);
  }
}

.stat-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  color: #92400e;
  line-height: 1;

  :deep(.dark) & {
    color: #fbbf24;
  }

  &.status-text {
    &.online {
      color: #16a34a;
    }
    &.offline {
      color: #dc2626;
    }
  }
}

.stat-label {
  font-size: 11px;
  color: #d97706;
  font-weight: 600;

  :deep(.dark) & {
    color: #f59e0b;
  }
}

.server-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(230, 126, 34, 0.15);

  :deep(.dark) & {
    border-color: rgba(230, 126, 34, 0.2);
  }
}

.version-tag {
  background: rgba(230, 126, 34, 0.2);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #92400e;

  :deep(.dark) & {
    color: #fbbf24;
  }
}

.motd-text {
  font-size: 12px;
  color: #b45309;
  font-style: italic;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :deep(.dark) & {
    color: #f59e0b;
  }
}
</style>
