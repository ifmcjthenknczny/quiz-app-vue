<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { shuffle } from '@/helpers/array'
import Question from '@/components/Question.vue'
import { useQuestionNumberStore } from '@/store/useQuestionNumberStore'

type QuestionData = {
  type: 'boolean' | 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type QuizElement = Pick<QuestionData, 'question'> & { options: string[]; correctOption: number }
type Quiz = QuizElement[]

const quiz = ref<Quiz | null>(null)
const isLoading = ref(true)
const error = ref<null | string>(null)
const FETCH_URL = 'https://opentdb.com/api.php?amount=12&category=21&difficulty=easy&type=multiple'

type ApiQuestionsResponse = {
  response_code: number
  results: QuestionData[]
}

const toQuizElement = (questionData: QuestionData): QuizElement => {
  const options =
    questionData.type === 'boolean'
      ? ['True', 'False']
      : shuffle([questionData.correct_answer, ...questionData.incorrect_answers])
  const correctOption = options.findIndex((option) => option === questionData.correct_answer)

  return {
    question: questionData.question,
    options,
    correctOption
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get<ApiQuestionsResponse>(FETCH_URL)
    if (!response.data || response.data.response_code !== 0) {
      throw new Error('Failed to fetch data')
    }
    quiz.value = response.data.results.map(toQuizElement)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const { questionNumber } = useQuestionNumberStore()
</script>

<template>
  <main>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">Error: {{ error }}</div>

    <div v-else-if="quiz">
      <Question
        :question="quiz[questionNumber]?.question"
        :answers="quiz[questionNumber]?.options"
      />
    </div>
  </main>
</template>

<style scoped></style>
