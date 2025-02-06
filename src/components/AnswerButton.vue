<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import Button from './LinkButton.vue'
import { Option, toOptionColor } from '@/helpers/question'
import { computed } from 'vue'

const props = defineProps<{
  option: Option
  answerContent: string
  index: number
  onClick: (questionNumber: number, answerIndex: number) => void
}>()

const questionStore = useQuestions()
const color = computed(() => toOptionColor(props.index))
</script>

<template>
  <button
    @click="() => onClick(questionStore.questionIndex, index)"
    class="answer-button"
    :style="{ backgroundColor: color }"
  >
    {{ option }}: {{ answerContent }}
  </button>
</template>

<style scoped>
.answer-button {
  min-height: 36px;
}
</style>
