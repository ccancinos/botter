import { dateOneYearBack  } from '../common/helper'
import { busquedaDeComprobantes } from '../common/busquedaDeComprobantes'

export const busquedaMensual = async (context) => {
  context.setInvoiceSearchStartDate(dateOneYearBack())
  busquedaDeComprobantes(context)
}
