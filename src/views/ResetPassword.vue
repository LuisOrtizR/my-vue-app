<script setup lang="ts">
import { ref } from 'vue';
import { resetApi } from '@/api/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const token = route.query.token as string;

const password = ref("");
const message = ref("");
const error = ref("");

const submit = async () => {
  error.value = "";
  try {
    await resetApi(token, password.value);
    message.value = "Contraseña actualizada. Redirigiendo...";
    setTimeout(() => router.push("/login"), 2000);
  } catch (e: any) {
    error.value = e.response?.data?.message || "Error";
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <form @submit.prevent="submit" class="bg-gray-800 p-6 rounded w-80 space-y-4">
      <h2 class="text-xl font-bold text-center">Nueva contraseña</h2>

      <input v-model="password" type="password" placeholder="Nueva contraseña" class="input" />

      <button class="btn w-full">Restablecer</button>

      <p v-if="message" class="text-green-400 text-sm text-center">{{ message }}</p>
      <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.input { @apply bg-gray-700 px-3 py-2 rounded w-full outline-none; }
.btn { @apply bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold duration-200; }
</style>
