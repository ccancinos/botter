import { v1 } from 'uuid'
import { yearMonthAsString, rounder } from '../../common/helper.js'

export const descargarFacturas = async (context) => {
  const rows = context.page.locator(
    'table.jig_table tr td[title="Fecha de Emisión"]'
  )
  const count = await rows.count()
  console.log('downloading:', count, 'invoices')

  let fechasComprobantes = []
  for (let i = 0; i < count; ++i) {
    fechasComprobantes.push(await rows.nth(i).textContent())
  }

  const buttons = context.page.locator(
    'table.jig_table tr input[value="Ver"]'
  )
  const size = await buttons.count()

  for (let i = 0; i < size; i++) {
    const button = buttons.nth(i)
    const [download] = await Promise.all([
      // Start waiting for the download
      context.page.waitForEvent('download'),
      // Perform the action that initiates download
      button.click(),
    ])

    await download.saveAs(
      `${context.getDownloadPath()}/factura-${context.getUserCuil()}-${yearMonthAsString()}${rounder(
        fechasComprobantes[i].split('/')[0]
      )}-${v1()}.pdf`
    )
  }
}
