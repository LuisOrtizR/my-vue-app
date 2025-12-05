<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { getProjects, fileUrl } from "@/api/projects";

import {
  GlobeAltIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CpuChipIcon,
  UserGroupIcon,
  BoltIcon,
} from "@heroicons/vue/24/solid";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  image?: string | null;
  gallery?: (string | null)[];
  link?: string | null;
};

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const galleryIndex = ref<Record<number, number>>({});
let intervalId: any;

const zoomImage = ref<string | undefined>(undefined);

const safeFileUrl = (path?: string | null): string | undefined =>
  path ? fileUrl(path) : undefined;

const getIndex = (p: Project): number => galleryIndex.value[p.id] ?? 0;

const startCarousel = () => {
  intervalId = setInterval(() => {
    projects.value.forEach((project) => {
      if (project.gallery && project.gallery.length > 2) {
        const id = project.id;
        galleryIndex.value[id] =
          ((galleryIndex.value[id] ?? 0) + 1) % project.gallery.length;
      }
    });
  }, 3000);
};

const stopCarousel = () => clearInterval(intervalId);

const loadProjects = async () => {
  loading.value = true;
  try {
    const data = await getProjects();
    projects.value = data ?? [];
    projects.value.forEach((p) => (galleryIndex.value[p.id] = 0));
    startCarousel();
  } catch (err: any) {
    error.value = err?.message || "Error cargando proyectos";
  } finally {
    loading.value = false;
  }
};

onMounted(loadProjects);
onUnmounted(stopCarousel);
</script>

<template>
  <section class="py-24 px-5 max-w-7xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl font-extrabold text-green-500 mb-6">
      Servicios de Desarrollo
    </h1>

    <div class="grid md:grid-cols-3 gap-8 mb-20">
      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <GlobeAltIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Sitios Web Responsivos</h3>
        <p class="text-gray-300">Páginas modernas, rápidas y optimizadas para móviles con excelente UX.</p>
      </div>

      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <UserGroupIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Roles y Permisos</h3>
        <p class="text-gray-300">Sistemas con gestión avanzada de usuarios, autenticación segura y administración interna.</p>
      </div>

      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <CreditCardIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Pasarelas de Pago</h3>
        <p class="text-gray-300">Plataformas de pedidos, inventarios y pagos con Stripe, PayPal o Wompi.</p>
      </div>

      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <ShieldCheckIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Seguridad Avanzada</h3>
        <p class="text-gray-300">Hashing, encriptación, reglas de seguridad en BD y protección de datos.</p>
      </div>

      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <CpuChipIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Lógica y Backend</h3>
        <p class="text-gray-300">APIs, procesamiento de datos, automatización y lógica avanzada.</p>
      </div>

      <div class="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl hover:scale-105 transition-all">
        <BoltIcon class="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-green-400 mb-2">Infraestructura Optimizada</h3>
        <p class="text-gray-300">Despliegues económicos, escalables y con bajo costo de mantenimiento.</p>
      </div>
    </div>

    <h2 class="text-4xl md:text-5xl font-bold text-green-500 mb-10">Proyectos Realizados</h2>

    <p class="text-gray-300 max-w-3xl mx-auto mb-16 text-lg">
      Aquí encontrarás proyectos reales desarrollados con tecnologías modernas, optimización avanzada y enfoque en seguridad, rendimiento y escalabilidad.
    </p>

    <p v-if="loading" class="text-gray-400 text-lg py-20">Cargando proyectos...</p>
    <p v-if="error" class="text-red-500 text-lg py-20">{{ error }}</p>

    <div v-if="projects.length" class="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all border border-gray-700"
      >
        <img v-if="project.image" :src="safeFileUrl(project.image)" class="w-full h-56 object-cover" />

        <div class="p-6 text-left">
          <h2 class="text-2xl font-bold text-green-400 mb-2">{{ project.title }}</h2>

          <p class="text-gray-300 mb-3">{{ project.description }}</p>
          <p class="text-gray-400 italic mb-4">Tech Stack: {{ project.techStack }}</p>

          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            class="inline-block px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-all font-semibold"
          >
            Ver Proyecto
          </a>

          <div v-if="project.gallery?.length" class="mt-4">
            <div v-if="project.gallery.length <= 2" class="grid grid-cols-2 gap-2">
              <img
                v-for="img in project.gallery"
                :key="img ?? undefined"
                :src="safeFileUrl(img)"
                class="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                @click="zoomImage = safeFileUrl(img)"
              />
            </div>

            <div v-else class="relative h-32 overflow-hidden rounded-md">
              <transition name="fade" mode="out-in">
                <img
                  v-if="project.gallery[getIndex(project)]"
                  :key="getIndex(project)"
                  :src="safeFileUrl(project.gallery[getIndex(project)])"
                  class="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                  @click="zoomImage = safeFileUrl(project.gallery[getIndex(project)])"
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="zoomImage"
      class="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
      @click="zoomImage = undefined"
    >
      <img :src="zoomImage" class="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl border border-gray-700" />
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
