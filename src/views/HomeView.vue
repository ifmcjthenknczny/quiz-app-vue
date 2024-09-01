<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

type Question = {
  type: "boolean" | "multiple"
  difficulty: "easy" | "medium" | "hard"
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

const questions = ref<null | Question[]>(null)
const isLoading = ref(true)
const error = ref<null | string>(null)
const URL = 'https://opentdb.com/api.php?amount=12&category=21&difficulty=easy&type=multiple'

type ApiQuestionsResponse = {
  response_code: number;
  results: Question[]
}

const fetchData = async () => {
  try {
    const response = await axios.get<ApiQuestionsResponse>(URL)
    if (!response.data || response.data.response_code !== 0) {
      throw new Error('Failed to fetch data')
    }
    questions.value = response.data.results
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
  <main>
    <div v-if="isLoading">
      Loading...
    </div>
    
    <div v-if="error">
      Error: {{ error }}
    </div>

    <div v-else-if="questions">
      <pre>{{ JSON.stringify(questions) }}</pre>
    </div>
  </main>
</template>

<style scoped>
/* Optional: Add some styles for the loader and content */
</style>
