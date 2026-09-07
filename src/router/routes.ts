import AddFeedView from '@/pages/AddFeedView.vue'
import AddGroupView from '@/pages/AddGroupView.vue'
import FrontpageView from '@/pages/FrontpageView.vue'
import LoginView from '@/pages/LoginView.vue'
import RegisterView from '@/pages/RegisterView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Front page', component: FrontpageView },

  { path: '/feeds/new', name: 'Add a feed', component: AddFeedView },
  { path: '/groups/new', name: 'Add a group', component: AddGroupView },

  { path: '/login', name: 'Login', component: LoginView, meta: { noAuth: true } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { noAuth: true } },
]

export default routes
