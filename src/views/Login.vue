<script setup lang="ts">
import { ref } from "vue";
import { loginApi } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const submit = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await loginApi(email.value, password.value);
    auth.login(res.data.access_token, res.data.expiresIn);
    router.push("/admin");
  } catch (e: any) {
    error.value = e.response?.data?.message || "Error al iniciar sesión";
  }
  loading.value = false;
};
</script>

<template>
  <div class="bg-gray-900 border border-gray-700 p-8 rounded-xl shadow-xl w-full max-w-lg">
    <h2 class="text-3xl font-bold text-white text-center mb-6">
      Bienvenido 👋
    </h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Correo</label>
        <input v-model="email" type="email"
               class="input w-full"
               placeholder="correo@empresa.com" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
        <input v-model="password" type="password"
               class="input w-full"
               placeholder="••••••••" />
      </div>

      <button :disabled="loading"
              class="btn w-full py-3 text-lg font-semibold">
        {{ loading ? "Ingresando..." : "Ingresar" }}
      </button>

      <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
    </form>

    <router-link
      to="/forgot-password"
      class="block mt-4 text-center text-blue-400 hover:text-blue-300 text-sm"
    >
      ¿Olvidaste tu contraseña?
    </router-link>
  </div>
</template>

<style scoped>
.input {
  @apply bg-gray-700 px-3 py-2 rounded w-full outline-none;
}
.btn {
  @apply bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold duration-200;
}
</style>
