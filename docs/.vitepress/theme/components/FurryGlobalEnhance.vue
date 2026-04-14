<template>
  <Teleport to="body">
    <div id="furry-cursor-container"></div>
    
    <button 
      ref="backToTopBtn"
      class="furry-back-to-top"
      :class="{ visible: showBackToTop }"
      @click="scrollToTop"
    >
      🐾
    </button>

    <div v-if="easterEggActive" class="konami-celebration">
      <div v-for="i in 20" :key="i" class="celebration-paw" :style="getPawStyle(i)">
        {{ celebrationIcons[i % celebrationIcons.length] }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const showBackToTop = ref(false)
const backToTopBtn = ref<HTMLElement | null>(null)
const konamiCode = ref<string[]>([])
const easterEggActive = ref(false)

const furryIcons = ['🦊', '🐺', '🐱', '🦁', '🐯', '🐻', '🐼', '🦝', '🐨', '🐵', '🐶', '🐰', '🐲', '🦄', '🐮']
const celebrationIcons = ['🎉', '🎊', '✨', '💖', '🦊', '🐾', '🌟', '💫', '🎀', '🌈']

const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

let cursorTimer: number | null = null
let lastCursorX = 0
let lastCursorY = 0

const getPawStyle = (i: number) => {
  const angle = (i / 20) * Math.PI * 2
  const distance = 100 + Math.random() * 100
  return {
    left: '50%',
    top: '50%',
    animationDelay: `${i * 0.05}s`,
    '--tx': `${Math.cos(angle) * distance}px`,
    '--ty': `${Math.sin(angle) * distance}px`
  } as Record<string, string>
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
  
  document.documentElement.style.setProperty('--scroll-y', String(window.scrollY))
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createBurst(lastCursorX, lastCursorY), i * 80)
  }
}

const createCursorParticle = (x: number, y: number) => {
  const container = document.getElementById('furry-cursor-container')
  if (!container) return
  
  const particle = document.createElement('div')
  particle.className = 'cursor-particle'
  particle.style.left = x + 'px'
  particle.style.top = y + 'px'
  particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 50}px`)
  particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 50}px`)
  
  container.appendChild(particle)
  
  setTimeout(() => particle.remove(), 800)
}

const createBurst = (x: number, y: number) => {
  const container = document.getElementById('furry-cursor-container')
  if (!container) return
  
  const burst = document.createElement('div')
  burst.className = 'cursor-click-burst'
  burst.style.left = x + 'px'
  burst.style.top = y + 'px'
  burst.textContent = '💖'
  
  container.appendChild(burst)
  
  setTimeout(() => burst.remove(), 600)
}

const handleMouseMove = (event: MouseEvent) => {
  lastCursorX = event.clientX
  lastCursorY = event.clientY
  
  if (!cursorTimer) {
    cursorTimer = window.setTimeout(() => {
      createCursorParticle(event.clientX, event.clientY)
      cursorTimer = null
    }, 30)
  }
}

const handleClick = (event: MouseEvent) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => createBurst(event.clientX, event.clientY), i * 60)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  konamiCode.value.push(event.code)
  
  if (konamiCode.value.length > 10) {
    konamiCode.value.shift()
  }
  
  if (konamiCode.value.join(',') === KONAMI_SEQUENCE.join(',')) {
    triggerEasterEgg()
    konamiCode.value = []
  }
}

const triggerEasterEgg = () => {
  easterEggActive.value = true
  document.body.style.animation = 'rainbow-bg 3s ease'
  
  setTimeout(() => {
    easterEggActive.value = false
    document.body.style.animation = ''
  }, 3000)
}

const detectTimeTheme = () => {
  const hour = new Date().getHours()
  let theme = 'summer'
  
  if (hour >= 5 && hour < 9) {
    theme = 'sunset'
  } else if (hour >= 9 && hour < 17) {
    theme = 'summer'
  } else if (hour >= 17 && hour < 20) {
    theme = 'sunset'
  } else {
    theme = 'night'
  }
  
  document.documentElement.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter', 'theme-sunset', 'theme-night')
  document.documentElement.classList.add(`theme-${theme}`)
}

const setRandomFurryLogo = () => {
  const icon = furryIcons[Math.floor(Math.random() * furryIcons.length)]
  document.documentElement.style.setProperty('--furry-icon', `"${icon}"`)
}

const initCursorContainer = () => {
  if (!document.getElementById('furry-cursor-container')) {
    const el = document.createElement('div')
    el.id = 'furry-cursor-container'
    el.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 99999;'
    document.body.appendChild(el)
  }
}

onMounted(() => {
  nextTick(() => {
    initCursorContainer()
    setRandomFurryLogo()
    detectTimeTheme()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('keydown', handleKeydown)
    
    const themeInterval = setInterval(detectTimeTheme, 60000)
    const logoInterval = setInterval(setRandomFurryLogo, 30000)
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKeydown)
      clearInterval(themeInterval)
      clearInterval(logoInterval)
    })
  })
})
</script>

<style>
.konami-celebration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  overflow: hidden;
}

.celebration-paw {
  position: absolute;
  font-size: 3rem;
  animation: celebration-burst 2s ease-out forwards;
}

@keyframes celebration-burst {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: 
      translate(
        calc(-50% + var(--tx, 0px)), 
        calc(-50% + var(--ty, 0px))
      ) 
      scale(1) 
      rotate(720deg);
    opacity: 0;
  }
}

@keyframes rainbow-bg {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
</style>
