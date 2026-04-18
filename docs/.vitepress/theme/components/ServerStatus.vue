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
    <div class="server-card" :class="{ loading, 'theme-aware' : true }">
      <div v-if="loading" class="skeleton-overlay">
        <div class="skeleton-item skeleton-icon"></div>
        <div class="skeleton-info">
          <div class="skeleton-item skeleton-title"></div>
          <div class="skeleton-item skeleton-ip"></div>
        </div>
        <div class="skeleton-stats">
          <div class="skeleton-item skeleton-stat"></div>
          <div class="skeleton-item skeleton-stat"></div>
          <div class="skeleton-item skeleton-stat"></div>
        </div>
        <div class="skeleton-item skeleton-btn"></div>
      </div>

      <template v-else>
        <div class="server-header">
          <div class="icon-badge">
            <span class="server-icon">🏝️</span>
            <div class="status-ring" :class="{ online: serverData?.online }">
              <span></span>
            </div>
          </div>
          <div class="server-info">
            <h2 class="server-name">暖绒星港</h2>
            <div class="server-meta">
              <span class="ip-text">play.fur-island.asia</span>
              <span class="version-badge java">Java</span>
              <span class="version-badge bedrock">Bedrock</span>
            </div>
          </div>
        </div>

        <div class="server-stats">
          <div class="stat-card">
            <div class="stat-value players">
              <span>{{ serverData?.players?.online || 0 }}</span>
            </div>
            <div class="stat-label">在线玩家</div>
          </div>
          <div class="stat-card">
            <div class="stat-value ping">
              <span>{{ serverData?.ping }}</span>
              <small>ms</small>
            </div>
            <div class="stat-label">网络延迟</div>
          </div>
          <div class="stat-card">
            <div class="stat-value status" :class="{ online: serverData?.online }">
              <span>{{ serverData?.online ? '在线' : '离线' }}</span>
            </div>
            <div class="stat-label">运行状态</div>
          </div>
        </div>

        <button class="copy-btn" :class="{ success: copied }" @click="copyAddress">
          <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ copied ? '已复制' : '复制地址' }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-container {
  margin: 48px auto;
  max-width: 100%;
}

.server-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 28px 36px;
  background: linear-gradient(135deg, var(--fur-bg-card) 0%, var(--fur-bg-soft) 100%);
  border-radius: 20px;
  border: 1px solid var(--fur-border);
  box-shadow: var(--fur-shadow-medium);
  overflow: hidden;
  transition: all var(--fur-transition-normal);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--fur-gradient-primary);
    opacity: 0.6;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--fur-shadow-large);
  }

  &.loading {
    min-height: 120px;
  }

  :deep(.dark) & {
    background: linear-gradient(135deg, var(--fur-bg-card) 0%, var(--fur-bg-soft) 100%);
    border-color: var(--fur-border);
  }
}

.server-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-badge {
  position: relative;
}

.server-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fur-gradient-primary-reverse);
  border-radius: 16px;
  font-size: 32px;
  box-shadow: var(--fur-shadow-glow);
}

.status-ring {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background: var(--fur-bg-card);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #a8a29e;
    transition: all 0.3s ease;
  }

  &.online span {
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
    animation: statusPulse 2s infinite;
  }

  :deep(.dark) & {
    background: var(--fur-bg-card);
  }
}

@keyframes statusPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.1);
  }
}

.server-info {
  .server-name {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    background: var(--fur-gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .server-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;

    .ip-text {
      font-size: 14px;
      color: var(--fur-text-secondary);
    }

    .version-badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 6px;
      font-weight: 600;

      &.java {
        background: rgba(var(--fur-primary-rgb), 0.12);
        color: var(--fur-primary);
      }

      &.bedrock {
        background: rgba(139, 92, 246, 0.12);
        color: #7c3aed;
      }
    }
  }
}

.server-stats {
  display: flex;
  gap: 8px;
}

.stat-card {
  text-align: center;
  padding: 12px 24px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, var(--fur-border), transparent);
  }

  .stat-value {
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;

    &.players {
      background: var(--fur-gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &.ping {
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      small {
        font-size: 16px;
        opacity: 0.7;
      }
    }

    &.status {
      font-size: 20px;

      &.online {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      &:not(.online) {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .stat-label {
    display: block;
    font-size: 12px;
    color: var(--fur-text-secondary);
    margin-top: 6px;
    font-weight: 500;
  }
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: var(--fur-gradient-primary);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fur-transition-normal);
  box-shadow: var(--fur-shadow-glow);
  min-width: 120px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(var(--fur-primary-rgb), 0.45);
  }

  &:active {
    transform: translateY(0);
  }

  &.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  }
}

.skeleton-overlay {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.skeleton-item {
  background: linear-gradient(
    90deg,
  rgba(var(--fur-primary-rgb), 0.08) 25%,
  rgba(var(--fur-primary-rgb), 0.15) 50%,
  rgba(var(--fur-primary-rgb), 0.08) 75%
  );
  background-size: 200% 100%;
  border-radius: 12px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-title {
  width: 160px;
  height: 28px;
}

.skeleton-ip {
  width: 200px;
  height: 18px;
}

.skeleton-stats {
  display: flex;
  gap: 48px;
}

.skeleton-stat {
  width: 80px;
  height: 52px;
}

.skeleton-btn {
  width: 120px;
  height: 48px;
}

@media (max-width: 960px) {
  .server-card {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    align-items: stretch;
  }

  .server-header {
    justify-content: center;
  }

  .server-stats {
    justify-content: center;
  }

  .copy-btn {
    width: 100%;
  }

  .skeleton-overlay {
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }

  .skeleton-icon {
    align-self: center;
  }

  .skeleton-stats {
    justify-content: center;
    width: 100%;
  }

  .skeleton-btn {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .server-stats {
    flex-wrap: wrap;
    gap: 0;
  }

  .stat-card {
    padding: 8px 16px;
  }

  .stat-value {
    font-size: 26px;
  }

  .skeleton-stats {
    flex-wrap: wrap;
    gap: 16px;
  }

  .skeleton-stat {
    width: 80px;
  }
}
</style>
