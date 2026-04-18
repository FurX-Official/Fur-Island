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
}
</script>

<template>
  <div class="server-status">
    <div class="glow-layer"></div>
    <div class="server-card">
      <div class="server-info-section">
        <div class="icon-wrap">
          <span class="icon">🌟</span>
          <span class="status-pulse" :class="{ online: serverData?.online }">
            <span class="pulse-dot"></span>
            <span class="pulse-ring"></span>
          </span>
        </div>
        <div class="text-content">
          <h2>暖绒星港</h2>
          <p class="server-ip" @click="copyAddress">
            play.fur-island.asia
            <span class="copy-hint">点击复制</span>
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat">
          <span class="value players">{{ loading ? '—' : serverData?.players?.online }}</span>
          <span class="stat-label">在线玩家</span>
        </div>
        <div class="stat">
          <span class="value ping">{{ loading ? '—' : serverData?.ping }}ms</span>
          <span class="stat-label">网络延迟</span>
        </div>
        <div class="stat">
          <span class="value version">双端互通</span>
          <span class="stat-label">JE + BE</span>
        </div>
      </div>

      <button class="connect-btn" @click="copyAddress">
        <span>加入服务器</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-status {
  position: relative;
  margin: 48px auto;
  max-width: 700px;
}

.glow-layer {
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle at center,
    rgba(251, 146, 60, 0.15) 0%,
    transparent 70%
  );
  filter: blur(30px);
  opacity: 0.6;
  z-index: 0;
  pointer-events: none;
}

.server-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 24px 28px;
  background: 
    radial-gradient(
      100% 100% at 0% 0%,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 0 0 1px rgba(251, 146, 60, 0.1),
    0 8px 32px rgba(251, 146, 60, 0.12);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(251, 146, 60, 0.6) 50%, 
      transparent 100%
    );
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 0 0 1px rgba(251, 146, 60, 0.2),
      0 20px 60px rgba(251, 146, 60, 0.2);
  }

  :deep(.dark) & {
    background: 
      radial-gradient(
        100% 100% at 0% 0%,
        rgba(50, 50, 70, 0.9) 0%,
        rgba(30, 30, 50, 0.7) 100%
      );
    border-color: rgba(255, 255, 255, 0.08);
  }
}

.server-info-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrap {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  border-radius: 16px;
  font-size: 28px;
  box-shadow: 
    0 4px 16px rgba(251, 146, 60, 0.3);

  :deep(.dark) & {
    background: linear-gradient(135deg, #7c2d12 0%, #451a03 100%);
  }
}

.status-pulse {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .pulse-dot {
    width: 10px;
    height: 10px;
    background: #9ca3af;
    border-radius: 50%;
    z-index: 2;
  }

  .pulse-ring {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #9ca3af;
    opacity: 0;
  }

  &.online {
    .pulse-dot {
      background: #10b981;
    }
    .pulse-ring {
      background: #10b981;
      animation: pulse-ring 2s infinite;
    }
  }
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(2); opacity: 0; }
}

.text-content h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #ea580c 0%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.3px;
}

.server-ip {
  margin: 4px 0 0;
  font-size: 14px;
  color: #78716c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  .copy-hint {
    font-size: 11px;
    padding: 2px 8px;
    background: rgba(251, 146, 60, 0.1);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.2s;
    color: #d97706;
    font-weight: 500;
  }

  &:hover {
    color: #ea580c;

    .copy-hint {
      opacity: 1;
    }
  }

  :deep(.dark) & {
    color: #a8a29e;
  }
}

.stats-grid {
  display: flex;
  gap: 32px;
}

.stat {
  text-align: center;
  min-width: 70px;
}

.value {
  display: block;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;

  &.players {
    background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &.ping {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &.version {
    background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
    font-size: 18px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 3px;

  :deep(.dark) & {
    color: #64748b;
  }
}

.connect-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 16px rgba(249, 115, 22, 0.4);
  will-change: transform;

  span {
    transform: translateX(0);
    transition: transform 0.2s;
  }

  svg {
    transform: translateX(0);
    opacity: 0.8;
    transition: all 0.2s;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 
      0 6px 24px rgba(249, 115, 22, 0.5);

    svg {
      transform: translateX(3px);
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
