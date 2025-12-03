<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const iconSize = ref(48)

function updateIconSize() {
  const width = window.innerWidth
  if (width >= 1280) iconSize.value = 96
  else if (width >= 1024) iconSize.value = 80
  else if (width >= 768) iconSize.value = 64
  else iconSize.value = 48
}

onMounted(() => {
  updateIconSize()
  window.addEventListener('resize', updateIconSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIconSize)
})
</script>

<template>
  <section class="hero">
    <h1 class="hero-title">Codenest Solutions ✔</h1>
    <p class="hero-subtitle">
      Full-Stack Developer | Node.js + Vue.js + MySQL + Prisma + NestJS
    </p>
    <p class="hero-text">
      Construyendo aplicaciones web modernas, rápidas y seguras.
      Transformo ideas en experiencias digitales reales y escalables.
    </p>

    <div class="tech-icons">
      <Icon icon="logos:nodejs-icon" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="vscode-icons:file-type-nestjs" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="vscode-icons:file-type-prisma" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="logos:mysql" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="vscode-icons:file-type-vite" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="logos:vue" class="tech-icon" :width="iconSize" :height="iconSize" />
      <Icon icon="logos:tailwindcss-icon" class="tech-icon" :width="iconSize" :height="iconSize" />
    </div>

    <div class="btn-group">
      <a href="#projects" class="btn-main">🚀 Ver Proyectos</a>
      <a href="#contact" class="btn-outline">📩 Contáctame</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  @apply text-center py-24 px-5 max-w-7xl mx-auto;
}

.hero-title {
  @apply text-4xl md:text-6xl font-extrabold text-green-500 leading-tight;
}

.hero-subtitle {
  @apply text-lg md:text-2xl text-gray-300 mt-6 font-semibold;
}

.hero-text {
  @apply text-sm md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto;
}

.tech-icons {
  @apply flex flex-wrap justify-center gap-6 mt-10 text-gray-300;
}

.tech-icon {
  @apply transition-transform duration-300 hover:scale-110;
}

.btn-group {
  @apply mt-10 flex flex-col sm:flex-row justify-center gap-5;
}

.btn-main {
  @apply px-6 py-3 text-lg bg-green-500 hover:bg-green-600 rounded-lg font-bold transition-all hover:scale-105;
}

.btn-outline {
  @apply px-6 py-3 text-lg border border-green-500 rounded-lg hover:bg-green-500/20 transition-all hover:scale-105;
}
</style>
