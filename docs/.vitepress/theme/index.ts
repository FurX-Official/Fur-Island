import Theme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import type { App } from 'vue'
import ServerStatus from './components/ServerStatus.vue'
import BackToTop from './components/BackToTop.vue'
import ConnectGuide from './components/ConnectGuide.vue'
import FriendLinks from './components/FriendLinks.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app, router }: { app: App; router: any }) {
    app.component('ServerStatus', ServerStatus)
    app.component('BackToTop', BackToTop)
    app.component('ConnectGuide', ConnectGuide)
    app.component('FriendLinks', FriendLinks)

    if (typeof window !== 'undefined') {
      onMounted(() => {
        playClickSound()
        enableDarkModeTransition()
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
  if (!document.startViewTransition) return

  let isTransitioning = false

  const observer = new MutationObserver((mutations) => {
    if (isTransitioning) return

    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        isTransitioning = true
        document.startViewTransition(() => {
          return new Promise<void>((resolve) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                resolve()
                setTimeout(() => isTransitioning = false, 500)
              })
            })
          })
        })
        break
      }
    }
  })

  setTimeout(() => {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }, 1000)
}
