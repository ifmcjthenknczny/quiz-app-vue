export type Option = string

export const toOptionLetter = (index: number): Option => {
  return String.fromCharCode(65 + index)
}

export const toOptionColor = (index: number): string => {
  if (index === 0) {
    return '#f25022'
  }
  if (index === 1) {
    return '#7fba00'
  }
  if (index === 2) {
    return '#01a4ef'
  }
  if (index === 3) {
    return '#ffb901'
  }
  return ''
}

export const toQuestionNumber = (questionIndex: number) => {
  return questionIndex + 1
}

export const toQuestionIndex = (questionNumber: number) => {
  return questionNumber - 1
}

const answersToBooleanArray = (
  answers: Record<number, number>,
  correctAnswers: Record<number, number>
) => {
  const sortedAnswers = Object.keys(answers).sort()

  return sortedAnswers.map(
    (questionIndex) => answers[+questionIndex] === correctAnswers[+questionIndex]
  )
}

export const divideToCorrectAndWrongAnswers = (
  answers: Record<number, number>,
  correctAnswers: Record<number, number>
) => {
  const computedAnswersResult = answersToBooleanArray(answers, correctAnswers)

  const correct: number[] = []
  const wrong: number[] = []
  for (let i = 0; i < computedAnswersResult.length; i++) {
    ;(computedAnswersResult[i] ? correct : wrong).push(i)
  }
  return {
    correct,
    wrong
  }
}
