export const datosReceptor = async (context) => {
  const ID_CONSUMIDOR_FINAL = '5'

  await context.page.selectOption('select[name="idIVAReceptor"]', ID_CONSUMIDOR_FINAL)
  await context.waitForPage()
  await context.page.click('input[name="formaDePago"]')
  await context.page.click('input[value="Continuar >"]')
  await context.waitForPage()
}
