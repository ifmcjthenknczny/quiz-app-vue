<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import Button from './Button.vue'
export type Option = string

defineProps<{
  option: Option
  answerContent: string
  index: number
  onClick: (questionNumber: number, answerIndex: number) => void
}>()

const questionNumberStore = useQuestions()
</script>

<template>
  <Button
    @click="() => onClick(questionNumberStore.questionNumber, index)"
    :content="`${option}: ${answerContent}`"
  />
</template>

<style scoped></style>
