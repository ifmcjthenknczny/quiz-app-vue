<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { computed } from 'vue'
import { toOptionLetter } from '@/helpers/question';

const props = defineProps<{
  questionNumber: number
  content?: string
  highlightIfAnswered?: true
}>()

const questionNumberStore = useQuestions()

const onClick = (questionNumber: number) => {
  questionNumberStore.setQuestionNumber(questionNumber)
}

const answered = computed(() => {
  return questionNumberStore.selectedAnswers.hasOwnProperty(props.questionNumber - 1)
})

const answer = computed(() => {
  return toOptionLetter(questionNumberStore.selectedAnswers[props.questionNumber - 1])
})
</script>

<template>
  <button
    @click="() => onClick(questionNumber - 1)"
  >
    {{ highlightIfAnswered &&
        answered ? answer : content ?? questionNumber }}
  </button>
</template>

<style scoped>
.answered {
  background-color: green;
}
</style>
