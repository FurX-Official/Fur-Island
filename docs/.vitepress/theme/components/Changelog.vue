<script setup lang="ts">
import { siteContent } from '../config/content'

const changelogs = siteContent.changelog

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
    <div class="component-header">
      <span class="header-icon">📜</span>
      <span class="header-text">更新日志</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">记录服务器的每一次成长</p>

    <div class="timeline">
      <div
        v-for="(log, index) in changelogs"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-marker" :style="{ background: typeColors[log.type] }">
        </div>

        <div class="timeline-content">
          <div class="timeline-header">
            <div class="log-type-badge" :style="{ background: typeColors[log.type] }">
              {{ typeLabels[log.type] }}
            </div>
            <span class="log-version">{{ log.version }}</span>
            <span class="log-date">{{ log.date }}</span>
          </div>

          <h3 class="log-title">{{ log.title }}</h3>

          <div class="log-items">
            <div v-for="(item, idx) in log.items" :key="idx" class="log-item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.changelog-section {
  max-width: 900px;
  margin: 0 auto;
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    box-shadow: 0 12px 48px rgba(139, 92, 246, 0.25);
  }
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;

  .header-icon {
    font-size: 40px;
  }

  .header-text {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
  }
}

.component-content {
  padding: 32px;
}

.guide-subtitle {
  font-size: 15px;
  color: var(--fur-text-secondary);
  margin: 0 0 32px 0;
  text-align: center;
}

.timeline {
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--fur-border-light);
  }
}

.timeline-item {
  position: relative;
  padding-bottom: 40px;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-marker {
  position: absolute;
  left: -32px;
  top: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--fur-primary);
  border: 3px solid var(--fur-bg-body);
  box-shadow: 0 0 0 2px var(--fur-border-light);
}

.timeline-content {
  background: var(--fur-bg-card);
  border: 3px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px 28px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: var(--fur-primary);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.log-type-badge {
  padding: 4px 10px;
  border-radius: 20px;
  color: white;
  font-size: 11px;
  font-weight: 700;
}

.log-version {
  font-size: 14px;
  font-weight: 700;
  color: var(--fur-text);
}

.log-date {
  font-size: 13px;
  color: var(--fur-text-muted);
  margin-left: auto;
}

.log-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 700;
}

.log-item {
  padding: 6px 0;
  font-size: 14px;
  color: var(--fur-text-secondary);

  &:not(:last-child) {
    border-bottom: 1px solid var(--fur-border-light);
  }
}
</style>
