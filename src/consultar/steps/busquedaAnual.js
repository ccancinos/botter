import { dateOneYearBack, dateFormatted } from '../../common/helper.js'
import { busquedaDeComprobantes } from '../../common/steps/busquedaDeComprobantes.js'

export const busquedaAnual = async (context) => {
  context.setInvoiceSearchStartDate(dateFormatted(dateOneYearBack()))
  busquedaDeComprobantes(context)
}
