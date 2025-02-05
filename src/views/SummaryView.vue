<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import { onMounted, computed } from 'vue'

const questionNumberStore = useQuestions()

const correctAnswers = computed(() =>
  Object.entries(questionNumberStore.selectedAnswers)
    .filter(([index, answer]) => questionNumberStore.correctAnswers[+index] === answer)
    .map(([index]) => +index)
)

const router = useRouter()

const onClick = () => {
  questionNumberStore.reset()
  router.push(routes.home)
}

onMounted(() => {
  if (questionNumberStore.answeredQuestions !== QUESTION_COUNT) {
    router.push(routes.home)
  }
})
</script>

<template>
  <div class="summary-container">
    <h1>END OF QUIZ</h1>
    <h5>Your score: {{ correctAnswers.length }} / {{ QUESTION_COUNT }}</h5>
    <button @click="onClick">Restart Quiz</button>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
}
</style>
