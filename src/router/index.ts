import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Projects from '@/views/Projects.vue'
import Contact from '@/views/Contact.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import About from '@/views/About.vue'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword },
  {
  path: "/admin",
  component: AdminLayout,
  meta: { requiresAuth: true },
  children: [
    { path: "", redirect: "/admin/about" },

    { path: "about", component: () => import("@/views/admin/AboutAdmin.vue") },
    { path: "contacts", component: () => import("@/views/admin/ContactsAdmin.vue") },
    { path: "projects", component: () => import("@/views/admin/ProjectsAdmin.vue") },
  ]
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next("/login");
  }

  next();
});


export default router
