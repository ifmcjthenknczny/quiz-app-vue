<script setup lang="ts">
import { decodeHtml } from '@/helpers/string'
import AnswerButton from './AnswerButton.vue'
import type { Option } from './AnswerButton.vue'
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { sortedRange } from '@/helpers/array'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'

defineProps<{
  question: string
  answers: string[]
}>()

const router = useRouter()
const questionNumberStore = useQuestions()

const handleAnswerClick = (questionNumber: number, answerIndex: number) => {
  questionNumberStore.selectedAnswers[questionNumber] = answerIndex

  const nextQuestionNumber = sortedRange(0, QUESTION_COUNT - 1, questionNumber).filter(
    (key) => !questionNumberStore.selectedAnswers.hasOwnProperty(key)
  )[0]

  if (Object.keys(questionNumberStore.selectedAnswers).length < QUESTION_COUNT) {
    questionNumberStore.questionNumber = nextQuestionNumber
    return
  }
  router.push(routes.summary)
}

const toOptionLetter = (index: number): Option => {
  return String.fromCharCode(65 + index)
}
</script>

<template>
  <div class="question-container">
    <h5 class="question-number">Question number {{ questionNumberStore.questionNumber + 1 }}</h5>
    <h2 class="question-text">{{ decodeHtml(question) }}</h2>

    <div class="answers-container">
      <AnswerButton
        v-for="(answer, index) in answers"
        :key="index"
        :index="index"
        :option="toOptionLetter(index)"
        :answerContent="decodeHtml(answer)"
        @click="handleAnswerClick"
      />
    </div>
  </div>
</template>

<style scoped>
.question-text {
  margin-bottom: 20px;
}

.answers-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
