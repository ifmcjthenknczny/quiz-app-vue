import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuestionNumberStore = defineStore('questionNumber', () => {
  const questionNumber = ref<number>(0)
  function setQuestionNumber(number: number) {
    questionNumber.value = number
  }

  function incrementQuestionNumber() {
    setQuestionNumber(questionNumber.value + 1)
  }

  return { questionNumber, setQuestionNumber, incrementQuestionNumber }
})