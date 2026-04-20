<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')!
  const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = 600
  }

  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      gradient.addColorStop(0, `rgba(var(--fur-primary-rgb), ${p.opacity})`)
      gradient.addColorStop(1, `rgba(var(--fur-primary-rgb), 0)`)
      ctx.fillStyle = gradient
      ctx.fill()

      particles.slice(i + 1).forEach((p2) => {
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(var(--fur-primary-rgb), ${0.15 * (1 - dist / 120)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="particles-canvas"
    aria-hidden="true"
  />
</template>

<style scoped>
.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  pointer-events: none;
  z-index: 0;
}
</style>
