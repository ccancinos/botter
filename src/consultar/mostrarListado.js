export const mostrarListado = async (context) => {
  await context.waitForPage()
  let invoiceDates = await context.page.getByTitle('Fecha de')
  let invoiceNumbers = await context.page.getByTitle('Nro. Comprobante')
  let invoiceValues = await context.page.getByTitle('Importe Total')

  const invoicesCount = await invoiceDates.count()
  console.log('Date', 'Number', 'Value')
  let totalValue = 0

  for(let i = 0; i < invoicesCount; i++) {
    const invoiceDate = await invoiceDates.nth(i).innerText()
    const invoiceNumber = await invoiceNumbers.nth(i).innerText()
    const invoiceValue = await invoiceValues.nth(i).innerText()
    totalValue += parseFloat(invoiceValue)
    console.log(invoiceDate, invoiceNumber, invoiceValue)
  }
  console.log('Invoices Found:', invoicesCount)
  console.log('Total Value: ', totalValue)
}
