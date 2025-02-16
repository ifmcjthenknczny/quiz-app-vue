export const sum = (arr: number[]) => {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

export const round = (num: number, precision: number) => {
  const multiplier = 10 ** precision
  return Math.round(num * multiplier) / multiplier
}
