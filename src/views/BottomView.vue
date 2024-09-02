<script setup lang="ts">
import { useQuestionNumberStore } from '@/store/useQuestionNumberStore';

defineProps<{
  questionsCount: number
}>()

const questionNumberStore = useQuestionNumberStore();

const decrementQuestionNumber = () => {
  questionNumberStore.questionNumber--
}

const setQuestionNumber = (questionNumber: number) => {
  questionNumberStore.questionNumber = questionNumber
}

const incrementQuestionNumber = () => {
  questionNumberStore.questionNumber++
}

</script>

<template>
    <div class="question">

        <RouterLink to="/">Back</RouterLink>
        <RouterLink to="/about">{{ questionNumberStore.questionNumber + 1 >= questionsCount ? 'Finish' : 'Next' }}</RouterLink>
    </div>
</template>

<style scoped>

</style>
