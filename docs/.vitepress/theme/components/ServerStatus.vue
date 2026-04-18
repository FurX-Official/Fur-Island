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
      <div class="server-title-wrap">
        <div class="server-icon">
          <span class="icon">🌌</span>
          <span class="status-dot" :class="{ online: serverData?.online, offline: !serverData?.online }"></span>
        </div>
        <div class="server-info">
          <h3>暖绒星港</h3>
          <p class="server-address" title="点击复制地址">
            play.fur-island.asia
            <span class="port-badge">JE:25565 | BE:51650</span>
          </p>
        </div>
      </div>
      <button class="copy-btn" @click="copyAddress">
        复制地址
      </button>
    </div>

    <div class="server-stats">
      <div class="stat-item">
        <span class="stat-value">{{ loading ? '...' : serverData?.players?.online ?? '?' }}</span>
        <span class="stat-label">在线玩家</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-value">{{ loading ? '...' : serverData?.players?.max ?? '?' }}</span>
        <span class="stat-label">最大人数</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-value">{{ loading ? '...' : serverData?.ping ?? '?' }}ms</span>
        <span class="stat-label">延迟</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-value" :class="{ online: serverData?.online, offline: !serverData?.online }">
          {{ loading ? '...' : (serverData?.online ? '在线' : '离线') }}
        </span>
        <span class="stat-label">状态</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-status-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 
    0 4px 20px rgba(249, 115, 22, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(249, 115, 22, 0.15);
  max-width: 100%;
  margin: 40px auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #f97316, #facc15, #f97316);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(249, 115, 22, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }

  :deep(.dark) & {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border-color: rgba(249, 115, 22, 0.25);
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.5),
        0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
}

.server-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;

  :deep(.dark) & {
    border-color: #374151;
  }
}

.server-title-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.server-icon {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 14px;
  font-size: 26px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);

  :deep(.dark) & {
    background: linear-gradient(135deg, #7c2d12 0%, #451a03 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #ffffff;

  :deep(.dark) & {
    border-color: #451a03;
  }

  &.online {
    background: #22c55e;
  }

  &.offline {
    background: #ef4444;
  }
}

.server-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;

  :deep(.dark) & {
    color: #f9fafb;
  }
}

.server-address {
  margin: 3px 0 0;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #f97316;
    text-decoration: underline;
  }

  :deep(.dark) & {
    color: #9ca3af;

    &:hover {
      color: #fb923c;
    }
  }
}

.port-badge {
  background: #f3f4f6;
  color: #4b5563;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;

  :deep(.dark) & {
    background: #374151;
    color: #d1d5db;
  }
}

.copy-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  :deep(.dark) & {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.server-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 16px 8px;
  border-radius: 12px;
  transition: all 0.2s ease;
  background: rgba(249, 115, 22, 0.03);
  border: 1px solid rgba(249, 115, 22, 0.08);

  &:hover {
    background: rgba(249, 115, 22, 0.08);
    border-color: rgba(249, 115, 22, 0.15);
    transform: translateY(-1px);

    :deep(.dark) & {
      background: rgba(249, 115, 22, 0.1);
    }
  }

  :deep(.dark) & {
    background: rgba(249, 115, 22, 0.05);
    border-color: rgba(249, 115, 22, 0.15);
  }
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
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

.stat-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  margin-top: 4px;

  :deep(.dark) & {
    color: #9ca3af;
  }
}
</style>
