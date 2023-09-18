import { login } from '../common/login.js'
import { selectComprobantesEnLinea } from '../common/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/selectEmpresa.js'
import { selectGenerarComprobantes } from './selectGenerarComprobantes.js'
import { selectPuntoDeVentaYTipoDeComprobantes } from './selectPuntoDeVentaYTipoDeComprobantes.js'
import { datosEmision } from './datosEmision.js'
import { datosReceptor } from './datosReceptor.js'
import { datosDeLaOperacion } from './datosDeLaOperacion.js'
import { confirmGeneracion } from './confirmGeneracion.js'
import { imprimirFactura } from './imprimirFactura.js'
import { executeSteps } from '../common/executeSteps.js'
import { selectMenuPrincipal } from './selectMenuPrincipal.js'
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
  }

  await context.end()
}

main()
