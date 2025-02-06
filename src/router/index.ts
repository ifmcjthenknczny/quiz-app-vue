import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/WelcomeView.vue'
import SummaryView from '@/views/SummaryView.vue'
import { routes } from '@/routes'
import QuizView from '../views/QuizView.vue'

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
      component: QuizView
    },
    {
      path: routes.summary,
      name: 'Summary',
      component: SummaryView
    }
  ]
})

export default router
