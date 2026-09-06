import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { routerAuthGuard } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(routerAuthGuard)

export default router
