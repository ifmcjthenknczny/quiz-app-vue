import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestions = defineStore('questions', () => {
  const questionNumber = ref(0)
  const selectedAnswers = ref<Record<number, number>>({})
  const correctAnswers = ref<Record<number, number>>({})

  function reset() {
    questionNumber.value = 0
    selectedAnswers.value = {}
    correctAnswers.value = {}
  }

  function selectAnswer(questionNumber: number, answer: number) {
    selectedAnswers.value[questionNumber] = answer
  }

  function setCorrectAnswers(answers: Record<number, number>) {
    correctAnswers.value = answers
  }

  function decrementQuestionNumber() {
    questionNumber.value--
  }

  function setQuestionNumber(number: number) {
    questionNumber.value = number
  }

  function incrementQuestionNumber() {
    questionNumber.value++
  }

  const totalQuestions = computed(() => Object.keys(correctAnswers.value).length)
  const answeredQuestions = computed(() => Object.keys(selectedAnswers.value).length)

  return {
    questionNumber,
    selectedAnswers,
    correctAnswers,
    reset,
    selectAnswer,
    setCorrectAnswers,
    decrementQuestionNumber,
    setQuestionNumber,
    incrementQuestionNumber,
    totalQuestions,
    answeredQuestions
  }
})
