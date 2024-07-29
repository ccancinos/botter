import { EnvContext } from '../common/EnvContext.js'

async function main() {
  let context = new EnvContext()
  await context.init()

  let totalInvoice = 0
  while (await context.hasInvoiceValues()) {
    totalInvoice += Number(context.getInvoiceValue())
  }
  console.log('Total a facturar: $', totalInvoice)

  await context.end()
}

main()
