import { createRouter, createWebHistory } from 'vue-router'
import EstatesView from '@/views/EstatesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/estates',
      name: 'Estates',
      component: EstatesView,
    },
    {
      path: '/',
      redirect: '/estates',
    },
  ],
})

export default router
