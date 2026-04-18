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
  <div class="server-wrapper">
    <div class="server-card">
      <div class="card-border top"></div>
      <div class="card-border right"></div>
      <div class="card-border bottom"></div>
      <div class="card-border left"></div>
      
      <div class="card-content">
        <div class="server-head">
          <div class="icon-box">
            <span class="minecraft-icon">�</span>
            <div class="status-indicator" :class="{ online: serverData?.online }">
              <span class="light"></span>
              <span class="scan-line"></span>
            </div>
          </div>
          <div class="title-group">
            <h1 class="server-name">
              <span class="glitch" data-text="暖绒星港">暖绒星港</span>
            </h1>
            <p class="ip-text" @click="copyAddress">
              <code>play.fur-island.asia</code>
              <span class="port-tag">JE : BE</span>
            </p>
          </div>
        </div>

        <div class="data-panel">
          <div class="data-item">
            <div class="data-value">{{ loading ? '----' : (serverData?.players?.online || 0).toString().padStart(2, '0') }}</div>
            <div class="data-label">玩家在线</div>
          </div>
          <div class="divider-line"></div>
          <div class="data-item">
            <div class="data-value">{{ loading ? '---' : serverData?.ping }}<span class="unit">ms</span></div>
            <div class="data-label">网络延迟</div>
          </div>
          <div class="divider-line"></div>
          <div class="data-item">
            <div class="data-value status" :class="{ online: serverData?.online }">
            {{ loading ? '----' : (serverData?.online ? 'ONLINE' : 'OFFLINE') }}
            </div>
            <div class="data-label">服务器状态</div>
          </div>
        </div>

        <button class="action-btn" @click="copyAddress">
          <span class="btn-text">复制地址</span>
          <div class="btn-glow"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.server-wrapper {
  margin: 48px auto;
  max-width: 100%;
}

.server-card {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 16px;
  padding: 32px 40px;
  overflow: hidden;
  box-shadow: 
    0 0 60px rgba(6, 182, 212, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 2px,
        rgba(6, 182, 212, 0.03) 2px,
        rgba(6, 182, 212, 0.03) 4px
      );
    pointer-events: none;
    opacity: 0.5;
  }
}

.card-border {
  position: absolute;
  background: linear-gradient(90deg, #06b6d4, #8b5cf6);
  opacity: 0.6;

  &.top, &.bottom {
    height: 2px;
    left: 30px;
    right: 30px;
  }

  &.top { top: 0; }
  &.bottom { bottom: 0; }

  &.left, &.right {
    width: 2px;
    top: 30px;
    bottom: 30px;
  }

  &.left { left: 0; }
  &.right { right: 0; }
}

.card-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.server-head {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  font-size: 36px;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 
    0 0 30px rgba(6, 182, 212, 0.2),
    inset 0 0 20px rgba(6, 182, 212, 0.05);
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 14px;
  height: 14px;

  .light {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #475569;
    z-index: 2;
  }

  .scan-line {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #475569;
    opacity: 0;
  }

  &.online {
    .light {
      background: #22c55e;
      box-shadow: 0 0 10px #22c55e;
    }
    .scan-line {
      border-color: #22c55e;
      animation: scan 2s infinite;
    }
  }
}

@keyframes scan {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

.title-group {
  .server-name {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
    font-family: 'Courier New', monospace;
    line-height: 1.1;
  }

  .glitch {
    background: linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shine 3s linear infinite;
  }
}

@keyframes shine {
  to { background-position: 200% center; }
}

.ip-text {
  margin: 6px 0 0;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  code {
    font-family: 'Courier New', monospace;
    font-size: 15px;
    color: #94a3b8;
    transition: color 0.2s;
  }

  .port-tag {
    font-size: 11px;
    padding: 3px 10px;
    background: rgba(6, 182, 212, 0.15);
    color: #06b6d4;
    border-radius: 6px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  &:hover code {
    color: #06b6d4;
  }
}

.data-panel {
  display: flex;
  align-items: center;
  gap: 0;
}

.data-item {
  text-align: center;
  padding: 0 32px;
}

.data-value {
  font-family: 'Courier New', monospace;
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;

  .unit {
    font-size: 18px;
    opacity: 0.7;
  }

  &.status {
    font-size: 20px;

    &.online {
      background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &:not(.online) {
      background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.data-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
  font-weight: 600;
}

.divider-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(6, 182, 212, 0.3) 50%, 
    transparent 100%
  );
}

.action-btn {
  position: relative;
  padding: 14px 28px;
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 20px rgba(6, 182, 212, 0.4);

  .btn-text {
    position: relative;
    z-index: 2;
  }

  .btn-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px rgba(6, 182, 212, 0.5);

    .btn-glow {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }
}

:deep(.dark) & {
  .server-card {
    background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  }
}
</style>
