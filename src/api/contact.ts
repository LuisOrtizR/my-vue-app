import axios from "axios"

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
})

export async function sendContact(data: {
  name: string
  email: string
  message: string
}) {
  const res = await api.post('/contact', data)
  return res.data
}
