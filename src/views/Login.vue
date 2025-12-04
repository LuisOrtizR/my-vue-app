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
  <section class="py-24 px-5 max-w-3xl mx-auto">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 text-center mb-10">
      Iniciar sesión
    </h1>

    <div
      v-if="error"
      class="mb-6 p-4 text-red-700 bg-red-200 border border-red-400 rounded-lg text-center animate-fade"
    >
      {{ error }}
    </div>

    <form @submit.prevent="submit" class="bg-gray-800 p-10 rounded-xl shadow-lg space-y-6">
      <div>
        <label class="text-gray-300 font-semibold">Correo</label>
        <input
          v-model="email"
          type="email"
          placeholder="correo@ejemplo.com"
          class="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700
                 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <div>
        <label class="text-gray-300 font-semibold">Contraseña</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700
                 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <button
        :disabled="loading"
        class="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-black font-bold text-lg
               shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        {{ loading ? "Ingresando..." : "Ingresar" }}
      </button>
    </form>

    <router-link
      to="/forgot-password"
      class="block mt-6 text-center text-green-500 hover:text-green-400 transition text-sm"
    >
      ¿Olvidaste tu contraseña?
    </router-link>
  </section>
</template>

<style scoped>
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade {
  animation: fade 0.4s ease-in-out;
}
</style>
