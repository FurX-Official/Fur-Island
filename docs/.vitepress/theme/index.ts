/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import McServerStatus from './components/McServerStatus.vue'
import './style/index.scss'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('McServerStatus', McServerStatus)
  }

} as Theme