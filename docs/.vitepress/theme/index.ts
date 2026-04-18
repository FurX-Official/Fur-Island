import Theme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import type { App } from 'vue'
import ServerStatus from './components/ServerStatus.vue'
import BackToTop from './components/BackToTop.vue'
import ConnectGuide from './components/ConnectGuide.vue'
import './styles/index.scss'

enableDarkModeTransition()

export default {
  ...Theme,
  enhanceApp({ app, router }: { app: App; router: any }) {
    app.component('ServerStatus', ServerStatus)
    app.component('BackToTop', BackToTop)
    app.component('ConnectGuide', ConnectGuide)

    if (typeof window !== 'undefined') {
      onMounted(() => {
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

function enableDarkModeTransition() {
  if (typeof window === 'undefined') return

  const switchBtn = document.querySelector('.VPSwitchAppearance')
  if (!switchBtn) {
    setTimeout(enableDarkModeTransition, 500)
    return
  }

  switchBtn.addEventListener('click', () => {
    if (!document.startViewTransition) return
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
      return new Promise<void>(resolve => requestAnimationFrame(resolve))
    })
  }, true)
}
