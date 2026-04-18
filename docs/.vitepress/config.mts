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
      { text: '友情链接', link: '/friends' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'Runtime 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FurX-Official/Fur-Island/' },
      { icon: 'qq', link: 'https://qm.qq.com/q/RLnf8Z7vmq' },
      { icon: 'discord', link: 'https://discord.gg/RLnf8Z7vmq' }
    ]
  }
})
