<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import { onMounted } from 'vue'
import LinkButton from '@/components/LinkButtonComponent.vue'
import { divideToCorrectAndWrongAnswers } from '@/helpers/question'
import SummaryChart from '@/components/SummaryChart.vue'
import AnswersSummary from '@/components/AnswersSummary.vue'

const questionStore = useQuestions()

const correctAnswersCount = divideToCorrectAndWrongAnswers(
  questionStore.selectedAnswers,
  questionStore.correctAnswers
).correct.length

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
    <h5>Your score: {{ correctAnswersCount }} / {{ QUESTION_COUNT }}</h5>
    <div class="charts-container">
      <AnswersSummary />
      <SummaryChart />
    </div>
    <LinkButton @click="onClick"> Restart Quiz </LinkButton>
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

.charts-container {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 12px;
  align-items: center;
  gap: 20px;
}
</style>
