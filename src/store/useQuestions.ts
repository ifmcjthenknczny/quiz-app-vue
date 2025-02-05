import { defineStore } from 'pinia'

export const defaultState = {
  questionNumber: 0,
  selectedAnswers: {} as Record<number, number>,
  correctAnswers: {} as Record<number, number>
}

export const useQuestions = defineStore('questions', {
  state: () => (defaultState)
})
