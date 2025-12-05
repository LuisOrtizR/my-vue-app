import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    expiresIn: localStorage.getItem("expiresIn") || null,
    userEmail: localStorage.getItem("userEmail") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(token: string, expiresIn: string, email: string) {
      this.token = token;
      this.expiresIn = expiresIn;
      this.userEmail = email;

      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn);
      localStorage.setItem("userEmail", email);
    },

    logout() {
      this.token = null;
      this.expiresIn = null;
      this.userEmail = null;

      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("userEmail");
    }
  }
});
