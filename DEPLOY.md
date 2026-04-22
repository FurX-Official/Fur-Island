# Cloudflare Pages 部署指南

## 🚀 自动部署（推荐）

### 1. GitHub 仓库连接
1. 登录 Cloudflare Dashboard → Pages
2. 点击 "Create application" → "Pages"
3. 选择 "Connect to Git"
4. 选择你的 GitHub 仓库
5. 点击 "Begin setup"

### 2. 构建设置

| 设置项 | 值 |
|--------|-----|
| Framework preset | `VitePress` |
| Build command | `npm run build` |
| Build output directory | `docs/.vitepress/dist` |

### 3. 环境变量
```
NODE_VERSION=20
```

---

## 🌐 自定义域名配置

### 1. 添加自定义域名
1. Pages 项目 → "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入：`fur-island.asia`
4. 点击 "Continue"
5. Cloudflare 会自动配置 DNS

### 2. 配置 HTTPS
- Cloudflare 会自动颁发 SSL 证书
- 启用 "Always Use HTTPS"
- 启用 "HTTP Strict Transport Security (HSTS)"

---

## 🔧 手动部署（Wrangler CLI）

### 1. 安装 Wrangler
```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare
```bash
wrangler login
```

### 3. 部署
```bash
npm run pages:deploy
```

---

## 📁 已配置的文件

| 文件 | 作用 |
|------|------|
| `docs/public/_headers` | 安全头 + 缓存配置 |
| `docs/public/_redirects` | SPA 路由 + 重定向规则 |
| `docs/public/robots.txt` | 搜索引擎爬虫规则 |
| `docs/public/manifest.webmanifest` | PWA 应用清单 |
| `wrangler.toml` | Wrangler CLI 配置 |
| `.nvmrc` | Node.js 版本指定 |

---

## ✅ 部署后检查

1. ✅ 访问 `https://fur-island.asia` 确认网站正常
2. ✅ 测试各页面路由跳转正常
3. ✅ 确认 CSS/JS 资源加载正确
4. ✅ 检查浏览器控制台无错误
5. ✅ 验证移动端显示正常

---

## 🔄 持续部署

每次推送到 `main` 分支时，Cloudflare Pages 会自动：
1. 安装依赖
2. 运行 `npm run build`
3. 部署到生产环境
4. 生成预览链接用于验证

---

## 📞 问题排查

**构建失败？**
- 检查 Node.js 版本是否为 20
- 确认 package.json 中的 build 命令正确
- 查看构建日志找错误详情

**网站 404？**
- 确认 `docs/public/_redirects` 文件存在
- SPA 路由需要 `/* /index.html 200` 规则
