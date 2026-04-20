import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls:true,
  title: "Fur Island",
  description: "与毛毛一起共绘方块世界！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '游戏指南',
        items: [
          { text: '登录教程', link: '/guides/login/' },
          { text: '领地教程', link: '/guides/residence/' }
        ]
      },
      { text: '更新日志', link: '/changelog' },
      { text: '常见问题', link: '/faq' },
      { text: '服务器规则', link: '/rules' },
      { text: '支持我们', link: '/support' },
      { text: '友情链接', link: '/friends' }
    ],

    search: {
      provider: 'local'
    },

    sidebar: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FurX-Official/Fur-Island/' },
      { icon: 'qq', link: 'https://qm.qq.com/q/RLnf8Z7vmq' },
      { icon: 'discord', link: 'https://discord.gg/RLnf8Z7vmq' }
    ]
  }
})
