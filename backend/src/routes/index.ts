import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '@/views/AdminDashboard.vue'
import AdminResults from '@/views/AdminResults.vue'
import AdminUsers from '@/views/AdminUsers.vue'

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/results', component: AdminResults },
  { path: '/admin/users', component: AdminUsers }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
