/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import McServerStatus from './components/McServerStatus.vue'
import FurryTimeline from './components/FurryTimeline.vue'
import FurrySponsors from './components/FurrySponsors.vue'
import FurryGlobalEnhance from './components/FurryGlobalEnhance.vue'
import { h } from 'vue'
import './style/index.scss'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('McServerStatus', McServerStatus)
    app.component('FurryTimeline', FurryTimeline)
    app.component('FurrySponsors', FurrySponsors)
  },

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(FurryGlobalEnhance)
    })
  }

} as Theme