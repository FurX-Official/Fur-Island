<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  icon?: string
  defaultOpen?: boolean
}>(), {
  icon: '📁',
  defaultOpen: true
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
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  overflow: hidden;
  background: var(--fur-bg-muted);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }
}

.accordion-header {
  width: 100%;
  padding: 20px 24px;
  border: none;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  border-bottom: 4px solid var(--fur-border);

  &:hover {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15));
  }
}

.accordion-icon {
  font-size: 26px;
}

.accordion-title {
  flex: 1;
  font-size: 17px;
  font-weight: 800;
  color: var(--fur-text);
}

.accordion-arrow {
  font-size: 16px;
  color: var(--fur-primary);
  font-weight: 800;
  transition: transform 0.3s ease;
  padding: 8px;
  background: var(--fur-bg-card);
  border-radius: 50%;
  border: 2px solid var(--fur-border);

  &.open {
    transform: rotate(180deg);
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    color: white;
    border-color: transparent;
  }
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.open {
    max-height: 1000px;
  }
}

.accordion-inner {
  padding: 24px;
  color: var(--fur-text-secondary);
  font-size: 15px;
  line-height: 1.7;
  font-weight: 600;
}

@media (max-width: 768px) {
  .accordion-header {
    padding: 16px 20px;
  }

  .accordion-icon {
    font-size: 22px;
  }

  .accordion-title {
    font-size: 15px;
  }

  .accordion-inner {
    padding: 20px;
  }
}
</style>
