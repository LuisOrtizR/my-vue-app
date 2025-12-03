import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/reset-password', component: ResetPassword },
    {
      path: '/admin',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login' }
  }
})

export default router
