import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fur-Island",
  description: "Offcial Website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Fur-Island' },
      { icon: 'qq', link: 'https://qm.qq.com/q/v0oVpJxKla' }
    ]
  }
})
