<script setup lang="ts">
import { useQuestionNumberStore } from '@/store/useQuestionNumberStore'
import Button from './Button.vue'
export type Option = string

defineProps<{
  option: Option
  answerContent: string
  index: number
  onClick: (questionNumber: number, answerIndex: number) => void
}>()

const { questionNumber } = useQuestionNumberStore()
</script>

<template>
  <Button @click="() => onClick(questionNumber, index)" :content="`${option}: ${answerContent}`" />
</template>

<style scoped></style>
