<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import { onMounted, computed } from 'vue'
import LinkButton from '@/components/LinkButton.vue'

const questionStore = useQuestions()

const correctAnswers = computed(() =>
  Object.entries(questionStore.selectedAnswers)
    .filter(([index, answer]) => questionStore.correctAnswers[+index] === answer)
    .map(([index]) => +index)
)

const router = useRouter()

const onClick = () => {
  questionStore.reset()
  router.push(routes.quiz)
}

onMounted(() => {
  if (questionStore.answeredQuestions !== QUESTION_COUNT) {
    router.push(routes.quiz)
  }
})
</script>

<template>
  <div class="summary-container">
    <h1>END OF QUIZ</h1>
    <h5>Your score: {{ correctAnswers.length }} / {{ QUESTION_COUNT }}</h5>
    <LinkButton @click="onClick">
      Restart Quiz
    </LinkButton>
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
