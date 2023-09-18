export const busquedaDeComprobantes = async (context) => {
  const ID_FACTURA_C = '11'

  await context.page.fill(
    'input[name="fechaEmisionDesde"]', context.getInvoiceSearchStartDate()
  )
  await context.page.selectOption('select[name="idTipoComprobante"]', ID_FACTURA_C)
  await context.page.selectOption(
    'select[name="puntoDeVenta"]', context.getSalesPointNumber() || '1'
  )
  await context.page.click('input[value="Buscar"]')
  await context.waitForPage()
}
