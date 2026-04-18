<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="scale">
    <button
      v-if="visible"
      class="back-to-top"
      @click="scrollToTop"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fur-gradient-primary);
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  z-index: 100;
  box-shadow: var(--fur-shadow-glow);
  transition: all var(--fur-transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(var(--fur-primary-rgb), 0.45);
  }

  &:active {
    transform: translateY(-1px);
  }
}
</style>
