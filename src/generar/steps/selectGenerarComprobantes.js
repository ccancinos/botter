export const selectGenerarComprobantes = async (context) => {
  await context.page.click('text=Generar Comprobantes')
  await context.waitForPage()
}
