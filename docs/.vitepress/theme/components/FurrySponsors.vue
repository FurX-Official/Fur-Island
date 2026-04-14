<template>
  <div class="furry-sponsors">
    <h3 class="sponsors-title">
      <span>💖</span>
      <span>特别感谢赞助的小伙伴们</span>
      <span>💖</span>
    </h3>
    
    <div class="sponsors-grid">
      <div 
        v-for="(sponsor, index) in sponsors" 
        :key="index"
        class="sponsor-card"
        :class="{ 'tier-gold': sponsor.tier === 'gold', 'tier-silver': sponsor.tier === 'silver' }"
      >
        <div class="sponsor-avatar">
          <span class="sponsor-furry">{{ sponsor.furry || '🦊' }}</span>
          <div v-if="sponsor.tier === 'gold'" class="sponsor-shine"></div>
        </div>
        <div class="sponsor-info">
          <div class="sponsor-name">{{ sponsor.name }}</div>
          <div v-if="sponsor.note" class="sponsor-note">{{ sponsor.note }}</div>
        </div>
        <div v-if="sponsor.amount" class="sponsor-amount">
          <span>💝</span> {{ sponsor.amount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Sponsor {
  name: string
  furry?: string
  tier?: 'gold' | 'silver' | 'bronze'
  amount?: string
  note?: string
}

defineProps<{
  sponsors: Sponsor[]
}>()
</script>

<style scoped>
.furry-sponsors {
  margin: 3rem 0;
  text-align: center;
}

.sponsors-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ff9a9e 0%, #fa709a 50%, #fee140 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sponsors-title span:first-child,
.sponsors-title span:last-child {
  font-size: 1.8rem;
  animation: heart-beat 1.5s ease-in-out infinite;
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.sponsor-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.sponsor-card.tier-gold {
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.15) 0%, 
    rgba(255, 154, 158, 0.1) 100%);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
}

.sponsor-card.tier-silver {
  background: linear-gradient(135deg, 
    rgba(192, 192, 192, 0.15) 0%, 
    rgba(168, 237, 234, 0.1) 100%);
  border-color: rgba(192, 192, 192, 0.3);
}

.sponsor-card:hover {
  transform: translateY(-8px) scale(1.05);
}

.sponsor-card.tier-gold:hover {
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.3);
}

.sponsor-avatar {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #a8edea 100%);
  border-radius: 50%;
  font-size: 2rem;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sponsor-card:hover .sponsor-avatar {
  transform: scale(1.2) rotate(10deg);
}

.sponsor-shine {
  position: absolute;
  inset: -50%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 255, 255, 0.4) 50%, 
    transparent 70%);
  animation: shine 2s linear infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.sponsor-furry {
  position: relative;
  z-index: 1;
}

.sponsor-info {
  text-align: center;
}

.sponsor-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.sponsor-note {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.sponsor-amount {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (max-width: 640px) {
  .sponsors-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .sponsor-card {
    padding: 1rem;
  }
}
</style>
