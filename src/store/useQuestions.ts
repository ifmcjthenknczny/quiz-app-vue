import { sortedRange } from './../helpers/array'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { QUESTION_COUNT } from '@/config'

export const useQuestions = defineStore('questions', () => {
  const questionIndex = ref(0)
  const selectedAnswers = ref<Record<number, number>>({})
  const correctAnswers = ref<Record<number, number>>({})

  function reset() {
    questionIndex.value = 0
    selectedAnswers.value = {}
    correctAnswers.value = {}
  }

  function selectAnswer(questionNumber: number, answer: number) {
    selectedAnswers.value[questionNumber] = answer
  }

  function setCorrectAnswers(answers: Record<number, number>) {
    correctAnswers.value = answers
  }

  function setQuestionNumber(number: number) {
    questionIndex.value = number
  }

  const nextQuestionIndex = computed(
    () =>
      sortedRange(0, QUESTION_COUNT - 1, questionIndex.value).filter(
        (key) => !(key in selectedAnswers.value)
      )[0]
  )

  const totalQuestions = computed(() => Object.keys(correctAnswers.value).length)
  const answeredQuestions = computed(() => Object.keys(selectedAnswers.value).length)

  return {
    questionIndex,
    selectedAnswers,
    correctAnswers,
    reset,
    selectAnswer,
    setCorrectAnswers,
    setQuestionNumber,
    nextQuestionIndex,
    totalQuestions,
    answeredQuestions
  }
})
