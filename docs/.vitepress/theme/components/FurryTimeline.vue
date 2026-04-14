<template>
  <div class="furry-timeline">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="timeline-item"
    >
      <div class="timeline-paw">🐾</div>
      <div class="timeline-line"></div>
      <div class="timeline-card">
        <div class="timeline-date">{{ item.date }}</div>
        <h4 class="timeline-title">{{ item.title }}</h4>
        <p class="timeline-content">{{ item.content }}</p>
        <div v-if="item.tags" class="timeline-tags">
          <span v-for="(tag, i) in item.tags" :key="i" class="timeline-tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineItem {
  date: string
  title: string
  content: string
  tags?: string[]
}

defineProps<{
  items: TimelineItem[]
}>()
</script>

<style scoped>
.furry-timeline {
  position: relative;
  padding: 1rem 0 1rem 3rem;
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-paw {
  position: absolute;
  left: -3rem;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ff9a9e 0%, #a8edea 100%);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
  z-index: 2;
  animation: paw-bounce 2s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 0.2s);
}

@keyframes paw-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.timeline-line {
  position: absolute;
  left: -1.875rem;
  top: 2.5rem;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #ff9a9e, #a8edea, #fed6e3);
  border-radius: 2px;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  border: 1px solid rgba(255, 154, 158, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #ff9a9e, #a8edea);
  border-radius: 0 4px 4px 0;
}

.timeline-card:hover {
  transform: translateX(8px) scale(1.02);
  border-color: rgba(255, 154, 158, 0.4);
  box-shadow: 0 10px 30px rgba(255, 154, 158, 0.15);
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.timeline-content {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.timeline-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.timeline-tag {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, 
    rgba(255, 154, 158, 0.2), 
    rgba(168, 237, 234, 0.2));
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

@media (max-width: 640px) {
  .furry-timeline {
    padding-left: 2.5rem;
  }
  
  .timeline-paw {
    left: -2.5rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
  
  .timeline-line {
    left: -1.5rem;
  }
}
</style>
