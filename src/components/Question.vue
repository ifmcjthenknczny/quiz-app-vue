<script setup lang="ts">
import { decodeHtml } from '@/helpers/string'
import AnswerButton from './AnswerButton.vue'
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { sortedRange } from '@/helpers/array'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import { toOptionLetter } from '@/helpers/question'

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
</script>

<template>
  <div class="question">
    <div>
    <h5 class="question-text">Question number {{ questionNumberStore.questionNumber + 1 }}</h5>
    <h2>{{ decodeHtml(question) }}</h2>
  </div>

    <div class="answers">
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
.question {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.answers {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}

.question-text {
  margin-bottom: 20px;
}
</style>
