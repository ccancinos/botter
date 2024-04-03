import { login } from '../common/steps/login.js'
import { selectComprobantesEnLinea } from '../common/steps/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/steps/selectEmpresa.js'
import { selectGenerarComprobantes } from './steps/selectGenerarComprobantes.js'
import { selectPuntoDeVentaYTipoDeComprobantes } from './steps/selectPuntoDeVentaYTipoDeComprobantes.js'
import { datosEmision } from './steps/datosEmision.js'
import { datosReceptor } from './steps/datosReceptor.js'
import { datosDeLaOperacion } from './steps/datosDeLaOperacion.js'
import { confirmGeneracion } from './steps/confirmGeneracion.js'
import { imprimirFactura } from './steps/imprimirFactura.js'
import { executeSteps } from '../common/executeSteps.js'
import { selectMenuPrincipal } from './steps/selectMenuPrincipal.js'
import { createContext } from './createContext.js'

async function main() {
  let setup_steps = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa
  ]
  let process_steps = [
    selectGenerarComprobantes,
    selectPuntoDeVentaYTipoDeComprobantes,
    datosEmision,
    datosReceptor,
    datosDeLaOperacion,
    confirmGeneracion,
    imprimirFactura
  ]
  let reset_steps = [
    selectMenuPrincipal
  ]

  let context = await createContext()

  await context.init()
  await executeSteps(setup_steps, context)

  while(await context.hasInvoiceValues()) {
    await executeSteps(process_steps, context)
    await executeSteps(reset_steps, context)
    await context.reset()
    console.log('Factura generada por: $', context.getInvoiceValue())
  }

  await context.end()
}

main()
