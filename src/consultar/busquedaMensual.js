import { dateStartOfMonth } from '../common/helper'
import { busquedaDeComprobantes } from '../common/busquedaDeComprobantes'

export const busquedaMensual = async (context) => {
  context.setInvoiceSearchStartDate(dateStartOfMonth())
  busquedaDeComprobantes(context)
}
