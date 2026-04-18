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
  <div class="server-card">
    <div class="server-content">
      <div class="server-main">
        <span class="status-badge" :class="{ online: serverData?.online }">
          <span class="dot"></span>
          {{ serverData?.online ? '在线' : '离线' }}
        </span>
        <h3>暖绒星港</h3>
        <p class="address" @click="copyAddress">
          play.fur-island.asia
        </p>
      </div>
      
      <div class="server-numbers">
        <div class="number-item">
          <div class="num">{{ loading ? '-' : serverData?.players?.online }}</div>
          <div class="label">在线</div>
        </div>
        <div class="divider"></div>
        <div class="number-item">
          <div class="num">{{ loading ? '-' : serverData?.ping }}ms</div>
          <div class="label">延迟</div>
        </div>
        <div class="divider"></div>
        <div class="number-item">
          <div class="num">JE/BE</div>
          <div class="label">版本</div>
        </div>
      </div>
    </div>
    
    <button class="copy-button" @click="copyAddress">
      复制IP
    </button>
  </div>
</template>

<style scoped lang="scss">
.server-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px 24px;
  margin: 32px auto;
  gap: 20px;

  :deep(.dark) & {
    background: #1e293b;
  }
}

.server-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.server-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #64748b;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #94a3b8;
  }

  &.online {
    color: #059669;

    .dot {
      background: #10b981;
    }
  }
}

.server-main h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;

  :deep(.dark) & {
    color: #f1f5f9;
  }
}

.address {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f97316;
  }

  :deep(.dark) & {
    color: #94a3b8;
  }
}

.server-numbers {
  display: flex;
  align-items: center;
  gap: 24px;
}

.number-item {
  text-align: center;
  min-width: 60px;
}

.num {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;

  :deep(.dark) & {
    color: #f1f5f9;
  }
}

.label {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;

  :deep(.dark) & {
    color: #94a3b8;
  }
}

.divider {
  width: 1px;
  height: 40px;
  background: #e2e8f0;

  :deep(.dark) & {
    background: #334155;
  }
}

.copy-button {
  padding: 10px 20px;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #ea580c;
  }
}
</style>
