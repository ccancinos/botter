import { EnvContext } from '../common/EnvContext.js'
import { executeSteps } from '../common/executeSteps.js'
import { login } from '../common/steps/login.js'
import { selectComprobantesEnLinea } from '../common/steps/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/steps/selectEmpresa.js'
import { selectConsultas } from './steps/selectConsultas.js'
import { busquedaBiAnual } from './steps/busquedaBiAnual.js'
import { mostrarListadoAnualizado } from './steps/mostrarListadoAnualizado.js'

async function main() {
  let steps = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa,
    selectConsultas,
    busquedaBiAnual,
    mostrarListadoAnualizado,
  ]

  let context = new EnvContext()
  await context.init()

  await executeSteps(steps, context)

  await context.end()
}

main()

