export const selectComprobantesEnLinea= async (context) => {
  await context.page.click('text=Ver todos')
  await context.waitForPage()
  await context.page.click('text=Comprobantes en línea')
  await context.waitForPage(3000)

  let pages = await context.pages()
  context.page = pages[1]
}
