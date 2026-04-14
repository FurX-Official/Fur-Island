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
const copied = ref<string | null>(null)
const isDark = ref(false)
const isHovering = ref(false)
const gradientIndex = ref(0)
const season = ref<'spring' | 'summer' | 'autumn' | 'winter' | 'holiday'>('summer')
const particles = ref<Array<{ id: number; x: number; y: number; delay: number }>>([])
const pawPrints = ref<Array<{ id: number; x: number; delay: number }>>([])

const furryIcons = ['🦊', '🐺', '🐱', '🦁', '🐯', '🐻', '🐼', '🦝', '🐨', '🐵', '🐶', '🐰', '🐲', '🦄', '🐮']
const currentFurryIcon = ref('🦊')

const gradients = [
  ['#ff9a9e', '#fecfef', '#a8edea', '#fed6e3'],
  ['#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'],
  ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140', '#f093fb', '#f5576c']
]

const rippleEffect = ref<{ x: number; y: number; visible: boolean } | null>(null)

const randomFurryIcon = () => {
      currentFurryIcon.value = furryIcons[Math.floor(Math.random() * furryIcons.length)]
    }
    
    const generateParticles = () => {
      particles.value = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 10 + Math.random() * 80,
        delay: Math.random() * 2
      }))
    }
    
    const detectSeason = () => {
      const month = new Date().getMonth()
      const day = new Date().getDate()
      
      if ((month === 11 && day >= 20) || (month === 0 && day <= 5)) {
        season.value = 'holiday'
      } else if (month >= 11 || month <= 1) {
        season.value = 'winter'
      } else if (month >= 2 && month <= 4) {
        season.value = 'spring'
      } else if (month >= 8 && month <= 10) {
        season.value = 'autumn'
      } else {
        season.value = 'summer'
      }
    }
    
    const checkDarkMode = () => {
      isDark.value = document.documentElement.classList.contains('dark')
    }
    
    const handleRipple = (event: MouseEvent) => {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      rippleEffect.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        visible: true
      }
      setTimeout(() => {
        rippleEffect.value = null
      }, 600)
    }

const loadStats = async () => {
  loading.value = true
  error.value = null
  randomFurryIcon()
  gradientIndex.value = (gradientIndex.value + 1) % gradients.length
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

const copyToClipboard = async (text: string, type: string, event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  console.log('Copying:', text, type)
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    copied.value = type
    setTimeout(() => {
      copied.value = null
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    textArea.style.top = '-9999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = type
    setTimeout(() => {
      copied.value = null
    }, 2000)
  }
}

const spawnPawPrint = () => {
  if (pawPrints.value.length >= 5) return
  const newPrint = {
    id: Date.now(),
    x: 10 + Math.random() * 80,
    delay: Math.random() * 0.3
  }
  pawPrints.value.push(newPrint)
  setTimeout(() => {
    pawPrints.value = pawPrints.value.filter(p => p.id !== newPrint.id)
  }, 2000)
}

onMounted(() => {
  loadStats()
  detectSeason()
  checkDarkMode()
  generateParticles()
  randomFurryIcon()
  
  const observer = new MutationObserver(() => {
    checkDarkMode()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  
  const interval = setInterval(() => {
    gradientIndex.value = (gradientIndex.value + 1) % gradients.length
  }, 15000)
  
  return () => {
    observer.disconnect()
    clearInterval(interval)
  }
})
</script>

<template>
  <div 
    class="mc-server-status" 
    :class="[
      `theme-${isDark ? 'dark' : 'light'}`,
      `season-${season}`,
      `gradient-${gradientIndex}`
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @mousemove="isHovering && spawnPawPrint()"
    @click="handleRipple"
  >
    <div class="mc-particles">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="mc-particle"
        :style="{ left: particle.x + '%', top: particle.y + '%', animationDelay: particle.delay + 's' }"
      ></div>
    </div>
    
    <div class="mc-paw-prints">
      <div 
        v-for="print in pawPrints" 
        :key="print.id"
        class="mc-paw-print"
        :style="{ left: print.x + '%', animationDelay: print.delay + 's' }"
      >🐾</div>
    </div>
    
    <div 
      v-if="rippleEffect" 
      class="mc-ripple"
      :style="{ left: rippleEffect.x + 'px', top: rippleEffect.y + 'px' }"
    ></div>
    
    <div class="mc-server-status-inner">
      <div class="mc-server-header">
        <h3 class="mc-server-title">
          <span class="mc-icon-furry">{{ currentFurryIcon }}</span>
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
              <span class="mc-server-name-text">Fur-Island</span>
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
                  :class="{ success: copied === 'java-address' }"
                  @click="copyToClipboard('play.fur-island.asia', 'java-address', $event)"
                  title="复制地址"
                >
                  {{ copied === 'java-address' ? '✓' : '📋' }}
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
                  :class="{ success: copied === 'bedrock-address' }"
                  @click="copyToClipboard('play.fur-island.asia', 'bedrock-address', $event)"
                  title="复制地址"
                >
                  {{ copied === 'bedrock-address' ? '✓' : '📋' }}
                </button>
              </div>
              <div class="mc-port-row">
                <span class="mc-label">端口</span>
                <code class="mc-port">51650</code>
                <button 
                  class="mc-copy-btn" 
                  :class="{ success: copied === 'bedrock-port' }"
                  @click="copyToClipboard('51650', 'bedrock-port', $event)"
                  title="复制端口"
                >
                  {{ copied === 'bedrock-port' ? '✓' : '📋' }}
                </button>
              </div>
              </div>
            </div>
          </div>

          <div v-if="javaStats?.online && javaStats.motd && javaStats.motd !== 'No MOTD'" class="mc-motd">
            <span class="mc-motd-label">📝 服务器消息</span>
            <p class="mc-motd-text">{{ formatMotd(javaStats.motd) }}</p>
          </div>
        </div>

        <div class="mc-quick-links">
          <a href="https://qm.qq.com/q/yaW9FObDhu" target="_blank" class="mc-link-card qq-link">
            <span class="mc-link-icon">🐧</span>
            <span class="mc-link-text">QQ 交流群</span>
          </a>
          <a href="https://discord.gg/sRcjnRnV" target="_blank" class="mc-link-card discord-link">
            <span class="mc-link-icon">💬</span>
            <span class="mc-link-text">DC 频道</span>
          </a>
        </div>

        <div class="mc-server-tip-furry">
          <span class="mc-tip-icon">✨</span>
          Java 版无需端口，基岩版记得带上端口 51650 哦~
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc-particles,
.mc-paw-prints {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 28px;
  z-index: 0;
}

.mc-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 154, 158, 0.8), transparent);
  animation: particle-float 3s ease-in-out infinite;
  filter: blur(2px);
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) scale(1.5);
    opacity: 0.8;
  }
}

.mc-paw-print {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0;
  animation: paw-fall 2s ease-out forwards;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@keyframes paw-fall {
  0% {
    transform: translateY(-30px) rotate(-20deg) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100px) rotate(30deg) scale(0.3);
    opacity: 0;
  }
}

.mc-ripple {
  position: absolute;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(255, 154, 158, 0.3) 0%, 
    rgba(168, 237, 234, 0.2) 50%, 
    transparent 70%);
  animation: ripple-expand 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  pointer-events: none;
  z-index: 100;
}

@keyframes ripple-expand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.mc-server-status {
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  padding: 5px;
  border-radius: 28px;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
}

.mc-server-status::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    #ff9a9e 0%, 
    #fecfef 25%, 
    #a8edea 50%, 
    #fed6e3 75%, 
    #ff9a9e 100%);
  background-size: 400% 400%;
  animation: gradient-shift 8s ease infinite;
  transition: all 0.5s ease;
}

.mc-server-status.gradient-1::before {
  background: linear-gradient(135deg, 
    #a8edea 0%, #fed6e3 25%, #ffecd2 50%, #fcb69f 100%);
  background-size: 400% 400%;
}

.mc-server-status.gradient-2::before {
  background: linear-gradient(135deg, 
    #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 100%);
  background-size: 400% 400%;
}

.mc-server-status.gradient-3::before {
  background: linear-gradient(135deg, 
    #4facfe 0%, #00f2fe 25%, #43e97b 50%, #38f9d7 100%);
  background-size: 400% 400%;
}

.mc-server-status.gradient-4::before {
  background: linear-gradient(135deg, 
    #fa709a 0%, #fee140 25%, #f093fb 50%, #f5576c 100%);
  background-size: 400% 400%;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.mc-server-status.theme-dark::before {
  filter: brightness(0.85) saturate(1.2);
}

.mc-server-status::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 0 50px rgba(255, 154, 158, 0.35);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.mc-server-status.theme-dark::after {
  box-shadow: 0 0 80px rgba(255, 154, 158, 0.45);
  opacity: 0.5;
}

.season-spring .mc-particle {
  background: radial-gradient(circle, rgba(255, 183, 197, 0.8), transparent);
}

.season-winter .mc-particle {
  background: radial-gradient(circle, rgba(200, 230, 255, 0.8), transparent);
}

.season-autumn .mc-particle {
  background: radial-gradient(circle, rgba(255, 180, 100, 0.8), transparent);
}

.mc-server-status:hover {
  transform: translateY(-5px) scale(1.01);
}

.mc-server-status:hover::after {
  box-shadow: 0 0 100px rgba(255, 154, 158, 0.6),
              0 0 150px rgba(168, 237, 234, 0.4);
  opacity: 1;
}

.mc-server-status-inner {
  padding: 2rem;
  border-radius: 23px;
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

.mc-icon-furry {
  font-size: 2rem;
  animation: furry-bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 2px 10px rgba(255, 154, 158, 0.6));
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mc-server-status:hover .mc-icon-furry {
  transform: scale(1.2) rotate(10deg);
}

@keyframes furry-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-5px) scale(1.1); }
}

.mc-icon-paw {
  font-size: 1.75rem;
  animation: paw-bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px rgba(255, 154, 158, 0.5));
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
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a8edea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  font-size: 1.8rem;
  position: relative;
  letter-spacing: 2px;
  filter: drop-shadow(0 0 15px rgba(255, 154, 158, 0.4));
  text-shadow: none;
  animation: title-fur 3s ease-in-out infinite;
}

@keyframes title-fur {
  0%, 100% {
    filter: drop-shadow(0 0 12px rgba(255, 154, 158, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(255, 154, 158, 0.6))
            drop-shadow(0 0 40px rgba(168, 237, 234, 0.3));
  }
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
  padding: 2rem;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  backdrop-filter: blur(20px);
}

@supports (backdrop-filter: blur(20px)) {
  .mc-server-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 154, 158, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 237, 234, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
}

.mc-server-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}

.mc-server-status:hover .mc-server-card {
  transform: scale(1.02);
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
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  box-shadow: 0 0 0 0 rgba(255, 154, 158, 0.4);
  position: relative;
}

.mc-status-dot::before,
.mc-status-dot::after {
  content: '';
  position: absolute;
  inset: -50%;
  border-radius: 50%;
  border: 2px solid rgba(239, 68, 68, 0.3);
  animation: particle-ring 2s ease-out infinite;
}

.mc-status-dot::after {
  animation-delay: 1s;
}

.mc-status-indicator.online .mc-status-dot {
  background: radial-gradient(circle, #ff9a9e 40%, #fecfef 100%);
  box-shadow: 0 0 20px rgba(255, 154, 158, 0.7);
  animation: furry-pulse 2s ease-in-out infinite;
}

.mc-status-indicator.online .mc-status-dot::before,
.mc-status-indicator.online .mc-status-dot::after {
  border-color: rgba(255, 154, 158, 0.4);
}

@keyframes particle-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mc-stat-item-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-mute);
  border-radius: 16px;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.mc-connection-item {
  padding: 1.5rem;
  background: var(--vp-c-bg-mute);
  border-radius: 16px;
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
  cursor: pointer !important;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  pointer-events: auto !important;
}

.mc-copy-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: scale(1.05);
}

.mc-copy-btn.success {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  animation: copy-success 0.3s ease;
}

@keyframes copy-success {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
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
  margin-top: 2rem;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0.15) 0%, 
    rgba(168, 237, 234, 0.15) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 154, 158, 0.3);
  font-size: 1rem;
  text-align: center;
  line-height: 1.7;
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
  box-shadow: 0 0 80px rgba(255, 154, 158, 0.45);
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

.mc-quick-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.mc-link-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid transparent;
}

.mc-link-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.map-link::before {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.1));
}

.qq-link::before {
  background: linear-gradient(135deg, rgba(18, 169, 234, 0.2), rgba(102, 126, 234, 0.1));
}

.discord-link::before {
  background: linear-gradient(135deg, rgba(114, 137, 218, 0.2), rgba(88, 101, 242, 0.1));
}

.mc-link-icon {
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mc-link-text {
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.mc-link-card:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: rgba(255, 154, 158, 0.3);
}

.mc-link-card:hover::before {
  opacity: 1;
}

.mc-link-card:hover .mc-link-icon {
  transform: scale(1.3) rotate(10deg);
}

.mc-link-card:active {
  transform: translateY(-2px) scale(0.98);
}

.mc-stat-item-main,
.mc-connection-item,
.mc-copy-btn,
.mc-refresh-btn {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mc-stat-item-main:hover,
.mc-connection-item:hover {
  transform: translateY(-3px) scale(1.03);
}

.mc-stat-item-main:active,
.mc-connection-item:active {
  transform: translateY(-1px) scale(0.98);
}

.mc-copy-btn:hover,
.mc-refresh-btn:hover {
  transform: scale(1.1);
}

.mc-copy-btn:active,
.mc-refresh-btn:active {
  transform: scale(0.95);
}

@media (max-width: 1260px) {
  .mc-server-status {
    max-width: 100%;
    margin: 1rem 1.5rem;
  }
}

.season-spring .mc-paw-print {
  animation-name: paw-fall, cherry-blossom;
}

.season-winter .mc-paw-print:after {
  content: '❄️';
  position: absolute;
  font-size: 1rem;
  animation: snow-fall 2s linear infinite;
}

@keyframes snow-fall {
  0% { transform: translateX(0); }
  100% { transform: translateX(10px); }
}

@keyframes cherry-blossom {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(10deg) saturate(1.2); }
}

@media (max-width: 768px) {
  .mc-server-status {
    margin: 1rem auto;
    border-radius: 20px;
    padding: 4px;
  }

  .mc-server-status-inner {
    padding: 1.25rem;
    border-radius: 17px;
  }

  .mc-quick-links {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .mc-link-card {
    padding: 1rem;
  }

  .mc-server-card {
    padding: 1.25rem;
    border-radius: 20px;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .mc-stat-item-main {
    padding: 1rem;
  }

  .mc-connection-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .mc-connection-item {
    padding: 1.25rem;
  }

  .mc-server-header-main {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .mc-server-tip-furry {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .mc-stats-row-main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .mc-server-status {
    margin: 0.5rem -0.5rem;
    border-radius: 16px;
    padding: 3px;
  }

  .mc-server-status-inner {
    padding: 1rem;
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
    padding: 0.875rem 1rem;
    gap: 0.75rem;
    border-radius: 12px;
  }

  .mc-connection-item {
    padding: 1rem;
    border-radius: 12px;
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
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.6;
    border-radius: 16px;
  }
}
</style>
