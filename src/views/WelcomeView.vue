<script setup lang="ts">
import { useRouter } from 'vue-router'
import { routes } from '@/routes'

const router = useRouter()

const onClick = () => {
  router.push(routes.quiz)
}
</script>

<template>
  <div class="welcome-container">
    <h1>WELCOME TO SPORTS QUIZ</h1>
    <button @click="onClick" class="start-button">Start Quiz</button>
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

.start-button {
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 12px;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 128px;
}
</style>
