export const confirmGeneracion = async (context) => {
  await context.page.evaluate(
    () =>
      // eslint-disable-next-line no-undef
      (window.confirm = function () {
        return true
      })
  )

  await context.page.click('input[value="Confirmar Datos..."]')
  await context.waitForPage()
}
