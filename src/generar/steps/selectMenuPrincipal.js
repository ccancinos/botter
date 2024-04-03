export const selectMenuPrincipal = async (context) => {
  await context.page.click('input[value="Menú Principal"]')
  await context.waitForPage()
}
