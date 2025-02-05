<script setup lang="ts">
import { useQuestions } from '@/store/useQuestions'
import Button from './Button.vue'
import { Option, toOptionColor } from '@/helpers/question'
import { computed } from 'vue';

const props = defineProps<{
  option: Option
  answerContent: string
  index: number
  onClick: (questionNumber: number, answerIndex: number) => void
}>()

const questionNumberStore = useQuestions()
const color = computed(() => toOptionColor(props.index))
</script>

<template>
  <Button
    @click="() => onClick(questionNumberStore.questionNumber, index)"
    :content="`${option}: ${answerContent}`"
    class="answer-button"
    :style="{ backgroundColor: color }"
  />
</template>

<style scoped>
.answer-button {
  min-height: 36px;
}
</style>
