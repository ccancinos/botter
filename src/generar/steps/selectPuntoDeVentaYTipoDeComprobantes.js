export const selectPuntoDeVentaYTipoDeComprobantes = async (context) => {
  try {
    // They added a notification dialog you can only close
    await context.page.click('input[value="Cerrar"]')
  } catch (e) {
    // console.log("Error trying to press 'Cerrar'", e)
  }

  await context.page.selectOption(
    'select[name="puntoDeVenta"]',
    context.getSalesPointNumber() || '1'
  )

  await context.waitForPage()
  await context.page.click('input[value="Continuar >"]')
  await context.waitForPage()
}
