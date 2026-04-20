<script setup lang="ts">
import { ref } from 'vue'
import { siteContent } from '../config/content'

const faqs = siteContent.faq

const expandedIndex = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-section">
    <div class="component-header">
      <span class="header-icon">❓</span>
      <span class="header-text">常见问题</span>
    </div>

    <div class="component-content">
      <p class="guide-subtitle">在这里找到你想要的答案</p>

    <div class="faq-container">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        :class="{ expanded: expandedIndex === index }"
        @click="toggleFAQ(index)"
      >
        <div class="faq-question">
          <span class="question-text">{{ faq.question }}</span>
          <span class="faq-icon">{{ expandedIndex === index ? '−' : '+' }}</span>
        </div>

        <Transition name="faq">
          <div v-if="expandedIndex === index" class="faq-answer">
            {{ faq.answer }}
          </div>
        </Transition>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-section {
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

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: var(--fur-bg-card);
  border: 3px solid var(--fur-border);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
  }

  &.expanded {
    border-color: var(--fur-primary);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  font-weight: 600;
  gap: 16px;

  .question-text {
    flex: 1;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--fur-bg-soft);
    border-radius: 50%;
    font-size: 16px;
    font-weight: 700;
    color: var(--fur-primary);
    flex-shrink: 0;
  }
}

.faq-answer {
  padding: 0 24px 20px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--fur-text-secondary);
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
