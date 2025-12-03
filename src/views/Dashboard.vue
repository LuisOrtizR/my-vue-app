<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-4">
    <h2 class="text-2xl">Dashboard privado ✔</h2>
    <button @click="logout" class="btn">Cerrar sesión</button>
  </div>
</template>

<style scoped>
.btn { @apply bg-red-600 hover:bg-red-700 py-2 px-4 rounded; }
</style>
