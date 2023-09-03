import { EnvContext } from '../common/EnvContext.js'
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

async function main() {
  let stepsClasses = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa,
    selectGenerarComprobantes,
    selectPuntoDeVentaYTipoDeComprobantes,
    datosEmision,
    datosReceptor,
    datosDeLaOperacion,
    confirmGeneracion,
    imprimirFactura
  ]

  let context = new EnvContext()

  await context.init()
  
  for (let step of stepsClasses) {
    await step(context)
  }

  await context.end()
}

main()

