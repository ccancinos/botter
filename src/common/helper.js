export const randomArrayElement = (array) => {
  var random = Math.floor(Math.random() * array.length)
  return array[random]
}

export const dateStartOfMonth = (date = new Date) => {
  return `1/${rounder(date.getMonth() + 1)}/${date.getFullYear()}`
}

export const dateOneYearBack = (date = new Date) => {
  return new Date(date.setFullYear(date.getFullYear() - 1))
}

export const dateAsString = (date = new Date) => {
  return `${date.getFullYear()}${rounder(date.getMonth() + 1)}${rounder(date.getDate())}`
}

export const yearMonthAsString = (date = new Date) => {
  return `${date.getFullYear()}${rounder(date.getMonth() + 1)}`
}

export const dateFormatted = (date = new Date) => {
  return `${rounder(date.getDate())}/${rounder(date.getMonth() + 1)}/${date.getFullYear()}`
}

export const rounder = (num) => { return ('0' + num).slice(-2) }

