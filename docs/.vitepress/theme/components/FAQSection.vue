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
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">❓</span>
        常见问题
      </h2>
      <p class="guide-subtitle">在这里找到你想要的答案</p>
    </div>

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
</template>

<style scoped lang="scss">
.faq-section {
  padding: 32px 0;
  max-width: 800px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 40px;

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

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--fur-primary);
  }

  &.expanded {
    border-color: var(--fur-primary);
    box-shadow: var(--fur-shadow-card);
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
