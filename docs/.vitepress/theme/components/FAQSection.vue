<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    question: '服务器支持哪些版本？',
    answer: '服务器支持 Java 版 1.7.x - 1.21.x 和基岩版。Java 版端口默认，基岩版端口 51650。'
  },
  {
    question: '需要正版才能玩吗？',
    answer: '不需要！服务器支持正版、皮肤站、离线玩家三种登录方式。正版和皮肤站用户无需注册即可直接进入，离线玩家需要在 Limbo 界面完成简单注册。'
  },
  {
    question: '可以使用生电机器吗？',
    answer: '可以！服务器完全支持生电、红石机械相关建造。刷怪塔、物品分类器等均可正常使用，只要不建造过度卡顿的高频红石装置即可。'
  },
  {
    question: 'PVP 是开启的吗？',
    answer: '是的，服务器默认开启自由 PVP，请自行承担风险。但禁止恶意围堵、用陷阱坑杀萌新玩家。'
  },
  {
    question: '可以使用什么模组/客户端？',
    answer: '允许使用不影响平衡的辅助模组，如小地图、光影、优化模组等。禁止飞行、穿墙、杀戮光环、自动攻击等破坏平衡的作弊功能。'
  },
  {
    question: '如何保护我的建筑？',
    answer: '使用 Residence 领地插件！输入 /res select 20 选择范围，然后 /res create 领地名 创建即可。详细教程请查看「游戏指南→领地教程」。'
  },
  {
    question: '领地可以给好友权限吗？',
    answer: '可以！站在领地内输入 /res pset 玩家ID trusted true 即可给该玩家全部权限。也可以单独设置某个权限。'
  },
  {
    question: '忘记密码怎么办？',
    answer: '请加入我们的 QQ 群，联系管理员说明情况并提供相关验证信息后即可重置密码。'
  }
])

const expandedIndex = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">❓</span>
        常见问题
      </h2>
      <p class="guide-subtitle">这里有你可能想知道的一切答案</p>
    </div>

    <div class="faq-list">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        :class="{ expanded: expandedIndex === index }"
        @click="toggleFAQ(index)"
      >
        <div class="faq-question">
          <span class="faq-q-label">Q</span>
          <span class="faq-text">{{ faq.question }}</span>
          <span class="faq-icon">
            {{ expandedIndex === index ? '−' : '+' }}
          </span>
        </div>

        <Transition name="faq">
          <div v-if="expandedIndex === index" class="faq-answer">
            <span class="faq-a-label">A</span>
            <span class="faq-text">{{ faq.answer }}</span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-section {
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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(var(--fur-primary-rgb), 0.3);
  }

  &.expanded {
    border-color: rgba(var(--fur-primary-rgb), 0.5);
    box-shadow: 0 4px 20px rgba(var(--fur-primary-rgb), 0.1);
  }
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;

  .faq-q-label {
    width: 28px;
    height: 28px;
    background: var(--fur-gradient-primary);
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  .faq-text {
    flex: 1;
    font-weight: 600;
    font-size: 15px;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
    background: var(--fur-bg-soft);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
    color: var(--fur-primary);
    transition: transform 0.3s ease;
  }
}

.faq-answer {
  display: flex;
  gap: 14px;
  padding: 0 22px 20px;

  .faq-a-label {
    width: 28px;
    height: 28px;
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  .faq-text {
    flex: 1;
    font-size: 14px;
    line-height: 1.7;
    color: var(--fur-text-secondary);
  }
}

.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
