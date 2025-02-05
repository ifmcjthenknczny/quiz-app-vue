<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { shuffle } from '@/helpers/array'
import Question from '@/components/Question.vue'
import QuestionLink from '@/components/QuestionLink.vue'
import { useQuestions } from '@/store/useQuestions'
import { QUESTION_COUNT } from '@/config'

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

const questionNumberStore = useQuestions()

const fetchData = async () => {
  try {
    const response = await axios.get<ApiQuestionsResponse>(FETCH_URL)
    if (!response.data || response.data.response_code !== 0) {
      throw new Error('Failed to fetch data')
    }
    quiz.value = response.data.results.map(toQuizElement)
    questionNumberStore.correctAnswers = quiz.value.reduce(
      (acc, question, index) => {
        acc[index] = question.correctOption
        return acc
      },
      {} as Record<number, number>
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
  questionNumberStore.$reset()
})
</script>

<template>
  <main>
    <div>
      <div v-if="isLoading">Loading...</div>

      <div v-if="error">Error: {{ error }}</div>

      <div v-else-if="quiz" class="quiz-container">
        <QuestionLink
          v-if="questionNumberStore.questionNumber > 0"
          :questionNumber="questionNumberStore.questionNumber"
          content="←"
        />
        <Question
          :question="quiz[questionNumberStore.questionNumber]?.question"
          :answers="quiz[questionNumberStore.questionNumber]?.options"
        />
        <QuestionLink
          v-if="questionNumberStore.questionNumber < QUESTION_COUNT - 1"
          :questionNumber="questionNumberStore.questionNumber + 2"
          content="→"
        />
      </div>

      <div v-else>No data</div>
    </div>
    <div class="question-numbers-container">
      <QuestionLink
        v-for="index in QUESTION_COUNT"
        :key="index"
        :questionNumber="index"
        :highlightIfAnswered="true"
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
</style>
