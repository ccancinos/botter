export const busquedaDeComprobantes = async (context) => {
  const ID_FACTURA_C = '11'

  await context.page.fill(
    'input[name="fechaEmisionDesde"]', context.getInvoiceSearchStartDate()
  )
  await context.page.selectOption('select[name="idTipoComprobante"]', ID_FACTURA_C)
  await context.waitForPage()
  await context.page.selectOption(
    'select[name="puntoDeVenta"]',
    process.env.N_PUNTO_VENTA || '1'
  )
  await context.waitForPage()
  await context.page.click('input[value="Buscar"]')
  await context.waitForPage()
}
