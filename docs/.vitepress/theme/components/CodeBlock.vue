<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  large?: boolean
}>()

const copied = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="code-block" :class="{ large }">
    <code>{{ code }}</code>
    <button class="copy-btn" @click="copyCode">
      <span v-if="copied">✅ 已复制</span>
      <span v-else>📋 复制</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.code-block {
  position: relative;
  padding: 12px 18px;
  padding-right: 85px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 12px;
  border: 2px solid rgba(139, 92, 246, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  }

  &.large {
    padding: 16px 24px;
    padding-right: 90px;
    margin: 12px 0;
  }

  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-weight: 700;
    color: var(--fur-primary);
    font-size: 14px;
    user-select: all;
  }
}

.copy-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;

  .code-block:hover & {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(-50%) scale(0.98);
  }
}
</style>
