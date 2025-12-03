// src/api/about.ts
import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
})

export async function getAbout() {
  const res = await api.get('/about-me')
  return res.data
}

// Devuelve undefined (no null) para evitar errores TS en <img> y <a>
export function fileUrl(filename?: string | null): string | undefined {
  if (!filename) return undefined
  return `${BASE}/uploads/aboutme/${filename}`
}
