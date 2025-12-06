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

export async function saveAbout(formData: FormData) {
  return await api.post('/about-me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
