import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls:true,
  title: "Fur Island",
  description: "与毛毛一起共绘方块世界！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🗺️ 服务器地图', link: '/map' },
      {
        text: '📚 游戏指南',
        items: [
          { text: '🔑 登录教程', link: '/guides/login/' },
          { text: '🏘️ 领地教程', link: '/guides/residence/' }
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
