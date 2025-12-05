<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const iconSize = ref(56)

const updateIconSize = () => {
  const w = window.innerWidth
  iconSize.value = w >= 1280 ? 110 : w >= 1024 ? 90 : w >= 768 ? 70 : 56
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
    <h1 class="hero-title">
      <span class="gradient-title">Codenest Solutions</span> ✔
    </h1>

    <p class="hero-subtitle">
      Full-Stack Developer — Node.js · Vue.js · NestJS · Prisma · MySQL
    </p>

    <p class="hero-text">
      Desarrollo aplicaciones web modernas, rápidas y seguras.
      Transformo ideas en experiencias digitales escalables con enfoque profesional.
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
      <router-link to="/projects" class="btn-main">Ver proyectos</router-link>
      <router-link to="/contact" class="btn-outline">Contáctame</router-link>
    </div>
  </section>
</template>

<style scoped>
.hero {
  @apply text-center py-28 px-6 max-w-6xl mx-auto;
}

.hero-title {
  @apply text-5xl md:text-7xl font-extrabold leading-tight tracking-tight;
}

.gradient-title {
  @apply bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent;
}

.hero-subtitle {
  @apply text-xl md:text-2xl text-gray-300 mt-6 font-semibold;
}

.hero-text {
  @apply text-base md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed;
}

.tech-icons {
  @apply flex flex-wrap justify-center gap-8 mt-12;
}

.tech-icon {
  @apply opacity-80 hover:opacity-100 transition duration-300 hover:scale-110;
}

.btn-group {
  @apply mt-12 flex flex-col sm:flex-row justify-center gap-6;
}

.btn-main {
  @apply px-8 py-3 text-lg bg-green-500 hover:bg-green-600 rounded-xl font-bold text-black
         shadow-lg transition-all hover:scale-105;
}

.btn-outline {
  @apply px-8 py-3 text-lg border border-green-500 rounded-xl text-gray-200
         hover:bg-green-500/20 transition-all hover:scale-105;
}
</style>
