import { EnvContext } from '../common/EnvContext.js'
import { login } from '../common/steps/login.js'
import { selectComprobantesEnLinea } from '../common/steps/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/steps/selectEmpresa.js'
import { selectConsultas } from './steps/selectConsultas.js'
import { busquedaAnual } from './steps/busquedaAnual.js'
import { mostrarListado } from './steps/mostrarListado.js'
import { descargarFacturas } from './steps/descargarFacturas.js'
import { executeSteps } from '../common/executeSteps.js'

async function main() {
  let steps = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa,
    selectConsultas,
    busquedaAnual,
    mostrarListado,
    // descargarFacturas
  ]

  let context = new EnvContext()
  await context.init()

  await executeSteps(steps, context)

  await context.end()
}

main()

