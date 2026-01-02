import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Home from '@/views/Home/Home.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { redirectIfAuthenticated, auth } from '@/middlewares/guard'



const routes = [
  {
    path: '/login',
    component: () => LoginLayout,
    beforeEnter: redirectIfAuthenticated,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      },
    ],
  },
  {
    path: '/',

    beforeEnter: auth,
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
