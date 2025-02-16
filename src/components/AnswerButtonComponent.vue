<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import { Option, toOptionColor } from '@/helpers/question'
import { computed } from 'vue'

const props = defineProps<{
  option: Option
  answerContent: string
  index: number
  onClick: (questionIndex: number, answerIndex: number) => void
}>()

const questionStore = useQuestions()
const color = computed(() => toOptionColor(props.index))
</script>

<template>
  <button
    class="answer-button"
    :style="{ backgroundColor: color }"
    @click="() => onClick(questionStore.currentQuestionIndex, index)"
  >
    <span class="answer-letter">{{ option }}:</span> {{ answerContent }}
  </button>
</template>

<style scoped>
.answer-button {
  min-height: 36px;
  border: 1px solid black;
  cursor: pointer;
}
.answer-letter {
  font-weight: 700;
}
</style>
