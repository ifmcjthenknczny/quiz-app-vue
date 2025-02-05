<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'

defineProps<{
  questionsCount: number
}>()
useQuestions
const questionNumberStore = useQuestionNumberStore()

const decrementQuestionNumber = () => {
  questionNumberStore.questionNumber--
}

const setQuestionNumber = (questionNumber: number) => {
  questionNumberStore.questionNumber = questionNumber
}

const incrementQuestionNumber = () => {
  questionNumberStore.questionNumber++
}
</script>

<template>
  <div class="question">
    <RouterLink to="/">Back</RouterLink>
    <RouterLink to="/about">{{
      questionNumberStore.questionNumber + 1 >= questionsCount ? 'Finish' : 'Next'
    }}</RouterLink>
  </div>
</template>

<style scoped></style>
