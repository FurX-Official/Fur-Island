import Theme from 'vitepress/theme'
import ServerStatus from './components/ServerStatus.vue'
import './styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('ServerStatus', ServerStatus)
  }
}
