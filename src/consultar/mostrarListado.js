export const mostrarListado = async (context) => {
  const invoiceDates = context.page.locator(
    'table.jig_table tr td[title="Fecha de Emisión"]'
  )
  const invoiceNumbers = context.page.locator(
    'table.jig_table tr td[title="Nro. Comprobante"]'
  )
  const invoiceValues = context.page.locator(
    'table.jig_table tr td[title="Importe Total: Pesos Argentinos"]'
  )
  const size = await invoiceDates.count()

  console.log('Date', 'Number', 'Value')
  let totalValue = 0

  for(let i = 0; i < size; i++) {
    const invoiceDate = await invoiceDates.nth(i).innerText()
    const invoiceNumber = await invoiceNumbers.nth(i).innerText()
    const invoiceValue = await invoiceValues.nth(i).innerText()
    totalValue += parseFloat(invoiceValue)
    console.log(invoiceDate, invoiceNumber, invoiceValue)
  }
  console.log('Total Value: ', totalValue)
}
