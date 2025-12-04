<script setup lang="ts">
import { ref } from 'vue'
import { sendContact } from '@/api/contact'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const success = ref<string | null>(null)
const error = ref<string | null>(null)

const validate = () => {
  if (!form.value.name.trim()) return "El nombre es obligatorio"
  if (!form.value.email.trim()) return "El correo es obligatorio"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) return "Correo inválido"
  if (!form.value.message.trim()) return "El mensaje es obligatorio"
  return null
}

const submit = async () => {
  error.value = null
  success.value = null

  const validationError = validate()
  if (validationError) {
    error.value = validationError
    return
  }

  loading.value = true
  try {
    await sendContact(form.value)
    success.value = "¡Mensaje enviado correctamente!"
    form.value = { name: '', email: '', message: '' }
  } catch (err: any) {
    error.value = err?.response?.data?.message || "Ocurrió un error al enviar el mensaje"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="py-24 px-5 max-w-3xl mx-auto">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 text-center mb-10">
      Contáctame
    </h1>

    <div
      v-if="success"
      class="mb-6 p-4 text-green-700 bg-green-200 border border-green-400 rounded-lg text-center animate-fade"
    >
      {{ success }}
    </div>

    <div
      v-if="error"
      class="mb-6 p-4 text-red-700 bg-red-200 border border-red-400 rounded-lg text-center animate-fade"
    >
      {{ error }}
    </div>

    <form
      @submit.prevent="submit"
      class="bg-gray-800 p-10 rounded-xl shadow-lg space-y-6"
    >
      <div>
        <label class="text-gray-300 font-semibold">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Tu nombre"
          class="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <div>
        <label class="text-gray-300 font-semibold">Correo</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="tucorreo@example.com"
          class="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <div>
        <label class="text-gray-300 font-semibold">Mensaje</label>
        <textarea
          v-model="form.message"
          rows="6"
          placeholder="Escribe tu mensaje..."
          class="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 transition resize-none"
        ></textarea>
      </div>

      <button
        :disabled="loading"
        class="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-black font-bold text-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        {{ loading ? "Enviando..." : "Enviar mensaje" }}
      </button>
    </form>
  </section>
</template>

<style scoped>
@keyframes fade {
  from { opacity: 0 }
  to { opacity: 1 }
}
.animate-fade {
  animation: fade 0.4s ease-in-out;
}
</style>
