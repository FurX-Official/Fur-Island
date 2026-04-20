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
import StarBackground from './components/StarBackground.vue'
import TypewriterText from './components/TypewriterText.vue'
import UuidConverter from './components/UuidConverter.vue'
import GameTimeCalc from './components/GameTimeCalc.vue'
import PortChecker from './components/PortChecker.vue'
import AccordionPanel from './components/AccordionPanel.vue'
import CoordCalculator from './components/CoordCalculator.vue'
import ExpCalculator from './components/ExpCalculator.vue'
import EnchantList from './components/EnchantList.vue'
import PotionBrewing from './components/PotionBrewing.vue'
import VillagerTrades from './components/VillagerTrades.vue'
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
    app.component('StarBackground', StarBackground)
    app.component('TypewriterText', TypewriterText)
    app.component('UuidConverter', UuidConverter)
    app.component('GameTimeCalc', GameTimeCalc)
    app.component('PortChecker', PortChecker)
    app.component('AccordionPanel', AccordionPanel)
    app.component('CoordCalculator', CoordCalculator)
    app.component('ExpCalculator', ExpCalculator)
    app.component('EnchantList', EnchantList)
    app.component('PotionBrewing', PotionBrewing)
    app.component('VillagerTrades', VillagerTrades)

    if (typeof window !== 'undefined') {
      onMounted(() => {
        playClickSound()
        enableDarkModeTransition()
        enableImageLightbox(router)
        enablePageLoading()
        enableNavbarGlass()
        enableProgressBar(router)
        enableWelcomePopup()
        enableClickFireworks()
        enableAutoDarkMode()
        enablePWAInstallPrompt()
        enableButtonRipple()
        enableReadingProgress()
        enableAutoDarkModeByTime()
        enableFontSizeControl()
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

function enableClickFireworks() {
  if (typeof window === 'undefined') return

  const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4']

  document.addEventListener('click', (e) => {
    const particles = 15
    const x = e.clientX
    const y = e.clientY

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div')
      const angle = (Math.PI * 2 * i) / particles
      const velocity = 50 + Math.random() * 50
      const size = 4 + Math.random() * 4
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        box-shadow: 0 0 6px ${color};
      `

      document.body.appendChild(particle)

      const dx = Math.cos(angle) * velocity
      const dy = Math.sin(angle) * velocity
      let opacity = 1
      let posX = 0
      let posY = 0

      const animate = () => {
        posX += dx * 0.08
        posY += dy * 0.08 + 2
        opacity -= 0.04

        particle.style.transform = `translate(${posX}px, ${posY}px)`
        particle.style.opacity = String(opacity)

        if (opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          particle.remove()
        }
      }

      requestAnimationFrame(animate)
    }
  })
}

function enableAutoDarkMode() {
  if (typeof window === 'undefined') return

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const updateTheme = (isDark: boolean) => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  if (!localStorage.getItem('vitepress-theme-appearance')) {
    updateTheme(darkModeMediaQuery.matches)
  }

  darkModeMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('vitepress-theme-appearance')) {
      updateTheme(e.matches)
    }
  })
}

function uuidToOffline(uuid: string): string {
  const hex = uuid.replace(/-/g, '')
  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  bytes[8] = bytes[8] & 0x7f
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += bytes[i].toString(16).padStart(2, '0')
  }
  return result.substr(0, 8) + '-' + result.substr(8, 4) + '-' + result.substr(12, 4) + '-' + result.substr(16, 4) + '-' + result.substr(20)
}

function nameToOfflineUuid(name: string): string {
  function md5(str: string): string {
    function rotateLeft(n: number, s: number): number {
      return (n << s) | (n >>> (32 - s))
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
      return rotateLeft(a + q + x + t, s) + b
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn(b ^ c ^ d, a, b, x, s, t)
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn(c ^ (b | (~d)), a, b, x, s, t)
    }

    const utf8 = unescape(encodeURIComponent(str))
    const words: number[] = []
    for (let i = 0; i < utf8.length; i++) {
      words[i >>> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8)
    }
    const oldLen = utf8.length * 8
    words[oldLen >>> 5] |= 0x80 << ((oldLen) % 32)
    words[(((oldLen + 64) >>> 9) << 4) + 14] = oldLen

    let a = 1732584193
    let b = -271733879
    let c = -1732584194
    let d = 271733878

    for (let i = 0; i < words.length; i += 16) {
      const olda = a
      const oldb = b
      const oldc = c
      const oldd = d

      a = ff(a, b, c, d, words[i + 0], 7, -680876936)
      d = ff(d, a, b, c, words[i + 1], 12, -389564586)
      c = ff(c, d, a, b, words[i + 2], 17, 606105819)
      b = ff(b, c, d, a, words[i + 3], 22, -1044525330)
      a = ff(a, b, c, d, words[i + 4], 7, -176418897)
      d = ff(d, a, b, c, words[i + 5], 12, 1200080426)
      c = ff(c, d, a, b, words[i + 6], 17, -1473231341)
      b = ff(b, c, d, a, words[i + 7], 22, -45705983)
      a = ff(a, b, c, d, words[i + 8], 7, 1770035416)
      d = ff(d, a, b, c, words[i + 9], 12, -1958414417)
      c = ff(c, d, a, b, words[i + 10], 17, -42063)
      b = ff(b, c, d, a, words[i + 11], 22, -1990404162)
      a = ff(a, b, c, d, words[i + 12], 7, 1804603682)
      d = ff(d, a, b, c, words[i + 13], 12, -40341101)
      c = ff(c, d, a, b, words[i + 14], 17, -1502002290)
      b = ff(b, c, d, a, words[i + 15], 22, 1236535329)

      a = gg(a, b, c, d, words[i + 1], 5, -165796510)
      d = gg(d, a, b, c, words[i + 6], 9, -1069501632)
      c = gg(c, d, a, b, words[i + 11], 14, 643717713)
      b = gg(b, c, d, a, words[i + 0], 20, -373897302)
      a = gg(a, b, c, d, words[i + 5], 5, -701558691)
      d = gg(d, a, b, c, words[i + 10], 9, 38016083)
      c = gg(c, d, a, b, words[i + 15], 14, -660478335)
      b = gg(b, c, d, a, words[i + 4], 20, -405537848)
      a = gg(a, b, c, d, words[i + 9], 5, 568446438)
      d = gg(d, a, b, c, words[i + 14], 9, -1019803690)
      c = gg(c, d, a, b, words[i + 3], 14, -187363961)
      b = gg(b, c, d, a, words[i + 8], 20, 1163531501)
      a = gg(a, b, c, d, words[i + 13], 5, -1444681467)
      d = gg(d, a, b, c, words[i + 2], 9, -51403784)
      c = gg(c, d, a, b, words[i + 7], 14, 1735328473)
      b = gg(b, c, d, a, words[i + 12], 20, -1926607734)

      a = hh(a, b, c, d, words[i + 5], 4, -378558)
      d = hh(d, a, b, c, words[i + 8], 11, -2022574463)
      c = hh(c, d, a, b, words[i + 11], 16, 1839030562)
      b = hh(b, c, d, a, words[i + 14], 23, -35309556)
      a = hh(a, b, c, d, words[i + 1], 4, -1530992060)
      d = hh(d, a, b, c, words[i + 4], 11, 1272893353)
      c = hh(c, d, a, b, words[i + 7], 16, -155497632)
      b = hh(b, c, d, a, words[i + 10], 23, -1094730640)
      a = hh(a, b, c, d, words[i + 13], 4, 681279174)
      d = hh(d, a, b, c, words[i + 0], 11, -358537222)
      c = hh(c, d, a, b, words[i + 3], 16, -722521979)
      b = hh(b, c, d, a, words[i + 6], 23, 76029189)
      a = hh(a, b, c, d, words[i + 9], 4, -640364487)
      d = hh(d, a, b, c, words[i + 12], 11, -421815835)
      c = hh(c, d, a, b, words[i + 15], 16, 530742520)
      b = hh(b, c, d, a, words[i + 2], 23, -995338651)

      a = ii(a, b, c, d, words[i + 0], 6, -198630844)
      d = ii(d, a, b, c, words[i + 7], 10, 1126891415)
      c = ii(c, d, a, b, words[i + 14], 15, -1416354905)
      b = ii(b, c, d, a, words[i + 5], 21, -57434055)
      a = ii(a, b, c, d, words[i + 12], 6, 1700485571)
      d = ii(d, a, b, c, words[i + 3], 10, -1894986606)
      c = ii(c, d, a, b, words[i + 10], 15, -1051523)
      b = ii(b, c, d, a, words[i + 1], 21, -2054922799)
      a = ii(a, b, c, d, words[i + 8], 6, 1873313359)
      d = ii(d, a, b, c, words[i + 15], 10, -30611744)
      c = ii(c, d, a, b, words[i + 6], 15, -1560198380)
      b = ii(b, c, d, a, words[i + 13], 21, 1309151649)
      a = ii(a, b, c, d, words[i + 4], 6, -145523070)
      d = ii(d, a, b, c, words[i + 11], 10, -1120210379)
      c = ii(c, d, a, b, words[i + 2], 15, 718787259)
      b = ii(b, c, d, a, words[i + 9], 21, -343485551)

      a = a + olda | 0
      b = b + oldb | 0
      c = c + oldc | 0
      d = d + oldd | 0
    }

    const hex = (n: number) => {
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += ((n >> (i * 8 + 4)) & 15).toString(16) + ((n >> (i * 8)) & 15).toString(16)
      }
      return result
    }

    return hex(a) + hex(b) + hex(c) + hex(d)
  }

  const hash = md5('OfflinePlayer:' + name)
  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hash.substr(i * 2, 2), 16)
  }
  bytes[8] = bytes[8] & 0x7f
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += bytes[i].toString(16).padStart(2, '0')
  }
  return result.substr(0, 8) + '-' + result.substr(8, 4) + '-' + result.substr(12, 4) + '-' + result.substr(16, 4) + '-' + result.substr(20)
}

declare global {
  interface Window {
    deferredPrompt: any
  }
}

function enablePWAInstallPrompt() {
  if (typeof window === 'undefined') return

  let deferredPrompt: any

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e

    setTimeout(() => {
      const popup = document.createElement('div')
      popup.className = 'pwa-install-popup'
      popup.innerHTML = `
        <div class="pwa-install-content">
          <div class="pwa-icon">📱</div>
          <div class="pwa-text">
            <div class="pwa-title">安装到桌面</div>
            <div class="pwa-desc">将网站安装为 App，离线也能访问！</div>
          </div>
          <button class="pwa-install-btn">安装</button>
          <button class="pwa-close-btn">✕</button>
        </div>
      `

      popup.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        z-index: 9999;
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      `

      const style = document.createElement('style')
      style.textContent = `
        .pwa-install-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          background: var(--fur-bg-elevated);
          border-radius: 16px;
          border: 1px solid var(--fur-border-light);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        .pwa-icon { font-size: 32px; }
        .pwa-title { font-weight: 700; margin-bottom: 2px; }
        .pwa-desc { font-size: 13px; color: var(--fur-text-secondary); }
        .pwa-install-btn {
          padding: 8px 16px;
          background: var(--fur-gradient-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .pwa-install-btn:hover { transform: scale(1.05); }
        .pwa-close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          border: none;
          background: none;
          cursor: pointer;
          opacity: 0.5;
          font-size: 14px;
        }
      `
      document.head.appendChild(style)
      document.body.appendChild(popup)

      setTimeout(() => {
        popup.style.transform = 'translateX(-50%) translateY(0)'
        popup.style.opacity = '1'
      }, 100)

      popup.querySelector('.pwa-install-btn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt()
          const { outcome } = await deferredPrompt.userChoice
          console.log('PWA install', outcome)
          deferredPrompt = null
        }
        popup.style.transform = 'translateX(-50%) translateY(100px)'
        popup.style.opacity = '0'
        setTimeout(() => popup.remove(), 300)
      })

      popup.querySelector('.pwa-close-btn')?.addEventListener('click', () => {
        popup.style.transform = 'translateX(-50%) translateY(100px)'
        popup.style.opacity = '0'
        setTimeout(() => popup.remove(), 300)
      })
    }, 5000)
  })
}

function enableButtonRipple() {
  if (typeof window === 'undefined') return

  const createRipple = (e: MouseEvent) => {
    const button = (e.target as HTMLElement).closest('button, .VPLinkCard, .VPButton, .tool-btn, .copy-btn')
    if (!button) return

    const rect = button.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.className = 'ripple'
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'

    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  document.addEventListener('click', createRipple)
}

function enableReadingProgress() {
  if (typeof window === 'undefined') return

  const progressBar = document.createElement('div')
  progressBar.className = 'reading-progress'
  progressBar.style.width = '0%'
  document.body.appendChild(progressBar)

  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    progressBar.style.width = progress + '%'
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
}

function enableAutoDarkModeByTime() {
  if (typeof window === 'undefined') return

  const checkTime = () => {
    if (localStorage.getItem('vitepress-theme-appearance')) return

    const hour = new Date().getHours()
    const isNight = hour < 6 || hour >= 18
    const html = document.documentElement

    if (isNight && !html.classList.contains('dark')) {
      html.classList.add('dark')
    } else if (!isNight && html.classList.contains('dark')) {
      html.classList.remove('dark')
    }
  }

  checkTime()
  setInterval(checkTime, 60000)
}

function enableFontSizeControl() {
  if (typeof window === 'undefined') return

  const container = document.createElement('div')
  container.className = 'font-size-control'
  container.innerHTML = `
    <button class="font-increase" title="放大字体">A+</button>
    <button class="font-reset" title="重置字体">A</button>
    <button class="font-decrease" title="缩小字体">A-</button>
  `

  document.body.appendChild(container)

  let currentScale = parseFloat(localStorage.getItem('fontScale') || '1')
  const applyScale = () => {
    document.documentElement.style.fontSize = (currentScale * 16) + 'px'
    localStorage.setItem('fontScale', String(currentScale))
  }

  applyScale()

  container.querySelector('.font-increase')?.addEventListener('click', () => {
    if (currentScale < 1.5) {
      currentScale += 0.1
      applyScale()
    }
  })

  container.querySelector('.font-decrease')?.addEventListener('click', () => {
    if (currentScale > 0.7) {
      currentScale -= 0.1
      applyScale()
    }
  })

  container.querySelector('.font-reset')?.addEventListener('click', () => {
    currentScale = 1
    applyScale()
  })
}
