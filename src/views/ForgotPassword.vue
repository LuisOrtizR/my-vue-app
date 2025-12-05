<script setup lang="ts">
import { ref } from "vue";
import { forgotApi } from "@/api/auth";
import { EnvelopeIcon } from "@heroicons/vue/24/outline";

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
  <section class="py-24 px-6 max-w-lg mx-auto">
    <h1 class="text-5xl md:text-6xl font-extrabold text-center mb-10">
      <span class="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Recuperar contraseña
      </span>
    </h1>

    <div
      v-if="error"
      class="mb-6 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg text-center animate-fade"
    >
      {{ error }}
    </div>

    <div
      v-if="message"
      class="mb-6 p-4 text-green-700 bg-green-100 border border-green-400 rounded-lg text-center animate-fade"
    >
      {{ message }}
    </div>

    <form
      @submit.prevent="submit"
      class="bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-700 space-y-7"
    >
      <div class="space-y-2">
        <label class="text-gray-300 font-semibold">Correo</label>
        <div class="relative">
          <EnvelopeIcon class="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            v-model="email"
            type="email"
            placeholder="correo@ejemplo.com"
            class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700
                   focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
      </div>

      <button
        class="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-black font-bold text-lg
               shadow-lg transition transform hover:scale-[1.03]"
      >
        Enviar enlace
      </button>
    </form>

    <router-link
      to="/login"
      class="block mt-6 text-center text-green-400 hover:text-green-300 transition text-sm font-medium"
    >
      Volver al inicio de sesión
    </router-link>
  </section>
</template>

<style scoped>
@keyframes fade {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade {
  animation: fade 0.3s ease-out;
}
</style>
