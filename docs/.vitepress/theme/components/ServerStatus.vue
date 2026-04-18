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
const copied = ref(false)

const fetchServerStatus = async () => {
  try {
    const response = await fetch('https://api.unborder.online/api/stats/Star')
    if (!response.ok) throw new Error()
    serverData.value = await response.json()
  } catch {
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
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="server-container">
    <div class="server-card">
      <div class="left-section">
        <div class="icon-wrapper">
          <span class="main-icon">🏝️</span>
          <span class="status-badge" :class="{ online: serverData?.online }">
            <span class="dot"></span>
          </span>
        </div>
        <div class="info-group">
          <h2 class="server-title">暖绒星港</h2>
          <p class="server-ip">
            <span class="ip-text">play.fur-island.asia</span>
            <span class="tag">Java</span>
            <span class="tag bedrock">Bedrock</span>
          </p>
        </div>
      </div>

      <div class="stats-section">
        <div class="stat">
          <span class="stat-number">{{ loading ? '—' : serverData?.players?.online || 0 }}</span>
          <span class="stat-text">在线玩家</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ loading ? '—' : serverData?.ping }}</span>
          <span class="stat-text">毫秒延迟</span>
        </div>
        <div class="stat">
          <span class="stat-number status-text" :class="{ online: serverData?.online }">
            {{ loading ? '—' : (serverData?.online ? '运行中' : '离线') }}
          </span>
          <span class="stat-text">服务器状态</span>
        </div>
      </div>

      <button class="copy-button" @click="copyAddress" :class="{ success: copied }">
        <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ copied ? '已复制' : '复制IP' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-container {
  margin: 48px auto;
  max-width: 100%;
}

.server-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 24px 32px;
  background: linear-gradient(135deg, #fffbf7 0%, #fff7ed 100%);
  border-radius: 20px;
  border: 1px solid rgba(251, 146, 60, 0.2);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 24px rgba(251, 146, 60, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.04),
      0 8px 40px rgba(251, 146, 60, 0.15);
  }

  :deep(.dark) & {
    background: linear-gradient(135deg, #292524 0%, #1c1917 100%);
    border-color: rgba(251, 146, 60, 0.15);
    box-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.2),
      0 4px 24px rgba(0, 0, 0, 0.3);
  }
}

.left-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  border-radius: 16px;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.25);

  :deep(.dark) & {
    background: linear-gradient(135deg, #7c2d12 0%, #451a03 100%);
  }
}

.status-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  :deep(.dark) & {
    background: #292524;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #a8a29e;
    transition: all 0.3s ease;
  }

  &.online .dot {
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  }
}

.info-group {
  .server-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #44403c;
    line-height: 1.2;

    :deep(.dark) & {
      color: #f5f5f4;
    }
  }

  .server-ip {
    margin: 4px 0 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .ip-text {
      font-size: 14px;
      color: #78716c;
      font-family: 'SF Mono', Monaco, monospace;

      :deep(.dark) & {
        color: #a8a29e;
      }
    }

    .tag {
      font-size: 10px;
      padding: 3px 8px;
      background: rgba(251, 146, 60, 0.12);
      color: #c2410c;
      border-radius: 6px;
      font-weight: 600;
      letter-spacing: 0.3px;

      &.bedrock {
        background: rgba(124, 58, 237, 0.12);
        color: #6d28d9;
      }
    }
  }
}

.stats-section {
  display: flex;
  gap: 0;
}

.stat {
  text-align: center;
  padding: 0 32px;
  border-left: 1px solid rgba(251, 146, 60, 0.15);

  &:first-child {
    border-left: none;
  }

  :deep(.dark) & {
    border-color: rgba(251, 146, 60, 0.1);
  }
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(135deg, #ea580c 0%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-variant-numeric: tabular-nums;

  &.status-text {
    font-size: 18px;

    &.online {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &:not(.online) {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.stat-text {
  display: block;
  font-size: 12px;
  color: #78716c;
  margin-top: 4px;
  font-weight: 500;

  :deep(.dark) & {
    color: #a8a29e;
  }
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
  min-width: 110px;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.45);
  }

  &:active {
    transform: translateY(0);
  }

  &.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  }
}
</style>
