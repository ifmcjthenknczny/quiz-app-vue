<script setup lang="ts">
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import LinkButton from '@/components/LinkButtonComponent.vue'

const router = useRouter()

const onClick = () => {
  router.push(routes.quiz)
}
</script>

<template>
  <div class="welcome-container">
    <!-- https://www.favicon.cc/?action=icon&file_id=823471 -->
    <img src="/logo.png" alt="Q" class="logo" />
    <h1>WELCOME TO SPORTS QUIZ</h1>
    <LinkButton :on-click="onClick">Start Quiz</LinkButton>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
}

.logo {
  width: 200px;
  height: auto;
}
</style>
