<script setup lang="ts">
import { decodeHtml } from '@/helpers/string'
import AnswerButton from './AnswerButton.vue'
import type { Option } from './AnswerButton.vue'
import { useQuestionNumberStore } from '@/store/useQuestionNumberStore'

defineProps<{
  question: string
  answers: string[]
}>()

const questionNumberStore = useQuestionNumberStore()

const handleAnswerClick = (questionNumber: number, answerIndex: number) => {
  questionNumberStore.questionNumber = questionNumberStore.questionNumber + 1;
  console.log(`Question ${questionNumber}: Selected answer ${answerIndex}`)
}

const toOptionLetter = (index: number): Option => {
  return String.fromCharCode(65 + index)
}
</script>

<template>
  <div>
    <h5>Question number {{ questionNumberStore.questionNumber + 1 }}</h5>
    <h2>{{ decodeHtml(question) }}</h2>

    <div>
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
h2 {
  margin-bottom: 20px;
}

div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
