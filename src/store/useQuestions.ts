import { sortedRange } from './../helpers/array'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { QUESTION_COUNT } from '@/config'

export const useQuestions = defineStore('questions', () => {
  const currentQuestionIndex = ref(0)
  const selectedAnswers = ref<Record<number, number>>({})
  const correctAnswers = ref<Record<number, number>>({})
  const timeStarted = ref<number>(Date.now())
  const timeSpent = ref<Record<number, number>>({})

  function reset() {
    currentQuestionIndex.value = 0
    selectedAnswers.value = {}
    correctAnswers.value = {}
    timeStarted.value = Date.now()
    timeSpent.value = {}
  }

  function setCorrectAnswers(answers: Record<number, number>) {
    correctAnswers.value = answers
  }

  function setNewTimeStarted() {
    timeStarted.value = Date.now()
  }

  function addTimeSpent(questionIndex: number) {
    const timeForAnswer = Date.now() - timeStarted.value
    if (!timeSpent.value[questionIndex]) {
      timeSpent.value[questionIndex] = timeForAnswer
      return
    }
    timeSpent.value[questionIndex] += timeForAnswer
  }

  function setQuestionIndex(nextQuestionIndex: number) {
    addTimeSpent(currentQuestionIndex.value)
    currentQuestionIndex.value = nextQuestionIndex
    setNewTimeStarted()
  }

  function selectAnswer(questionIndex: number, answer: number) {
    selectedAnswers.value[questionIndex] = answer
  }

  const nextQuestionIndex = computed(
    () =>
      sortedRange(0, QUESTION_COUNT - 1, currentQuestionIndex.value).filter(
        (key) => !(key in selectedAnswers.value)
      )[0]
  )

  const totalQuestions = computed(() => Object.keys(correctAnswers.value).length)
  const answeredQuestions = computed(() => Object.keys(selectedAnswers.value).length)

  return {
    currentQuestionIndex,
    selectedAnswers,
    correctAnswers,
    reset,
    selectAnswer,
    setCorrectAnswers,
    setQuestionIndex,
    nextQuestionIndex,
    totalQuestions,
    answeredQuestions,
    timeSpent,
    addTimeSpent
  }
})
