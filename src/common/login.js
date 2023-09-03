export const login = async (context) => {
  await context.page.goto('https://auth.afip.gob.ar/contribuyente_/login.xhtml')
  await context.page.waitForSelector('input[name="F1:username"]')
  await context.page.fill('input[name="F1:username"]', context.getUserCuil())
  await context.page.click('input[name="F1:btnSiguiente"]')
  await context.page.waitForSelector('input[name="F1:password"]', {
    visible: true,
  })
  await context.page.fill('input[name="F1:password"]', context.getUserPassword())
  await context.page.click('input[name="F1:btnIngresar"]')
  await context.navigationPromise()
}
