import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Home from '@/views/Home/Home.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { redirectIfAuthenticated, auth } from '@/middlewares/guard'
import SiteLayout from '@/layouts/SiteLayout.vue'
import LandingHome from '@/views/Landing/LandingHome.vue'



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
    path: '/painel',

    beforeEnter: auth,
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/painel/tenants',
        name: 'tenants',
        component: () => import('@/views/Tenant/Index.vue')
      },
      {
        path: 'tenant',
        name: 'tenant.create',
        component: () => import('@/views/Tenant/Create.vue')

      },
      {
        path: 'tenant/:id',
        name: 'tenant.update',
        component: () => import('@/views/Tenant/Update.vue')

      },
      {
        path: '/cadastros/status',
        name: 'status',
        component: () => import('@/views/Status/Index.vue')

      }
    ],
  },
  {
    path: '/',
    component: SiteLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: LandingHome
      },
    ],

  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
