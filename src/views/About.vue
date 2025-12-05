<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getAbout } from '@/api/about'
import { Icon } from '@iconify/vue'

type AboutMe = {
  id?: number
  description?: string
  images?: string[] | null
  cv?: string | null
}

const about = ref<AboutMe | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const activeIndex = ref(0)
let sliderInterval: any = null

const load = async () => {
  loading.value = true
  try {
    const data = await getAbout()
    about.value = data ?? null
  } catch (err: any) {
    error.value = err?.message || 'Error cargando la información'
  } finally {
    loading.value = false
  }
}

const nextImage = () => {
  if (!about.value?.images?.length) return
  activeIndex.value = (activeIndex.value + 1) % about.value.images.length
}

onMounted(() => {
  load()
  sliderInterval = setInterval(nextImage, 3000)
})

onUnmounted(() => clearInterval(sliderInterval))
</script>

<template>
  <section class="py-24 px-5 max-w-7xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 tracking-tight mb-10">
      Sobre mí
    </h1>

    <div v-if="about" class="grid xl:grid-cols-2 gap-16 items-center">
      <div class="flex justify-center">
        <div class="relative img-frame shadow-xl">
          <transition name="fade" mode="out-in">
            <img
              :key="activeIndex"
              :src="about.images?.[activeIndex]"
              alt="Foto personal"
              class="profile-img"
            />
          </transition>
        </div>
      </div>

      <div class="space-y-7 text-left">
        <p v-html="about.description" class="text-lg md:text-xl text-gray-300 leading-relaxed"></p>

        <div class="flex flex-wrap gap-4">
          <a
            v-if="about.cv"
            :href="about.cv"
            target="_blank"
            download
            class="btn-main"
          >
            <Icon icon="mdi:file-document-outline" width="22" />
            Descargar CV
          </a>

          <a
            href="https://www.linkedin.com/in/luis-angel-ortiz-romero-b57687367"
            target="_blank"
            class="btn-outline"
          >
            <Icon icon="mdi:linkedin" width="24" />
            LinkedIn
          </a>

          <a
            href="https://wa.me/573023077194"
            target="_blank"
            class="btn-outline"
          >
            <Icon icon="mdi:whatsapp" width="24" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>

    <p v-if="loading" class="status">Cargando...</p>
    <p v-if="error" class="status text-red-500">{{ error }}</p>
  </section>
</template>

<style scoped>
.img-frame {
  width: 360px;
  height: 360px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #22c55e;
  box-shadow: 0 0 28px rgba(34, 197, 94, 0.25);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-main {
  @apply inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl transition-all shadow-lg hover:scale-105;
}

.btn-outline {
  @apply inline-flex items-center gap-2 px-5 py-3 border border-green-500 rounded-xl text-gray-200 hover:bg-green-500/20 hover:text-black transition-all hover:scale-105;
}

.status {
  @apply text-center py-16 text-gray-400 text-lg;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .img-frame {
    width: 260px;
    height: 260px;
  }
}
</style>
