<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  texts: string[]
  speed?: number
  deleteSpeed?: number
  delay?: number
}>(), {
  speed: 100,
  deleteSpeed: 50,
  delay: 2000
})

const displayText = ref('')
const textIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)

const type = () => {
  const currentText = props.texts[textIndex.value]

  if (isDeleting.value) {
    displayText.value = currentText.substring(0, charIndex.value - 1)
    charIndex.value--
  } else {
    displayText.value = currentText.substring(0, charIndex.value + 1)
    charIndex.value++
  }

  let typeSpeed = isDeleting.value ? props.deleteSpeed : props.speed

  if (!isDeleting.value && charIndex.value === currentText.length) {
    typeSpeed = props.delay
    isDeleting.value = true
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false
    textIndex.value = (textIndex.value + 1) % props.texts.length
  }

  setTimeout(type, typeSpeed)
}

onMounted(() => {
  type()
})
</script>

<template>
  <span class="typewriter">
    {{ displayText }}
    <span class="cursor">|</span>
  </span>
</template>

<style scoped>
.typewriter {
  display: inline;
}

.cursor {
  display: inline-block;
  animation: blink 1s infinite;
  color: var(--fur-primary);
  font-weight: bold;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
