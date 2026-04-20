<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  icon?: string
  defaultOpen?: boolean
}>(), {
  icon: '📁',
  defaultOpen: false
})

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <div class="accordion-panel">
    <button class="accordion-header" @click="isOpen = !isOpen">
      <span class="accordion-icon">{{ icon }}</span>
      <span class="accordion-title">{{ title }}</span>
      <span class="accordion-arrow" :class="{ open: isOpen }">▼</span>
    </button>
    <div class="accordion-content" :class="{ open: isOpen }">
      <div class="accordion-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion-panel {
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  background: var(--fur-bg-card);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    box-shadow: var(--fur-shadow-card);
  }
}

.accordion-header {
  width: 100%;
  padding: 16px 20px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: rgba(139, 92, 246, 0.05);
  }
}

.accordion-icon {
  font-size: 20px;
}

.accordion-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--fur-text);
}

.accordion-arrow {
  font-size: 12px;
  color: var(--fur-text-muted);
  transition: transform 0.3s ease;

  &.open {
    transform: rotate(180deg);
  }
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.open {
    max-height: 1000px;
  }
}

.accordion-inner {
  padding: 0 20px 20px;
  color: var(--fur-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}
</style>
