import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API = `${BASE}/projects`;

/** Devuelve la URL final del archivo */
export const fileUrl = (filename?: string | null): string | null => {
  if (!filename) return null;
  return `${BASE}/uploads/projects/${filename}`;
};

// Obtener todos los proyectos
export function getProjects() {
  return axios.get(API).then((res) => res.data);
}

// Obtener un solo proyecto
export function getProject(id: number) {
  return axios.get(`${API}/${id}`).then((res) => res.data);
}

// Crear proyecto
export function createProject(data: FormData) {
  return axios.post(API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Actualizar proyecto
export function updateProject(id: number, data: FormData) {
  return axios.put(`${API}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Eliminar proyecto
export function deleteProject(id: number) {
  return axios.delete(`${API}/${id}`);
}
