
import { dateTwoYearBack, dateFormatted } from '../../common/helper.js'
import { busquedaDeComprobantes } from '../../common/steps/busquedaDeComprobantes.js'

export const busquedaBiAnual = async (context) => {
  context.setInvoiceSearchStartDate(dateFormatted(dateTwoYearBack()))
  busquedaDeComprobantes(context)
}
