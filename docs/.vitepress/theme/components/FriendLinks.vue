<script setup lang="ts">
import { ref } from 'vue'

interface FriendLink {
  name: string
  desc: string
  avatar: string
  link: string
  badge?: string
}

const friends = ref<FriendLink[]>([
  {
    name: '暖绒星港',
    desc: '与毛毛一起共绘方块世界',
    avatar: '🏝️',
    link: 'https://fur-island.asia',
    badge: '本站'
  },
  {
    name: 'Minecraft 中文论坛',
    desc: '国内最大的 Minecraft 社区',
    avatar: '⛏️',
    link: 'https://www.mcbbs.net'
  },
])
</script>

<template>
  <div class="friends-section">
    <div class="component-header">
      <span class="header-icon">🤝</span>
      <span class="header-text">友情链接</span>
    </div>

    <div class="component-content">
      <p class="friends-subtitle">感谢每一位志同道合的伙伴，共同打造更好的社区</p>

    <div class="friends-grid">
      <a
        v-for="(friend, index) in friends"
        :key="index"
        class="friend-card"
        :href="friend.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-inner">
          <div class="avatar-badge">
            <span class="friend-avatar">{{ friend.avatar }}</span>
            <div v-if="friend.badge" class="friend-badge">{{ friend.badge }}</div>
          </div>

          <div class="friend-info">
            <h3 class="friend-name">{{ friend.name }}</h3>
            <p class="friend-desc">{{ friend.desc }}</p>
          </div>

          <div class="link-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </div>
      </a>
    </div>

    <div class="join-notice">
      <div class="notice-content">
        <span class="notice-icon">💌</span>
        <p>想要申请友情链接？欢迎加入我们的 QQ 群联系管理员，本站域名需 PR ≥ 2 且内容健康正向</p>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.friends-section {
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

.friends-subtitle {
  font-size: 15px;
  color: var(--fur-text-secondary);
  margin: 0 0 32px 0;
  text-align: center;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.friend-card {
  display: block;
  text-decoration: none;
  background: var(--fur-bg-card);
  border: 3px solid var(--fur-border);
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #3b82f6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.25);
    border-color: var(--fur-primary);

    &::before {
      opacity: 1;
    }

    .link-arrow {
      transform: translateX(4px);
      color: var(--fur-primary);
    }
  }

  :deep(.dark) & {
    background: var(--fur-bg-card);
  }
}

.card-inner {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar-badge {
  position: relative;
  flex-shrink: 0;
}

.friend-avatar {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(var(--fur-primary-rgb), 0.15) 0%, rgba(var(--fur-primary-rgb), 0.05) 100%);
  border-radius: 14px;
  font-size: 26px;
  border: 1px solid rgba(var(--fur-primary-rgb), 0.1);
}

.friend-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 10px;
  padding: 2px 8px;
  background: var(--fur-gradient-primary);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(var(--fur-primary-rgb), 0.3);
}

.friend-info {
  flex: 1;
  min-width: 0;

  .friend-name {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--fur-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .friend-desc {
    margin: 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.link-arrow {
  color: var(--fur-text-muted);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.join-notice {
  background: linear-gradient(135deg, rgba(var(--fur-primary-rgb), 0.08) 0%, rgba(var(--fur-primary-rgb), 0.03) 100%);
  border: 1px solid rgba(var(--fur-primary-rgb), 0.15);
  border-radius: 16px;
  padding: 20px 24px;

  .notice-content {
    display: flex;
    align-items: center;
    gap: 14px;

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

@media (max-width: 640px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }

  .friends-header {
    .friends-title {
      font-size: 26px;
    }
  }

  .join-notice {
    .notice-content {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
