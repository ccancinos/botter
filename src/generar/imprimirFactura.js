import { v1 } from 'uuid'
import { saveToSCV } from './SCVWriter.js'
import { dateAsString, dateFormatted } from '../common/helper.js'

export const imprimirFactura = async (context) => {
  const [download] = await Promise.all([
    // Start waiting for the download
    context.page.waitForEvent('download'),
    // Perform the action that initiates download
    context.page.click('input[value="Imprimir..."]'),
  ])

  await download.saveAs(
    `${context.getDownloadPath()}/factura-${context.getUserCuil()}-${dateAsString()}-${v1()}.pdf`
  )

  saveToSCV(dateFormatted(), context.getInvoiceDetail(), context.getInvoiceValue())
}

