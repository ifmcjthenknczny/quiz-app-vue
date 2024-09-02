import { defineStore } from 'pinia'

export const useQuestionNumberStore = defineStore('questionNumber', {
  state: () => ({ questionNumber: 0 })
})