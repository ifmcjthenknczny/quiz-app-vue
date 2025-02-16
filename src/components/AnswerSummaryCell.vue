<script lang="ts" setup>
import { toOptionLetter, toQuestionNumber } from '@/helpers/question'

const props = defineProps<{
  questionIndex: number
  answerIndex: number
  isCorrect: boolean
}>()
</script>

<template>
  <div class="answer-summary-cell">
    <div class="answer-summary-half-cell">
      {{ toQuestionNumber(props.questionIndex) }}
    </div>
    <div
      class="answer-summary-half-cell"
      :class="{ correct: props.isCorrect, wrong: !props.isCorrect }"
    >
      {{ toOptionLetter(props.answerIndex) }}
    </div>
  </div>
</template>

<style>
.correct {
  background-color: green;
}
.wrong {
  background-color: red;
}
.answer-summary-half-cell {
  border: 1px solid white;
  font-size: 1.2rem;
  width: 1.8rem;
  text-align: center;
}
.answer-summary-cell {
  display: flex;
  flex-direction: row;
}
</style>
