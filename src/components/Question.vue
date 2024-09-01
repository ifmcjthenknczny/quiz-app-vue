<script setup lang="ts">
import AnswerButton from './AnswerButton.vue'
import type {Option} from './AnswerButton.vue'

defineProps<{
    question: string
    answers: {option: Option, content: string}[]
    questionNumber: number
}>()

const handleAnswerClick = (questionNumber: number, answer: string) => {
  console.log(`Question ${questionNumber}: Selected answer ${answer}`)
}
</script>

<template>
  <div>
    <h2>{{ question }}</h2>

    <div>
      <AnswerButton
        v-for="(answer, index) in answers"
        :key="index"
        :option="answer.option"
        :answerContent="answer.content"
        :questionNumber="questionNumber"
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
