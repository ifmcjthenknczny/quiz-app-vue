<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { shuffle } from '@/helpers/array'
import Question from '@/components/QuestionComponent.vue'
import QuestionLink from '@/components/QuestionLinkComponent.vue'
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'
import ErrorMessage from '@/components/ErrorMessageComponent.vue'
import Loader from '@/components/LoaderComponent.vue'

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
const FETCH_URL = `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=21&difficulty=easy&type=multiple`

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

const questionStore = useQuestions()

const fetchData = async () => {
  try {
    const response = await axios.get<ApiQuestionsResponse>(FETCH_URL)
    if (!response.data || response.data.response_code !== 0) {
      throw new Error('Failed to fetch data')
    }
    quiz.value = response.data.results.map(toQuizElement)
    const correctAnswers = quiz.value.reduce(
      (acc, question, index) => {
        acc[index] = question.correctOption
        return acc
      },
      {} as Record<number, number>
    )
    questionStore.setCorrectAnswers(correctAnswers)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main class="quiz-view">
    <div>
      <div v-if="isLoading"><Loader /></div>

      <div v-else-if="error"><ErrorMessage :message="error" /></div>

      <div v-else-if="quiz" class="quiz-container">
        <Question
          :question="quiz[questionStore.currentQuestionIndex]?.question"
          :answers="quiz[questionStore.currentQuestionIndex]?.options"
        />
      </div>

      <div v-else>No data</div>
    </div>
    <div v-if="quiz" class="question-numbers-container">
      <QuestionLink
        v-for="index in QUESTION_COUNT"
        :key="index"
        :question-number="index"
        :highlight-if-answered="true"
      />
    </div>
  </main>
</template>

<style scoped>
.question-numbers-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.quiz-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.quiz-view {
  width: 768px;
}
</style>
