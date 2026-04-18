import Theme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import type { App } from 'vue'
import ServerStatus from './components/ServerStatus.vue'
import BackToTop from './components/BackToTop.vue'
import ConnectGuide from './components/ConnectGuide.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app, router }: { app: App; router: any }) {
    app.component('ServerStatus', ServerStatus)
    app.component('BackToTop', BackToTop)
    app.component('ConnectGuide', ConnectGuide)

    if (typeof window !== 'undefined') {
      onMounted(() => {
        initCustomCursor()
        playClickSound()
      })

      watch(
        () => router.route.path,
        () => {
          nextTick(() => {
            window.scrollTo(0, 0)
          })
        }
      )
    }
  }
}

function initCustomCursor() {
  if (window.innerWidth < 768) return

  const dot = document.createElement('div')
  dot.id = 'custom-dot'
  const ring = document.createElement('div')
  ring.id = 'custom-ring'
  document.body.appendChild(dot)
  document.body.appendChild(ring)

  let dotX = 0, dotY = 0, ringX = 0, ringY = 0, mouseX = 0, mouseY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animate() {
    dotX += (mouseX - dotX) * 0.5
    dotY += (mouseY - dotY) * 0.5
    ringX += (mouseX - ringX) * 0.15
    ringY += (mouseY - ringY) * 0.15

    dot.style.left = dotX + 'px'
    dot.style.top = dotY + 'px'
    ring.style.left = ringX + 'px'
    ring.style.top = ringY + 'px'

    requestAnimationFrame(animate)
  }
  animate()
}

function playClickSound() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
      audio.volume = 0.1
      audio.play().catch(() => {})
    }
  })
}
