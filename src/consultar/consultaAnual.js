import { EnvContext } from '../common/EnvContext.js'
import { login } from '../common/login.js'
import { selectComprobantesEnLinea } from '../common/selectComprobantesEnLinea.js'
import { selectEmpresa } from '../common/selectEmpresa.js'
import { selectConsultas } from './selectConsultas.js'
import { busquedaAnual } from './busquedaAnual.js'
import { mostrarListado } from './mostrarListado.js'
import { descargarFacturas } from './descargarFacturas.js'

async function main() {
  let stepsClasses = [
    login,
    selectComprobantesEnLinea,
    selectEmpresa,
    selectConsultas,
    busquedaAnual,
    mostrarListado,
    descargarFacturas
  ]

  let context = new EnvContext()

  await context.init()
  
  for (let step of stepsClasses) {
    await step(context)
  }

  await context.end()
}

main()

