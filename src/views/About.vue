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
    <section class="hero py-24 px-5 text-center max-w-7xl mx-auto">
      <h1 class="hero-title">Sobre mí</h1>

      <div v-if="about" class="grid xl:grid-cols-2 gap-14 items-center mt-10">
        <div class="flex justify-center">
          <div class="img-frame">
            <img
              :src="about.images?.[activeIndex]"
              alt="Foto personal"
              class="profile-img"
            />
          </div>
        </div>

        <div class="space-y-7 text-left md:text-left">
          <p
            v-html="about.description"
            class="hero-text"
          ></p>

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
  .hero-title {
    @apply text-4xl md:text-6xl font-extrabold text-green-500 leading-tight;
  }

  .hero-text {
    @apply text-lg md:text-xl text-gray-300 leading-relaxed;
  }

  .img-frame {
    width: 340px;
    height: 340px;
    border-radius: 50%;
    border: 4px solid #22c55e;
    overflow: hidden;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .btn-main {
    @apply inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl shadow transition-all hover:scale-105;
  }

  .btn-outline {
    @apply inline-flex items-center gap-2 px-5 py-3 border border-green-500 rounded-xl text-gray-200 hover:bg-green-500/20 hover:text-black transition-all hover:scale-105;
  }

  @media (max-width: 768px) {
    .img-frame {
      width: 250px;
      height: 250px;
    }
  }

  .status {
    @apply text-center py-20 text-gray-400 text-lg;
  }
  </style>
