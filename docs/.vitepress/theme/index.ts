import Theme from 'vitepress/theme'
import ServerStatus from './components/ServerStatus.vue'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('ServerStatus', ServerStatus)
  }
}
