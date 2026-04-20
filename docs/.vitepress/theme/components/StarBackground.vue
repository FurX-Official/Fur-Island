<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number

const stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkle: number }[] = []

const initStars = (width: number, height: number) => {
  stars.length = 0
  const count = Math.floor((width * height) / 8000)
  
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2
    })
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const isDark = document.documentElement.classList.contains('dark')

  stars.forEach((star) => {
    star.twinkle += 0.02
    const twinkleOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle))
    
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${twinkleOpacity})` : `rgba(139, 92, 246, ${twinkleOpacity * 0.3})`
    ctx.fill()

    star.y -= star.speed
    if (star.y < -10) {
      star.y = canvas.height + 10
      star.x = Math.random() * canvas.width
    }
  })

  animationId = requestAnimationFrame(animate)
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initStars(canvas.width, canvas.height)
}

onMounted(() => {
  resize()
  animate()
  window.addEventListener('resize', resize, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="star-background"
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"
  ></canvas>
</template>
