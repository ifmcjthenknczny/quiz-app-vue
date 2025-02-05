import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/QuizView.vue'
import SummaryView from '@/views/SummaryView.vue'
import { routes } from '@/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: routes.quiz,
      name: 'quiz',
      component: () => import('../views/BottomView.vue')
    },
    {
      path: routes.summary,
      name: 'Summary',
      component: SummaryView
    }
  ]
})

export default router
