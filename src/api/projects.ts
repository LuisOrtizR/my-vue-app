import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
})

export async function getProjects() {
  const res = await api.get('/projects')
  return res.data
}

export function fileUrl(filename?: string | null): string | undefined {
  if (!filename) return undefined
  return `${BASE}/uploads/projects/${filename}`
}
