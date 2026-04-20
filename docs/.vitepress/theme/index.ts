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
import ParticlesBackground from './components/ParticlesBackground.vue'
import Changelog from './components/Changelog.vue'
import FAQSection from './components/FAQSection.vue'
import SupportUs from './components/SupportUs.vue'
import TeamSection from './components/TeamSection.vue'
import ServerMap from './components/ServerMap.vue'
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
    app.component('ParticlesBackground', ParticlesBackground)
    app.component('Changelog', Changelog)
    app.component('FAQSection', FAQSection)
    app.component('SupportUs', SupportUs)
    app.component('TeamSection', TeamSection)
    app.component('ServerMap', ServerMap)

    if (typeof window !== 'undefined') {
      onMounted(() => {
        playClickSound()
        enableDarkModeTransition()
        enableImageLightbox(router)
        enablePageLoading()
        enableNavbarGlass()
        enableProgressBar(router)
        enableWelcomePopup()
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

function enableImageLightbox(router: any) {
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
      const images = document.querySelectorAll('.step-image img, .lobby-image img, img')
      images.forEach((img) => {
        const imgEl = img as HTMLImageElement
        if (!imgEl.style.cursor || imgEl.style.cursor !== 'zoom-in') {
          imgEl.style.cursor = 'zoom-in'
          imgEl.onclick = () => openLightbox(imgEl.src)
        }
      })
    }, 500)
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox()
  })

  bindImages()

  const originalPush = router.push
  router.push = async (...args: any[]) => {
    const loadingBar = document.createElement('div')
    loadingBar.className = 'page-loading'
    document.body.appendChild(loadingBar)
    await originalPush.apply(router, args)
    setTimeout(() => {
      loadingBar.remove()
      bindImages()
    }, 600)
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

function enableNavbarGlass() {
  if (typeof window === 'undefined') return

  const navbar = document.querySelector('.VPNavBar')

  const updateScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled')
    } else {
      navbar?.classList.remove('scrolled')
    }
  }

  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
}

function enableProgressBar(router: any) {
  if (typeof window === 'undefined') return

  const style = document.createElement('style')
  style.textContent = `
    #nprogress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--fur-gradient-primary);
      z-index: 99999;
      transition: width 0.3s ease, opacity 0.2s ease;
      box-shadow: 0 0 10px var(--fur-primary);
    }
  `
  document.head.appendChild(style)

  const bar = document.createElement('div')
  bar.id = 'nprogress-bar'
  document.body.appendChild(bar)

  const originalPush = router.push
  router.push = async (...args: any[]) => {
    bar.style.opacity = '1'
    bar.style.width = '0%'

    setTimeout(() => bar.style.width = '40%', 10)
    setTimeout(() => bar.style.width = '70%', 150)
    setTimeout(() => bar.style.width = '90%', 300)

    await originalPush.apply(router, args)

    setTimeout(() => {
      bar.style.width = '100%'
      setTimeout(() => {
        bar.style.opacity = '0'
        setTimeout(() => {
          bar.style.width = '0%'
        }, 200)
      }, 100)
    }, 50)
  }
}

function enableWelcomePopup() {
  if (typeof window === 'undefined') return

  const visitKey = 'fur-island-visits'
  const lastVisitKey = 'fur-island-last-visit'

  const visits = parseInt(localStorage.getItem(visitKey) || '0') + 1
  const lastVisit = localStorage.getItem(lastVisitKey)
  const now = Date.now()

  localStorage.setItem(visitKey, String(visits))
  localStorage.setItem(lastVisitKey, String(now))

  if (visits > 1 && lastVisit && (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
    const style = document.createElement('style')
    style.textContent = `
      .welcome-popup {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--fur-bg-card);
        border: 1px solid var(--fur-border);
        border-radius: 16px;
        padding: 20px 24px;
        box-shadow: var(--fur-shadow-large);
        z-index: 9999;
        animation: slideUp 0.5s ease;
        max-width: 300px;
      }
      .welcome-popup h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 700;
        background: var(--fur-gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .welcome-popup p {
        margin: 0 0 12px 0;
        font-size: 13px;
        color: var(--fur-text-secondary);
        line-height: 1.6;
      }
      .welcome-popup-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        border: none;
        background: var(--fur-bg-soft);
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }
      .welcome-popup-close:hover {
        background: var(--fur-primary);
        color: white;
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)

    const popup = document.createElement('div')
    popup.className = 'welcome-popup'
    popup.innerHTML = `
      <button class="welcome-popup-close">×</button>
      <h4>🐾 欢迎回来！</h4>
      <p>这是您第 <strong>${visits}</strong> 次访问<br>服务器又有新变化啦~</p>
    `
    document.body.appendChild(popup)

    popup.querySelector('.welcome-popup-close')?.addEventListener('click', () => {
      popup.style.opacity = '0'
      popup.style.transform = 'translateY(30px)'
      setTimeout(() => popup.remove(), 300)
    })

    setTimeout(() => {
      if (document.body.contains(popup)) {
        popup.style.opacity = '0'
        popup.style.transform = 'translateY(30px)'
        setTimeout(() => popup.remove(), 300)
      }
    }, 8000)
  }
}
