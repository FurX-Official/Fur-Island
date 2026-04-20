<script setup lang="ts">
import { ref } from 'vue'

const tiers = ref([
  {
    name: '奶茶赞助',
    price: '¥15',
    color: '#8b5cf6',
    features: [
      '❤️ 感谢您的心意！',
      '专属感谢气泡',
      '赞助者称号 7 天'
    ]
  },
  {
    name: '咖啡赞助',
    price: '¥30',
    color: '#3b82f6',
    popular: true,
    features: [
      '❤️ 感谢您的大力支持！',
      '专属感谢气泡',
      '赞助者称号 30 天',
      '领地创建数量 +1'
    ]
  },
  {
    name: '大餐赞助',
    price: '¥68',
    color: '#10b981',
    features: [
      '❤️ 非常感谢您的厚爱！',
      '专属感谢气泡',
      '赞助者称号 永久',
      '领地创建数量 +3',
      '定制专属头衔'
    ]
  }
])

const sponsors = ref([
  { name: '某某玩家', amount: '¥68', avatar: '🧑‍💻' },
  { name: '某某玩家', amount: '¥30', avatar: '🐱' },
  { name: '某某玩家', amount: '¥30', avatar: '🐶' },
  { name: '某某玩家', amount: '¥15', avatar: '🦊' }
])
</script>

<template>
  <div class="support-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">💝</span>
        支持我们
      </h2>
      <p class="guide-subtitle">您的每一份支持，都是服务器前进的动力</p>
    </div>

    <div class="tiers-grid">
      <div
        v-for="(tier, index) in tiers"
        :key="index"
        class="tier-card"
        :style="`--tier-color: ${tier.color}`"
        :class="{ popular: tier.popular }"
      >
        <div v-if="tier.popular" class="popular-badge">
          🔥 推荐
        </div>

        <h3 class="tier-name">{{ tier.name }}</h3>
        <div class="tier-price">{{ tier.price }}</div>

        <ul class="tier-features">
          <li v-for="(feature, idx) in tier.features" :key="idx">
            {{ feature }}
          </li>
        </ul>

        <button class="tier-btn">
          支持此档位
        </button>
      </div>
    </div>

    <div class="qr-section">
      <div class="qr-card">
        <div class="qr-placeholder">
          📱
        </div>
        <p class="qr-desc">扫码即可赞助</p>
        <p class="qr-note">赞助后请联系管理员发放奖励</p>
      </div>
    </div>

    <div class="sponsors-section">
      <h3 class="section-title">🏆 感谢以下支持者</h3>
      <div class="sponsors-grid">
        <div
          v-for="(sponsor, index) in sponsors"
          :key="index"
          class="sponsor-card"
        >
          <span class="sponsor-avatar">{{ sponsor.avatar }}</span>
          <span class="sponsor-name">{{ sponsor.name }}</span>
          <span class="sponsor-amount">{{ sponsor.amount }}</span>
        </div>
      </div>
    </div>

    <div class="notice-card">
      <span class="notice-icon">💡</span>
      <div class="notice-content">
        <h4>温馨提示</h4>
        <p>赞助完全自愿，所有赞助都将用于服务器的维护和升级。<br>赞助后请联系管理员，我们会尽快为您发放奖励！</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.support-section {
  padding: 32px 0;
  max-width: 1000px;
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

.tiers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.tier-card {
  position: relative;
  background: var(--fur-bg-card);
  border: 2px solid var(--fur-border);
  border-radius: 18px;
  padding: 32px 24px 24px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--fur-shadow-large);
  }

  &.popular {
    border-color: var(--tier-color);
    transform: scale(1.05);

    .tier-btn {
      background: linear-gradient(135deg, var(--tier-color), var(--fur-primary));
    }
  }

  .popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 16px;
    background: var(--fur-gradient-primary);
    color: white;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
  }

  .tier-name {
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--tier-color);
  }

  .tier-price {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--fur-text);
  }

  .tier-features {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;

    li {
      padding: 8px 0;
      font-size: 13px;
      color: var(--fur-text-secondary);

      &:not(:last-child) {
        border-bottom: 1px solid var(--fur-border-light);
      }
    }
  }

  .tier-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: var(--fur-bg-soft);
    color: var(--tier-color);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}

.qr-section {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;

  .qr-card {
    background: var(--fur-bg-card);
    border: 1px solid var(--fur-border);
    border-radius: 16px;
    padding: 32px 48px;
    text-align: center;

    .qr-placeholder {
      width: 180px;
      height: 180px;
      background: var(--fur-bg-soft);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      margin-bottom: 16px;
    }

    .qr-desc {
      margin: 0 0 6px 0;
      font-size: 15px;
      font-weight: 600;
    }

    .qr-note {
      margin: 0;
      font-size: 13px;
      color: var(--fur-text-secondary);
    }
  }
}

.section-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 48px;
}

.sponsor-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  padding: 14px 18px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--fur-shadow-card);
  }

  .sponsor-avatar {
    font-size: 28px;
  }

  .sponsor-name {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
  }

  .sponsor-amount {
    font-size: 13px;
    color: var(--fur-primary);
    font-weight: 700;
  }
}

.notice-card {
  display: flex;
  gap: 16px;
  padding: 24px 28px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(236, 72, 153, 0.05) 100%
  );
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;

  .notice-icon {
    font-size: 32px;
    flex-shrink: 0;
  }

  .notice-content {
    h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 700;
      color: #8b5cf6;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--fur-text-secondary);
      line-height: 1.7;
    }
  }
}

@media (max-width: 768px) {
  .tiers-grid {
    grid-template-columns: 1fr;

    .tier-card.popular {
      transform: none;
    }
  }
}
</style>
