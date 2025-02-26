<script setup lang="ts">
import { decodeHtml } from '@/helpers/string'
import AnswerButton from './AnswerButtonComponent.vue'
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import { useRouter } from 'vue-router'
import { routes } from '@/routes'
import { toOptionLetter } from '@/helpers/question'
import { toQuestionNumber } from '@/helpers/question'

defineProps<{
  question: string
  answers: string[]
}>()

const router = useRouter()
const questionStore = useQuestions()

const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
  questionStore.selectAnswer(questionIndex, answerIndex)

  if (Object.keys(questionStore.selectedAnswers).length >= QUESTION_COUNT) {
    questionStore.addTimeSpent(questionIndex)
    router.push(routes.summary)
    return
  } else {
    questionStore.setQuestionIndex(questionStore.nextQuestionIndex)
  }
}
</script>

<template>
  <div class="question">
    <div>
      <h5 class="question-text">
        Question number {{ toQuestionNumber(questionStore.currentQuestionIndex) }}
      </h5>
      <h2>{{ decodeHtml(question) }}</h2>
    </div>

    <div class="answers">
      <AnswerButton
        v-for="(answer, index) in answers"
        :key="index"
        :index="index"
        :option="toOptionLetter(index)"
        :answer-content="decodeHtml(answer)"
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
