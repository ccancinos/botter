export const datosEmision = async (context) => {
  const ID_CONCEPTO_SERVICIOS = '2'

  await context.page.selectOption('select[name="idConcepto"]', ID_CONCEPTO_SERVICIOS)
  await context.waitForPage()
  await context.page.fill(
    'input[name="periodoFacturadoDesde"]',
    context.getInvoicePeriodStartDate()
  )
  await context.page.fill(
    'input[name="periodoFacturadoHasta"]',
    context.getInvoicePeriodEndDate()
  )
  await context.page.fill('input[name="vencimientoPago"]', context.getInvoicePeriodPayDate())
  await context.page.click('input[value="Continuar >"]')
}
