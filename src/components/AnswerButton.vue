<script setup lang="ts">
import Button from './Button.vue'
export type Option = 'A | B | C | D'

defineProps<{
    option: Option
    answerContent: string
    questionNumber: number
    onClick: (questionNumber: number, answer: string) => void
}>()
</script>

<template>
    <Button @click="() => onClick(questionNumber, answerContent)" :content="`${option}: ${answerContent}`"" />
</template>

<style scoped>

</style>