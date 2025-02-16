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
    {{ option }}: {{ answerContent }}
  </button>
</template>

<style scoped>
.answer-button {
  min-height: 36px;
}
</style>
