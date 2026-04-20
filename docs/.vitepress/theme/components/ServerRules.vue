<script setup lang="ts">
import { siteContent } from '../config/content'

const rules = siteContent.rules
</script>

<template>
  <div class="rules-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">📜</span>
        服务器规则
      </h2>
      <p class="guide-subtitle">共同维护和谐友好的游戏环境</p>
    </div>

    <div class="rules-grid">
      <div
        v-for="(category, index) in rules"
        :key="index"
        class="rule-card"
        :style="`--rule-color: ${category.color}`"
      >
        <div class="rule-icon">{{ category.icon }}</div>
        <h3 class="rule-category">{{ category.title }}</h3>

        <ul class="rule-list">
          <li v-for="(rule, idx) in category.rules" :key="idx">
            <span class="rule-dot"></span>
            {{ rule }}
          </li>
        </ul>
      </div>
    </div>

    <div class="rules-footer">
      <div class="rule-notice">
        <span class="notice-icon">💡</span>
        <p>如有疑问或举报，请联系管理员处理。规则最终解释权归服务器管理团队所有。</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rules-section {
  padding: 32px 0;
  max-width: 1100px;
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

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.rule-card {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 16px;
  padding: 28px 24px 24px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--fur-shadow-card);
    border-color: var(--rule-color);
  }

  .rule-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .rule-category {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--rule-color);
  }

  .rule-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      gap: 10px;
      padding: 8px 0;
      font-size: 13px;
      line-height: 1.6;
      color: var(--fur-text-secondary);

      &:not(:last-child) {
        border-bottom: 1px solid var(--fur-border-light);
      }

      .rule-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--rule-color);
        margin-top: 6px;
        flex-shrink: 0;
      }
    }
  }
}

.rules-footer {
  .rule-notice {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.1) 0%,
      rgba(139, 92, 246, 0.05) 100%
    );
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 12px;

    .notice-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
      line-height: 1.6;
    }
  }
}
</style>
