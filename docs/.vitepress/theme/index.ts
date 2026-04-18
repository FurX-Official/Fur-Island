import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './styles/index.scss'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      const container = document.createElement('div')
      container.id = 'paw-print-container'
      document.body.appendChild(container)

      document.addEventListener('click', (e) => {
        const paw = document.createElement('div')
        paw.className = 'paw-print'
        paw.textContent = '🐾'
        paw.style.left = `${e.clientX}px`
        paw.style.top = `${e.clientY}px`
        container.appendChild(paw)

        setTimeout(() => paw.remove(), 800)
      })
    })
  }
}
