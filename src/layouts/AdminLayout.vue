<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const mobileOpen = ref(false);
const collapsed = ref(false);

const toggleMobile = () => (mobileOpen.value = !mobileOpen.value);
const toggleCollapse = () => (collapsed.value = !collapsed.value);

const title = computed(() => {
  const path = route.path ?? "";
  const seg = path.split("/").filter(Boolean);

  const key = seg[1] ?? "panel";

  return key.charAt(0).toUpperCase() + key.slice(1);
});


const userInitial = computed(() => {
  const email = auth.userEmail;
  return email ? email.charAt(0).toUpperCase() : "U";
});

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <transition name="fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="mobileOpen = false"
      />
    </transition>

    <aside
      :class="[
        'bg-gray-900 border-r border-gray-800 z-50 fixed lg:static top-0 left-0 h-full transition-all transform',
        mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
        collapsed ? 'w-20' : 'w-64'
      ]"
    >
      <div class="h-full flex flex-col">
        <div class="px-4 py-5 flex items-center gap-3 border-b border-gray-800">
          <button
            class="hidden lg:inline-flex items-center gap-2"
            @click="toggleCollapse"
            :title="collapsed ? 'Expandir' : 'Colapsar'"
          >
            <Icon icon="mdi:menu" width="20" />
          </button>

          <router-link to="/" class="flex items-center gap-2">
            <span
              class="text-green-400 font-extrabold text-lg"
              :class="collapsed ? 'hidden' : ''"
            >
              CodeNest
            </span>
            <Icon icon="mdi:check-decagram" width="18" />
          </router-link>
        </div>

        <nav class="p-4 flex-1 overflow-y-auto">
          <ul class="flex flex-col gap-1">
            <li>
              <router-link
                to="/admin/about"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                active-class="bg-gray-800 text-green-400"
              >
                <Icon icon="mdi:account-circle-outline" width="20" />
                <span :class="collapsed ? 'hidden' : ''">Sobre mí</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/admin/contacts"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                active-class="bg-gray-800 text-green-400"
              >
                <Icon icon="mdi:account-multiple-outline" width="20" />
                <span :class="collapsed ? 'hidden' : ''">Contactos</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/admin/projects"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                active-class="bg-gray-800 text-green-400"
              >
                <Icon icon="mdi:folder-outline" width="20" />
                <span :class="collapsed ? 'hidden' : ''">Proyectos</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="px-4 py-4 border-t border-gray-800">
          <div
            class="text-xs text-gray-400 mb-2"
            :class="collapsed ? 'hidden' : ''"
          >
            Sesión
          </div>

          <div
            class="flex items-center gap-3"
            :class="collapsed ? 'justify-center' : ''"
          >
            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
              {{ userInitial }}
            </div>

            <div v-if="!collapsed" class="flex-1">
              <div class="text-sm text-gray-200 truncate">{{ auth.userEmail }}</div>
              <div class="text-xs text-gray-500">Administrador</div>
            </div>
          </div>

          <button
            @click="logout"
            :class="[
              'mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2',
              collapsed ? 'w-12 h-12 mx-auto' : 'w-full py-2'
            ]"
          >
            <Icon icon="mdi:logout" width="20" />
            <span v-if="!collapsed">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col lg:pl-0">
      <header class="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-800 bg-gradient-to-r from-gray-900/70 to-transparent">
        <div class="flex items-center gap-3">
          <button class="lg:hidden p-2 rounded-md hover:bg-gray-800" @click="toggleMobile">
            <Icon icon="mdi:menu" width="20" />
          </button>

          <h2 class="text-2xl font-bold text-green-400">{{ title }}</h2>

          <div class="hidden md:flex items-center text-xs text-gray-400 ml-4">
            <span class="px-2">Dashboard</span>
            <span class="opacity-50">/</span>
            <span class="px-2">{{ route.path.replace('/admin/', '') || 'Inicio' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button class="px-3 py-1 bg-gray-800 rounded-md text-sm hidden md:inline-flex items-center gap-2">
            <Icon icon="mdi:bell-outline" width="18" />
            Notificaciones
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-auto bg-gradient-to-b from-gray-900/40 to-transparent">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
