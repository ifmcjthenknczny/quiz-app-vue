<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'

defineProps<{
  questionNumber: number
  content?: string
  highlightIfAnswered?: true
}>()

const questionNumberStore = useQuestions()

const onClick = (questionNumber: number) => {
  questionNumberStore.questionNumber = questionNumber
}
</script>

<template>
  <button
    @click="() => onClick(questionNumber - 1)"
    :class="{
      answered:
        highlightIfAnswered &&
        questionNumberStore.selectedAnswers.hasOwnProperty(questionNumber - 1)
    }"
  >
    {{ content ?? questionNumber }}
  </button>
</template>

<style scoped>
.answered {
  background-color: green;
}
</style>
