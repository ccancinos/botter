export const datosDeLaOperacion = async (context) => {
  await context.page.fill('input[name="detalleCodigoArticulo"]', '1')
  await context.waitForPage()

  await context.page.fill(
    'textarea[name="detalleDescripcion"]',
    context.getInvoiceDetail()
  )
  await context.waitForPage()
  await context.page.fill('input[name="detallePrecio"]', context.getInvoiceValue())
  await context.waitForPage()
  await context.page.click('input[value="Continuar >"]')
  await context.waitForPage()
}
