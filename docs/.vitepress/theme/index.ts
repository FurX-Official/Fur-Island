import Theme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import type { App } from 'vue'
import ServerStatus from './components/ServerStatus.vue'
import BackToTop from './components/BackToTop.vue'
import ConnectGuide from './components/ConnectGuide.vue'
import FriendLinks from './components/FriendLinks.vue'
import ServerRules from './components/ServerRules.vue'
import LoginGuide from './components/LoginGuide.vue'
import ResidenceGuide from './components/ResidenceGuide.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app, router }: { app: App; router: any }) {
    app.component('ServerStatus', ServerStatus)
    app.component('BackToTop', BackToTop)
    app.component('ConnectGuide', ConnectGuide)
    app.component('FriendLinks', FriendLinks)
    app.component('ServerRules', ServerRules)
    app.component('LoginGuide', LoginGuide)
    app.component('ResidenceGuide', ResidenceGuide)

    if (typeof window !== 'undefined') {
      onMounted(() => {
        playClickSound()
        enableDarkModeTransition()
        enableImageLightbox()
        enablePageLoading()
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

function enableImageLightbox() {
  if (typeof window === 'undefined') return

  let overlay: HTMLDivElement | null = null

  const createOverlay = () => {
    overlay = document.createElement('div')
    overlay.className = 'global-lightbox-overlay'
    overlay.innerHTML = `
      <div class="global-lightbox-content">
        <button class="global-lightbox-close">✕</button>
        <img class="global-lightbox-image" src="" alt="">
      </div>
    `
    document.body.appendChild(overlay)

    overlay.querySelector('.global-lightbox-close')?.addEventListener('click', closeLightbox)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox()
    })
  }

  const openLightbox = (src: string) => {
    if (!overlay) createOverlay()
    const img = overlay!.querySelector('.global-lightbox-image') as HTMLImageElement
    img!.src = src
    overlay!.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    if (overlay) {
      overlay.style.display = 'none'
      document.body.style.overflow = ''
    }
  }

  const bindImages = () => {
    setTimeout(() => {
      const images = document.querySelectorAll('.VPDoc .content img, .step-image img, .lobby-image img')
      images.forEach((img) => {
        const imgEl = img as HTMLImageElement
        imgEl.style.cursor = 'zoom-in'
        imgEl.onclick = () => openLightbox(imgEl.src)
      })
    }, 300)
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox()
  })

  bindImages()

  const originalPush = router.push
  router.push = async (...args) => {
    const loadingBar = document.createElement('div')
    loadingBar.className = 'page-loading'
    document.body.appendChild(loadingBar)
    await originalPush(...args)
    setTimeout(() => loadingBar.remove(), 600)
    bindImages()
  }
}

function enablePageLoading() {
  const style = document.createElement('style')
  style.textContent = `
    .global-lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 40px;
      animation: fadeIn 0.3s ease;
    }
    .global-lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 85vh;
    }
    .global-lightbox-close {
      position: absolute;
      top: -50px;
      right: 0;
      width: 40px;
      height: 40px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .global-lightbox-close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    .global-lightbox-image {
      max-width: 100%;
      max-height: 85vh;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoomIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `
  document.head.appendChild(style)
}
