import { EnvContext } from '../common/EnvContext.js'
import { login } from '../common/login.js'
import { selectComprobantesEnLinea } from '../common/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/selectEmpresa.js'
import { selectConsultas } from './selectConsultas.js'
import { busquedaMensual } from './busquedaMensual.js'
import { mostrarListado } from './mostrarListado.js'
import { descargarFacturas } from './descargarFacturas.js'
import { executeSteps } from '../common/executeSteps.js'

async function main() {
  let steps = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa,
    selectConsultas,
    busquedaMensual,
    mostrarListado,
    // descargarFacturas
  ]

  let context = new EnvContext()
  await context.init()

  await executeSteps(steps, context)

  await context.end()
}

main()

