export const randomArrayElement = (array) => {
  let random = Math.floor(Math.random() * array.length)
  return array[random]
}

export const dateStartOfMonth = (date = new Date) => {
  return `1/${rounder(date.getMonth() + 1)}/${date.getFullYear()}`
}


export const dateOneYearBack = (date = new Date) => {
  return new Date(date.setFullYear(date.getFullYear() - 1))
}

export const dateTwoYearBack = (date = new Date) => {
  return new Date(date.setFullYear(date.getFullYear() - 2))
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

// Should it return a list of maps using table's headers as map's keys??? or is it too much??
export const getTableContent = async (context, path) => {
  const rows = context.page.locator(path)

  const count = await rows.count()
  let list = []
  for(let i = 0; i < count; ++i) {
    let parsedRow = (await rows.nth(i).innerText()).split(/\t/)
    list = [...list,parsedRow]
  }
  return list
}

