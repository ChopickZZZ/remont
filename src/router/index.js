import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '../components/AppMain'
import AppSign from '../components/AppSign'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      component: AppMain
    },
    {
      path: '/signIn',
      component: AppSign
    },
    {
      path: '/notFound(.*)',
      redirect: AppMain
    }
  ]
})

export default router
