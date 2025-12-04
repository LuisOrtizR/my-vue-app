<script setup lang="ts">
import { ref } from "vue";
import { forgotApi } from "@/api/auth";

const email = ref("");
const message = ref("");
const error = ref("");

const submit = async () => {
  error.value = "";
  message.value = "";
  try {
    await forgotApi(email.value);
    message.value = "Revisa tu correo para recuperar tu contraseña";
  } catch (e: any) {
    error.value = e.response?.data?.message || "Error";
  }
};
</script>

<template>
  <section class="py-24 px-5 max-w-3xl mx-auto">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 text-center mb-10">
      Recuperar contraseña
    </h1>

    <div
      v-if="error"
      class="mb-6 p-4 text-red-700 bg-red-200 border border-red-400 rounded-lg text-center animate-fade"
    >
      {{ error }}
    </div>

    <div
      v-if="message"
      class="mb-6 p-4 text-green-700 bg-green-200 border border-green-400 rounded-lg text-center animate-fade"
    >
      {{ message }}
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

      <button
        class="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-black font-bold text-lg
               shadow-lg transition transform hover:scale-105"
      >
        Enviar enlace
      </button>
    </form>

    <router-link
      to="/login"
      class="block mt-6 text-center text-green-500 hover:text-green-400 transition text-sm"
    >
      Volver al inicio de sesión
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
