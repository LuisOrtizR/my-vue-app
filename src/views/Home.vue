<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="text-center py-20">
    <h1 class="text-6xl font-extrabold text-green-500 leading-tight">
      Codenest Solutions ✔
    </h1>

    <p class="text-2xl text-gray-300 mt-6 font-semibold">
      Full-Stack Developer | Node.js + Vue.js + MySQL + Prisma + NestJS
    </p>

    <p class="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
      Construyendo aplicaciones web modernas, rápidas y seguras. 
      Transformo ideas en experiencias digitales reales y escalables.
    </p>

    <!-- Tecnologías -->
    <div class="flex justify-center gap-4 mt-10 text-gray-300">
      <Icon icon="logos:nodejs-icon" width="50" />
      <Icon icon="vscode-icons:file-type-nestjs" width="50" />
      <Icon icon="vscode-icons:file-type-prisma" width="50" />
      <Icon icon="logos:mysql" width="50" />
      <Icon icon="vscode-icons:file-type-vite" width="50" />
      <Icon icon="logos:vue" width="50" />
      <Icon icon="logos:tailwindcss-icon" width="50" />
    </div>

    <div class="mt-10 flex justify-center gap-6">
      <a href="#projects"
        class="px-6 py-3 text-lg bg-green-500 hover:bg-green-600 rounded-lg font-bold">
        🚀 Ver Proyectos
      </a>

      <a href="#contact"
        class="px-6 py-3 text-lg border border-green-500 hover:bg-green-500/20 rounded-lg">
        📩 Contáctame
      </a>
    </div>
  </section>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
