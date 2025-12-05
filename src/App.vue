<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const auth = useAuthStore();

const isAdmin = computed(() => route.path.startsWith("/admin"));

const isLogged = computed(() => auth.isAuthenticated);
</script>

<template>
  <router-view v-if="isAdmin" />
  <div
    v-else
    class="min-h-screen bg-gray-900 text-white flex flex-col"
  >
    <header class="bg-gray-900 p-4 border-b border-gray-700">
      <nav class="max-w-6xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold text-green-400">
          CodeNest Solutions ✔
        </router-link>

        <div class="flex items-center gap-6">
          <router-link to="/about" class="text-gray-300 hover:text-green-400 font-semibold">
            Sobre mí
          </router-link>
          <router-link to="/projects" class="text-gray-300 hover:text-green-400 font-semibold">
            Proyectos
          </router-link>
          <router-link to="/contact" class="text-gray-300 hover:text-green-400 font-semibold">
            Contáctame
          </router-link>

          <router-link
            v-if="!isLogged"
            to="/login"
            class="text-gray-300 hover:text-green-400 font-semibold"
          >
            Iniciar sesión
          </router-link>
          <router-link
            v-else
            to="/admin"
            class="text-green-400 font-semibold"
          >
            Panel
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex-1 px-4 py-10 max-w-5xl mx-auto">
      <router-view />
    </main>

    <footer class="bg-gray-900 p-3 border-t border-gray-700 text-center text-gray-400 text-sm">
      © {{ new Date().getFullYear() }} CodeNest Solutions — Todos los derechos reservados
    </footer>
  </div>
</template>
