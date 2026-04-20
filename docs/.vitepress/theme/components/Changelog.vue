<script setup lang="ts">
import { ref } from 'vue'

const changelogs = ref([
  {
    date: '2026-04-18',
    version: 'v1.2.0',
    type: 'feature',
    title: '领地保护系统上线',
    items: [
      '✅ 新增 Residence 领地保护插件',
      '✅ 支持玩家自主创建和管理领地',
      '✅ 细粒度权限控制系统',
      '✅ 详细的使用教程文档'
    ]
  },
  {
    date: '2026-04-15',
    version: 'v1.1.0',
    type: 'update',
    title: '双验证系统优化',
    items: [
      '🔄 正版验证 + 皮肤站双验证系统',
      '✅ 皮肤站用户无需注册直接进入',
      '✅ Limbo 等候大厅优化',
      '🔧 修复部分玩家登录异常问题'
    ]
  },
  {
    date: '2026-04-10',
    version: 'v1.0.0',
    type: 'release',
    title: '服务器正式开服！',
    items: [
      '🎉 服务器正式对外开放！',
      '✅ Java 版与基岩版互通',
      '✅ 生电友好，允许红石机械',
      '✅ 自由 PVP 玩法',
      '✅ 平衡的作弊检测机制'
    ]
  }
])

const typeColors: Record<string, string> = {
  feature: '#8b5cf6',
  update: '#3b82f6',
  fix: '#ef4444',
  release: '#10b981'
}

const typeLabels: Record<string, string> = {
  feature: '新功能',
  update: '优化',
  fix: '修复',
  release: '发布'
}
</script>

<template>
  <div class="changelog-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">📜</span>
        更新日志
      </h2>
      <p class="guide-subtitle">记录服务器的每一步成长</p>
    </div>

    <div class="timeline">
      <div
        v-for="(log, index) in changelogs"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-dot" :style="{ backgroundColor: typeColors[log.type] }"></div>

        <div class="timeline-content">
          <div class="log-header">
            <div class="log-badge" :style="{ backgroundColor: typeColors[log.type] }">
              {{ typeLabels[log.type] }}
            </div>
            <span class="log-version">{{ log.version }}</span>
            <span class="log-date">{{ log.date }}</span>
          </div>

          <h3 class="log-title">{{ log.title }}</h3>

          <ul class="log-items">
            <li v-for="(item, idx) in log.items" :key="idx" class="log-item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.changelog-section {
  padding: 32px 0;
  max-width: 800px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 48px;

  .guide-title {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 12px 0;
    background: var(--fur-gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    .title-icon {
      font-size: 36px;
    }
  }

  .guide-subtitle {
    font-size: 15px;
    color: var(--fur-text-secondary);
    margin: 0;
  }
}

.timeline {
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--fur-border);
    border-radius: 1px;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 4px solid var(--fur-bg);
  z-index: 1;
}

.timeline-content {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: var(--fur-shadow-card);
  }
}

.log-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;

  .log-badge {
    padding: 4px 12px;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }

  .log-version {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: var(--fur-primary);
  }

  .log-date {
    font-size: 13px;
    color: var(--fur-text-secondary);
  }
}

.log-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.log-items {
  margin: 0;
  padding-left: 0;
  list-style: none;

  .log-item {
    padding: 6px 0;
    font-size: 14px;
    color: var(--fur-text-secondary);

    &:not(:last-child) {
      border-bottom: 1px solid var(--fur-border-light);
    }
  }
}
</style>
