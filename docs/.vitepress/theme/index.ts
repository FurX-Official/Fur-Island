import Theme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import type { App } from 'vue'
import ServerStatus from './components/ServerStatus.vue'
import BackToTop from './components/BackToTop.vue'
import CopyIPButton from './components/CopyIPButton.vue'
import ConnectGuide from './components/ConnectGuide.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app, router }: { app: App; router: any }) {
    app.component('ServerStatus', ServerStatus)
    app.component('BackToTop', BackToTop)
    app.component('CopyIPButton', CopyIPButton)
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

  let trailX = 0
  let trailY = 0
  let mouseX = 0
  let mouseY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15
    trailY += (mouseY - trailY) * 0.15
    requestAnimationFrame(animateTrail)
  }
  animateTrail()
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
