<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { computed } from 'vue'
import { toQuestionIndex, toQuestionNumber } from '@/helpers/question'

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
</script>

<template>
  <button
    class="question-link"
    :class="{
      answered: answered,
      current: questionNumber === toQuestionNumber(questionStore.currentQuestionIndex)
    }"
    @click="() => onClick(questionIndex)"
  >
    {{ questionNumber }}
  </button>
</template>

<style scoped>
.question-link {
  height: 24px;
  width: 24px;
  border: 1px solid black;
  border-radius: 4px;
}
.answered {
  background-color: green;
}

.current {
  background-color: gold;
}
</style>
