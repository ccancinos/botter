export const selectConsultas = async (context) => {
  await context.page.click('text=Consultas')
  await context.waitForPage()
}
