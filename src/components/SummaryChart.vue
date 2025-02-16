<template>
  <div ref="chart" :style="{ width: '400px', height: '300px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useQuestions } from '@/store/useQuestions'
import { divideToCorrectAndWrongAnswers } from '@/helpers/question'
import { round, sum } from '@/helpers/number'

const chart = ref(null)

const questionStore = useQuestions()
const answersResult = divideToCorrectAndWrongAnswers(
  questionStore.selectedAnswers,
  questionStore.correctAnswers
)

const timeSpent = {
  correct: round(
    sum(answersResult.correct.map((index) => questionStore.timeSpent[index] || 0)) / 1000,
    2
  ),
  wrong: round(
    sum(answersResult.wrong.map((index) => questionStore.timeSpent[index] || 0)) / 1000,
    2
  )
}

onMounted(() => {
  const myChart = echarts.init(chart.value)

  const option = {
    title: {
      text: 'Time Spent on Answers',
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Time spent on answers',
        type: 'pie',
        radius: '50%',
        center: ['50%', '60%'],
        data: [
          { value: timeSpent.correct, name: 'Correct' },
          { value: timeSpent.wrong, name: 'Wrong' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}:\n{c}s ({d}%)',
          color: '#fff'
        },
        itemStyle: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (params: any) => {
            if (params.data.name === 'Correct') {
              return 'green'
            } else {
              return 'red'
            }
          }
        }
      }
    ]
  }

  myChart.setOption(option)

  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
