<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const mapUrl = 'https://map.fur-island.asia/'

const onLoad = () => {
  loading.value = false
}
</script>

<template>
  <div class="map-section">
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🗺️</span>
        服务器地图
      </h2>
      <p class="guide-subtitle">实时浏览世界，探索每一个角落</p>
    </div>

    <div class="map-container">
      <div v-if="loading" class="map-loading">
        <div class="loading-spinner"></div>
        <p>地图加载中...</p>
      </div>

      <iframe
        :src="mapUrl"
        class="map-iframe"
        @load="onLoad"
        :class="{ loaded: !loading }"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <div class="map-tips">
      <div class="tips-grid">
        <div class="tip-item">
          <span class="tip-icon">🖱️</span>
          <span>左键拖动移动视角</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔍</span>
          <span>滚轮缩放地图</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📍</span>
          <span>右上角可切换图层</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">👤</span>
          <span>可查看在线玩家位置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-section {
  padding: 32px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 32px;

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

.map-container {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 500px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--fur-border);
  margin-bottom: 24px;
  background: var(--fur-bg-soft);
}

.map-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 1;

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--fur-border);
    border-top-color: var(--fur-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--fur-text-secondary);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.map-iframe {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.loaded {
    opacity: 1;
  }
}

.map-tips {
  background: var(--fur-bg-card);
  border: 1px solid var(--fur-border);
  border-radius: 14px;
  padding: 20px 24px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--fur-text-secondary);

  .tip-icon {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .map-container {
    height: 60vh;
    min-height: 400px;
  }
}
</style>
