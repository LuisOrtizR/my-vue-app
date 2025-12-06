<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";

const route = useRoute();
const auth = useAuthStore();

const mobileMenu = ref(false);

const isAdmin = computed(() => route.path.startsWith("/admin"));
const isLogged = computed(() => auth.isAuthenticated);

const isActive = (path: string) => route.path === path;
</script>

<template>
  <router-view v-if="isAdmin" />

  <div v-else class="min-h-screen bg-gray-900 text-white flex flex-col">
    <header class="bg-gray-900 p-4 border-b border-gray-700">
      <nav class="max-w-6xl mx-auto flex justify-between items-center">

        <router-link
          to="/"
          class="text-xl font-bold text-green-400"
        >
          CodeNest Solutions ✔
        </router-link>

        <button
          class="text-gray-300 hover:text-green-400 lg:hidden"
          @click="mobileMenu = !mobileMenu"
        >
          <Icon icon="mdi:menu" width="28" />
        </button>

        <div class="hidden lg:flex items-center gap-6">

          <router-link
            to="/about"
            :class="['nav-item', isActive('/about') && 'active-item']"
          >
            Sobre mí
          </router-link>

          <router-link
            to="/projects"
            :class="['nav-item', isActive('/projects') && 'active-item']"
          >
            Proyectos
          </router-link>

          <router-link
            to="/contact"
            :class="['nav-item', isActive('/contact') && 'active-item']"
          >
            Contáctame
          </router-link>

          <router-link
            v-if="!isLogged"
            to="/login"
            :class="['nav-item', isActive('/login') && 'active-item']"
          >
            Sesión Admin
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

      <transition name="fade">
        <div
          v-if="mobileMenu"
          class="lg:hidden mt-3 flex flex-col gap-4 text-center bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <router-link
            @click="mobileMenu = false"
            to="/about"
            :class="['nav-item-mobile', isActive('/about') && 'active-item']"
          >
            Sobre mí
          </router-link>

          <router-link
            @click="mobileMenu = false"
            to="/projects"
            :class="['nav-item-mobile', isActive('/projects') && 'active-item']"
          >
            Proyectos
          </router-link>

          <router-link
            @click="mobileMenu = false"
            to="/contact"
            :class="['nav-item-mobile', isActive('/contact') && 'active-item']"
          >
            Contáctame
          </router-link>

          <router-link
            v-if="!isLogged"
            @click="mobileMenu = false"
            to="/login"
            :class="['nav-item-mobile', isActive('/login') && 'active-item']"
          >
            Iniciar sesión
          </router-link>

          <router-link
            v-else
            @click="mobileMenu = false"
            to="/admin"
            class="text-green-400 font-semibold"
          >
            Panel
          </router-link>
        </div>
      </transition>
    </header>

    <main class="flex-1 px-4 py-10 max-w-5xl mx-auto">
      <router-view />
    </main>

    <footer class="bg-gray-900 p-3 border-t border-gray-700 text-center text-gray-400 text-sm">
      © {{ new Date().getFullYear() }} CodeNest Solutions — Todos los derechos reservados
    </footer>
  </div>
</template>

<style scoped>
.nav-item {
  @apply text-gray-300 hover:text-green-400 font-semibold transition;
}

.nav-item-mobile {
  @apply text-gray-300 hover:text-green-400 font-semibold text-lg py-2 transition;
}

/* color del enlace activo */
.active-item {
  color: #4ade80 !important; /* tailwind green-400 */
}

/* Animación fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
