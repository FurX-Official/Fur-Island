<script setup lang="ts">
import { siteContent } from '../config/content'

const members = siteContent.team

const isImageUrl = (str: string) => {
  return str.startsWith('http://') || str.startsWith('https://')
}
</script>

<template>
  <div class="team-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">👥</span>
        团队介绍
      </h2>
      <p class="guide-subtitle">感谢每一位为服务器付出的小伙伴</p>
    </div>

    <div class="team-grid">
      <div
        v-for="(member, index) in members"
        :key="index"
        class="team-card"
        :style="`--member-color: ${member.color}`"
      >
        <div class="card-decoration"></div>

        <div class="member-avatar">
          <img v-if="isImageUrl(member.avatar)" :src="member.avatar" :alt="member.name">
          <span v-else>{{ member.avatar }}</span>
        </div>

        <h3 class="member-name">{{ member.name }}</h3>
        <div class="member-role">{{ member.role }}</div>

        <p class="member-bio">{{ member.bio }}</p>

        <div class="member-links">
          <a
            v-for="(link, platform) in member.links"
            :key="platform"
            :href="link"
            class="member-link"
            target="_blank"
          >
            {{ platform.toUpperCase() }}
          </a>
        </div>
      </div>
    </div>

    <div class="join-team-card">
      <span class="join-icon">💫</span>
      <div class="join-content">
        <h4>想要加入我们？</h4>
        <p>服务器始终欢迎有热情、有能力的玩家加入管理团队！<br>如果你擅长建筑、运维、开发或社区管理，欢迎联系我们。</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-section {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.team-card {
  position: relative;
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 18px;
  padding: 32px 24px 24px;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--fur-shadow-large);
    border-color: var(--member-color);

    .card-decoration {
      height: 50%;
      opacity: 0.1;
    }
  }

  .card-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--member-color);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .member-avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto 16px;
    background: linear-gradient(135deg, var(--member-color), transparent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .member-name {
    margin: 0 0 6px 0;
    font-size: 18px;
    font-weight: 700;
  }

  .member-role {
    display: inline-block;
    padding: 4px 12px;
    background: var(--member-color);
    color: white;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .member-bio {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: var(--fur-text-secondary);
    line-height: 1.6;
  }

  .member-links {
    display: flex;
    justify-content: center;
    gap: 8px;

    .member-link {
      padding: 6px 14px;
      background: var(--fur-bg-soft);
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      color: var(--member-color);
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        background: var(--member-color);
        color: white;
      }
    }
  }
}

.join-team-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 32px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(236, 72, 153, 0.05) 100%
  );
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;

  .join-icon {
    font-size: 48px;
    flex-shrink: 0;
  }

  .join-content {
    h4 {
      margin: 0 0 8px 0;
      font-size: 18px;
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

@media (max-width: 640px) {
  .join-team-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
