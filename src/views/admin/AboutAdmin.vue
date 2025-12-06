<template>
  <div class="max-w-4xl mx-auto p-6 text-gray-100">
    <h1 class="text-3xl font-bold mb-6 text-green-400 drop-shadow">Editar About Me</h1>

    <div v-if="loading" class="text-gray-400">Cargando...</div>

    <div v-else class="space-y-8 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

      <div>
        <label class="font-semibold text-lg">Descripción</label>
        <textarea
          v-model="description"
          rows="8"
          class="w-full mt-3 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700
                 focus:border-green-500 focus:ring-2 focus:ring-green-600/40 outline-none transition
                 shadow-inner resize-none"
        ></textarea>
      </div>

      <div>
        <label class="font-semibold text-lg">Currículum (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          @change="onCvSelected"
          class="block mt-3 text-gray-300 bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg
                 file:bg-gray-700 file:text-gray-200 file:border-0 file:px-4 file:py-2 file:mr-4 hover:border-green-500"
        />

        <div v-if="about?.cv" class="mt-3">
          <a
            :href="about.cv"
            target="_blank"
            class="text-green-400 underline hover:text-green-300"
          >
            Ver CV actual
          </a>
        </div>
      </div>

      <div>
        <label class="font-semibold text-lg">Imágenes</label>

        <input
          type="file"
          accept="image/*"
          multiple
          @change="onImagesSelected"
          class="block mt-3 text-gray-300 bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg
                 file:bg-gray-700 file:text-gray-200 file:border-0 file:px-4 file:py-2 file:mr-4 hover:border-green-500"
        />

        <div
          v-if="previewImages.length"
          class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
        >
          <img
            v-for="(img, i) in previewImages"
            :key="i"
            :src="img"
            class="w-full h-32 object-cover rounded-xl border border-gray-700 shadow"
          />
        </div>

        <div v-if="about?.images?.length && !previewImages.length" class="mt-4">
          <h3 class="font-medium mb-2 text-gray-300">Imágenes actuales:</h3>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img
              v-for="(img, i) in about.images"
              :key="i"
              :src="img"
              class="w-full h-32 object-cover rounded-xl border border-gray-700"
            />
          </div>
        </div>
      </div>

      <div class="pt-4">
        <button
          @click="save"
          :disabled="saving"
          class="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-500
                   disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {{ saving ? "Guardando..." : "Guardar Cambios" }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAbout, saveAbout } from "@/api/about";

const about = ref<any>(null);
const description = ref("");
const cvFile = ref<File | null>(null);
const imagesFiles = ref<File[]>([]);
const previewImages = ref<string[]>([]);

const loading = ref(true);
const saving = ref(false);

onMounted(async () => {
  about.value = await getAbout();
  description.value = about.value?.description ?? "";
  loading.value = false;
});

function onCvSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  cvFile.value = input.files?.[0] ?? null;
}

function onImagesSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  imagesFiles.value = Array.from(input.files);
  previewImages.value = imagesFiles.value.map(file => URL.createObjectURL(file));
}

async function save() {
  saving.value = true;

  const form = new FormData();
  form.append("description", description.value);

  if (cvFile.value) form.append("cv", cvFile.value);
  imagesFiles.value.forEach(image => form.append("images", image));

  await saveAbout(form);
  window.location.reload();

  saving.value = false;
}
</script>

<style scoped></style>
