import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/auth`,
});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export const loginApi = (email: string, password: string) =>
  api.post("/login", { email, password });

export const forgotApi = (email: string) =>
  api.post("/forgot-password", { email });

export const resetApi = (token: string, newPassword: string) =>
  api.post("/reset-password", { token, newPassword });
