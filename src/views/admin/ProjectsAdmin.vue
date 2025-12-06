<script setup lang="ts">
import { ref, onMounted } from "vue";
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  fileUrl 
} from "@/api/projects";

const projects = ref<any[]>([]);
const loading = ref(true);
const saving = ref(false);
const editing = ref(false);
const editingId = ref<number | null>(null);

const form = ref({
  title: "",
  description: "",
  techStack: "",
  link: ""
});

const mainImageFile = ref<File | null>(null);
const previewMainImage = ref<string | undefined>(undefined);

const galleryFiles = ref<File[]>([]);
const previewGallery = ref<string[]>([]);

onMounted(async () => {
  projects.value = await getProjects();
  loading.value = false;
});

function onMainImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  mainImageFile.value = file;
  previewMainImage.value = file ? URL.createObjectURL(file) : undefined;
}

function onGallerySelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = input.files ? Array.from(input.files) as File[] : [];
  galleryFiles.value = files;
  previewGallery.value = files.map(file => URL.createObjectURL(file));
}

async function saveProject() {
  saving.value = true;

  const fd = new FormData();
  fd.append("title", form.value.title);
  fd.append("description", form.value.description);
  fd.append("techStack", form.value.techStack);
  fd.append("link", form.value.link);

  if (mainImageFile.value) fd.append("image", mainImageFile.value);
  galleryFiles.value.forEach(image => fd.append("gallery", image));

  if (editing.value && editingId.value) {
    await updateProject(editingId.value, fd);
  } else {
    await createProject(fd);
  }

  location.reload();
}

function editProject(p: any) {
  editing.value = true;
  editingId.value = p.id;

  form.value.title = p.title;
  form.value.description = p.description;
  form.value.techStack = p.techStack;
  form.value.link = p.link ?? "";
}

async function deleteProjectAction(id: number) {
  if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;
  await deleteProject(id);
  location.reload();
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 text-gray-100">
    <h1 class="text-3xl font-bold mb-6 text-green-400 drop-shadow">Administrar Proyectos</h1>

    <div v-if="loading" class="text-gray-400">Cargando proyectos...</div>

    <div v-else class="space-y-8 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

      <div>
        <h2 class="text-xl font-semibold mb-4" :class="editing ? 'text-blue-400' : 'text-green-300'">
          {{ editing ? "Editar Proyecto" : "Crear Proyecto" }}
        </h2>

        <div class="grid grid-cols-1 gap-5">
          <input v-model="form.title" placeholder="Título" class="input-admin" />
          <textarea v-model="form.description" rows="5" placeholder="Descripción" class="input-admin"></textarea>
          <input v-model="form.techStack" placeholder="Tech Stack" class="input-admin" />
          <input v-model="form.link" placeholder="Link (opcional)" class="input-admin" />

          <div>
            <label class="font-semibold">Imagen Principal</label>
            <input type="file" accept="image/*" @change="onMainImageSelected" class="input-file-admin" />

            <img 
              v-if="previewMainImage" 
              :src="previewMainImage" 
              class="w-40 h-40 object-cover rounded-xl mt-3 border border-gray-700 shadow" 
            />
          </div>

          <div>
            <label class="font-semibold">Galería</label>
            <input type="file" accept="image/*" multiple @change="onGallerySelected" class="input-file-admin" />

            <div v-if="previewGallery.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <img 
                v-for="(img, i) in previewGallery" 
                :key="i" 
                :src="img" 
                class="w-full h-32 object-cover rounded-xl border border-gray-700 shadow" 
              />
            </div>
          </div>

          <button @click="saveProject" :disabled="saving" class="btn-primary mt-4">
            {{ saving ? "Guardando..." : editing ? "Actualizar Proyecto" : "Crear Proyecto" }}
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-3">Proyectos Guardados</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div 
            v-for="p in projects" 
            :key="p.id" 
            class="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg"
          >
            <img 
              v-if="p.image" 
              :src="fileUrl(p.image) ?? ''" 
              class="w-full h-40 object-cover rounded-xl mb-3 border border-gray-700" 
            />

            <h3 class="text-xl font-bold text-green-300">{{ p.title }}</h3>
            <p class="text-gray-300 text-sm mt-1">{{ p.techStack }}</p>
            <p class="text-gray-400 text-sm mt-2 line-clamp-3">{{ p.description }}</p>

            <div class="flex gap-3 mt-4">
              <button @click="editProject(p)" class="btn-secondary">Editar</button>
              <button @click="deleteProjectAction(p.id)" class="btn-danger">Eliminar</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.input-admin {
  @apply w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700
         focus:border-green-500 focus:ring-2 focus:ring-green-600/40 outline-none transition shadow-inner;
}

.input-file-admin {
  @apply block mt-2 text-gray-300 bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg
         file:bg-gray-700 file:text-gray-200 file:border-0 file:px-4 file:py-2 file:mr-4 hover:border-green-500;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-500
         disabled:opacity-50 disabled:cursor-not-allowed transition;
}

.btn-secondary {
  @apply px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-500 transition;
}

.btn-danger {
  @apply px-4 py-2 rounded-lg bg-red-600 text-white shadow hover:bg-red-500 transition;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
