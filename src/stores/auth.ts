import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem("token") || null,
    expiresIn: localStorage.getItem("expiresIn") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(token: string, expiresIn: string) {
      this.token = token;
      this.expiresIn = expiresIn;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn);
    },
    logout() {
      this.token = null;
      this.expiresIn = null;
      localStorage.clear();
    }
  }
});
