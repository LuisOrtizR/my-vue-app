<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">

    <!-- NAVBAR -->
    <header class="bg-gray-900 p-4 border-b border-gray-700">
      <nav class="max-w-6xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold text-green-400">
          CodeNest Solutions ✔
        </router-link>

        <router-link 
          to="/login" 
          class="text-blue-400 hover:text-blue-300 font-semibold"
        >
          Iniciar Sesión
        </router-link>
      </nav>
    </header>

    <!-- CONTENIDO DINÁMICO -->
    <main class="flex-1 flex items-center justify-center px-4">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 p-3 border-t border-gray-700 text-center text-gray-400 text-sm">
      © {{ new Date().getFullYear() }} CodeNest Solutions — Todos los derechos reservados
    </footer>

  </div>
</template>
