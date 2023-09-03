export const selectPuntoDeVentaYTipoDeComprobantes = async (context) => {
  await context.page.selectOption(
    'select[name="puntoDeVenta"]',
    context.getSalesPointNumber() || '1'
  )

  await context.waitForPage()
  await context.page.click('input[value="Continuar >"]')
  await context.waitForPage()
}
