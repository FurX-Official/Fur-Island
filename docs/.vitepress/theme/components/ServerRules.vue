<script setup lang="ts">
import { siteContent } from '../config/content'

const rules = siteContent.rules
</script>

<template>
  <div class="server-rules">
    <div class="component-header">
      <span class="header-icon">📜</span>
      <span class="header-text">服务器规则</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">共同维护和谐友好的游戏环境</p>

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
  </div>
</template>

<style scoped lang="scss">
.server-rules {
  max-width: 1100px;
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
  font-weight: 600;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 36px;
}

.rule-card {
  padding: 28px 24px 24px;
  border: 3px solid var(--fur-border);
  border-radius: 20px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    border-color: var(--rule-color);
  }

  .rule-icon {
    font-size: 44px;
    margin-bottom: 14px;
  }

  .rule-category {
    margin: 0 0 20px 0;
    font-size: 19px;
    font-weight: 900;
    color: var(--rule-color);
  }

  .rule-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      gap: 10px;
      padding: 10px 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.6;
      color: var(--fur-text-secondary);

      &:not(:last-child) {
        border-bottom: 2px solid var(--fur-border);
      }

      .rule-dot {
        width: 8px;
        height: 8px;
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
    gap: 16px;
    padding: 24px 28px;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.12) 0%,
      rgba(139, 92, 246, 0.06) 100%
    );
    border: 3px solid rgba(59, 130, 246, 0.35);
    border-radius: 20px;

    .notice-icon {
      font-size: 28px;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--fur-text-secondary);
      line-height: 1.6;
    }
  }
}

@media (max-width: 768px) {
  .component-header {
    padding: 20px 24px;

    .header-icon {
      font-size: 32px;
    }

    .header-text {
      font-size: 22px;
    }
  }

  .component-content {
    padding: 24px 20px;
  }

  .rules-grid {
    grid-template-columns: 1fr;
  }

  .rule-notice {
    flex-direction: column;
    text-align: center;
  }
}
</style>
