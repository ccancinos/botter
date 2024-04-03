export const selectEmpresa = async (context) => {
  await context.page.click(`input[value="${context.getUserName()}"]`)
}
