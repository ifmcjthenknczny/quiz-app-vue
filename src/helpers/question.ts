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
