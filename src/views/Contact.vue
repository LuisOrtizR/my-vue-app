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
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 text-center mb-12 tracking-tight">
      Contáctame
    </h1>

    <div
      v-if="success"
      class="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-xl text-center animate-fade shadow-lg"
    >
      {{ success }}
    </div>

    <div
      v-if="error"
      class="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-400 rounded-xl text-center animate-fade shadow-lg"
    >
      {{ error }}
    </div>

    <form
      @submit.prevent="submit"
      class="bg-gray-900 p-10 rounded-2xl shadow-xl border border-gray-800 space-y-7"
    >
      <div>
        <label class="text-gray-300 font-semibold">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Tu nombre"
          class="input-field"
        />
      </div>

      <div>
        <label class="text-gray-300 font-semibold">Correo</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="tucorreo@example.com"
          class="input-field"
        />
      </div>

      <div>
        <label class="text-gray-300 font-semibold">Mensaje</label>
        <textarea
          v-model="form.message"
          rows="6"
          placeholder="Escribe tu mensaje..."
          class="input-field resize-none"
        ></textarea>
      </div>

      <button
        :disabled="loading"
        class="submit-btn"
      >
        {{ loading ? "Enviando..." : "Enviar mensaje" }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.input-field {
  @apply w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700
         focus:border-green-500 focus:ring-2 focus:ring-green-600/40 outline-none transition
         shadow-inner;
}

.submit-btn {
  @apply w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-black font-bold text-lg
         shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100;
}

@keyframes fade {
  from { opacity: 0 }
  to { opacity: 1 }
}
.animate-fade {
  animation: fade 0.4s ease-in-out;
}
</style>
