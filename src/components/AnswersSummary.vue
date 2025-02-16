<script setup lang="ts">
import { divideToCorrectAndWrongAnswers } from '@/helpers/question'
import { useQuestions } from '@/store/useQuestions'
import AnswerSummaryCell from './AnswerSummaryCell.vue'

const questionsStore = useQuestions()
const { correct } = divideToCorrectAndWrongAnswers(
  questionsStore.selectedAnswers,
  questionsStore.correctAnswers
)

const allAnswers = Object.entries(questionsStore.selectedAnswers).map(
  ([questionIndex, answerIndex]) => {
    const isCorrect = correct.some((r) => r === +questionIndex)
    return {
      questionIndex: questionIndex,
      answerIndex: answerIndex,
      isCorrect: isCorrect
    }
  }
)
</script>

<template>
  <div class="answers-summary-grid">
    <AnswerSummaryCell
      v-for="(answer, index) in allAnswers"
      :key="index"
      :question-index="+answer.questionIndex"
      :answer-index="answer.answerIndex"
      :is-correct="answer.isCorrect"
    />
  </div>
</template>

<style>
.answers-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  height: fit-content;
}
</style>
