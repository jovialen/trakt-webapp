import FrontpageView from '@/pages/FrontpageView.vue'
import LoginView from '@/pages/LoginView.vue'
import RegisterView from '@/pages/RegisterView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Front page', component: FrontpageView },

  { path: '/login', name: 'Login', component: LoginView, meta: { noAuth: true } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { noAuth: true } },
]

export default routes
