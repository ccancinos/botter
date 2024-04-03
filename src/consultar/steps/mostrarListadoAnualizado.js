import { getTableContent } from "../../common/helper.js"

export const mostrarListadoAnualizado = async (context) => {
  await context.waitForPage()

  let tableContent = await getTableContent(context, 'table.jig_table tr')

  // tableContent.forEach((row) => {
  //   console.log(row.at(0), row.at(6))
  // })

  let montlyInvoiced = groupByMonth(tableContent)
  console.log('Montly Invoiced:')
  console.log(montlyInvoiced)
  console.log(getTotal(montlyInvoiced))

  // Need to slice and sum the previous 12 months of each of the last 12 months
  // NOTE: it might happen I don't have invoices for some months
  // Which means the slice is not by 12, but by date
}

// Should return a map with Key=MMYYYY value=Total Invoiced. Like this:
// {
//   12/2022: 70000,
//   05/2023: 50000,
//   06/2023: 100000,
//   07/2023: 100000,
// }
const groupByMonth = (tableContent) => {
  let groupedContent = tableContent.slice(1).reduce((acc, value) => {
    let month = value.at(0).substring(3)
    let currValue = value.at(6)
    acc[month] = acc[month] ? +acc[month] + +currValue : +currValue
    return acc
  }, {})
  return groupedContent
}

const getTotal = (monthlyInvoiced) => {
  return Object.values(monthlyInvoiced).reduce((acc, value) => acc + value, 0)
}
