<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

const copyIP = () => {
  navigator.clipboard.writeText('play.fur-island.asia')
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <button class="copy-ip-float" @click="copyIP" :class="{ success: copied }">
    <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>{{ copied ? '已复制' : '复制IP' }}</span>
  </button>
</template>

<style scoped>
.copy-ip-float {
  position: fixed;
  right: 24px;
  bottom: 88px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--fur-text-primary);
  cursor: pointer;
  z-index: 99;
  box-shadow: var(--fur-shadow-medium);
  transition: all var(--fur-transition-normal);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--fur-primary);
    box-shadow: var(--fur-shadow-large);
  }

  &.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-color: #059669;
    color: white;
  }

  :deep(.dark) & {
    background: var(--fur-bg-card);
  }
}

@media (max-width: 768px) {
  .copy-ip-float {
    display: none;
  }
}
</style>
