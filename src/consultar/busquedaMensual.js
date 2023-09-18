import { dateStartOfMonth } from '../common/helper.js'
import { busquedaDeComprobantes } from '../common/busquedaDeComprobantes.js'

export const busquedaMensual = async (context) => {
  context.setInvoiceSearchStartDate(dateStartOfMonth())
  busquedaDeComprobantes(context)
}
