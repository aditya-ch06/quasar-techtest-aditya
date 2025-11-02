import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'stores/auth'

export default route(function () {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })

  router.beforeEach((to) => {
    const auth = useAuthStore()

    if (!auth.isAuthenticated && to.path !== '/login') {
      return '/login'
    }
    if (auth.isAuthenticated && to.path === '/login') {
      return '/'
    }

    const requiredRole = to.meta?.role as string | undefined
    if (requiredRole && auth.user?.role !== requiredRole) {
      // Optional: redirect unauthorized users to dashboard or 403 page
      return '/403'
    }
    
    return true
  })

  return router
})
