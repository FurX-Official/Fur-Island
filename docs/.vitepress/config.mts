import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "Fur Island",
  description: "与毛毛一起共绘方块世界！",
  lang: 'zh-CN',
  base: '/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/pics/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/pics/logo.png' }],
    ['meta', { name: 'theme-color', content: '#e67e22' }],
    ['meta', { property: 'og:title', content: 'Fur Island - 毛毛岛服务器' }],
    ['meta', { property: 'og:description', content: '与毛毛一起共绘方块世界！' }],
    ['meta', { property: 'og:site_name', content: 'Fur Island' }],
    ['meta', { property: 'og:url', content: 'https://fur-island.asia' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://fur-island.asia/pics/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://fur-island.asia/pics/logo.png' }],
    ['meta', { name: 'twitter:title', content: 'Fur Island - 毛毛岛服务器' }],
    ['meta', { name: 'twitter:description', content: '与毛毛一起共绘方块世界！' }],
    
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'canonical', href: 'https://fur-island.asia' }],
    
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
  ],

  sitemap: {
    hostname: 'https://fur-island.asia'
  },

  vite: {},

  buildEnd: async ({ outDir }) => {
    const publicDir = path.resolve(__dirname, '../public')
    const filesToCopy = ['_headers', '_redirects', 'robots.txt', 'manifest.webmanifest']
    
    filesToCopy.forEach(file => {
      const src = path.join(publicDir, file)
      const dest = path.join(outDir, file)
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
        console.log(`✓ Copied ${file} to output`)
      }
    })
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🗺️ 服务器地图', link: '/map' },
      {
        text: '📚 游戏指南',
        items: [
          { text: '🔑 登录教程', link: '/guides/login/' },
          { text: '🏘️ 领地教程', link: '/guides/residence/' },
          { text: '📢 举报教程', link: '/guides/report/' }
        ]
      },
      {
        text: '🛠️ 实用工具',
        items: [
          { text: '🗺️ 坐标转换', link: '/tools/coord' },
          { text: '📊 经验计算', link: '/tools/exp' },
          { text: '🆔 UUID 转换器', link: '/tools/uuid' },
          { text: '⏰ 游戏时间', link: '/tools/time' },
          { text: '💎 附魔大全', link: '/tools/enchant' },
          { text: '🧪 药水酿造', link: '/tools/potion' },
          { text: '🤝 村民交易', link: '/tools/villager' },
          { text: '🔌 端口检测', link: '/tools/port' }
        ]
      },
      {
        text: '📖 关于服务器',
        items: [
          { text: '📝 更新日志', link: '/changelog' },
          { text: '❓ 常见问题', link: '/faq' },
          { text: '📜 服务器规则', link: '/rules' },
          { text: '👥 团队介绍', link: '/team' },
          { text: '💝 支持我们', link: '/support' },
          { text: '🔗 友情链接', link: '/friends' }
        ]
      }
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
