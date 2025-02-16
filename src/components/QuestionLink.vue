<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { computed } from 'vue'
import { toOptionLetter, toQuestionIndex } from '@/helpers/question'

const props = defineProps<{
  questionNumber: number
  content?: string
  highlightIfAnswered?: true
}>()

const questionStore = useQuestions()

const questionIndex = toQuestionIndex(props.questionNumber)

const onClick = (questionIndex: number) => {
  questionStore.setQuestionIndex(questionIndex)
}

const answered = computed(() => `${questionIndex}` in questionStore.selectedAnswers)

const answer = computed(() => {
  return toOptionLetter(questionStore.selectedAnswers[questionIndex])
})
</script>

<template>
  <button @click="() => onClick(questionIndex)">
    {{ highlightIfAnswered && answered ? answer : (content ?? questionNumber) }}
  </button>
</template>

<style scoped></style>
