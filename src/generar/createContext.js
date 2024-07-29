import inquirer from "inquirer"
import { EnvContext } from "../common/EnvContext.js"
import { InteractiveContext } from "../common/InteractiveContext.js"

export const createContext = async () => {
  let contextQuestion = [{
    id: 'mode',
    type: 'list',
    name: 'mode',
    message: 'Seleccione el modo de ejecucion',
    choices: ['Automático', 'Manual']
  }]

  // Just to display how much is configured to invoice
  const envContext = new EnvContext()
  envContext.loadInvoiceValues()

  let executionMode = await inquirer.prompt(contextQuestion)

  return (executionMode.mode === 'Automático') ?
    envContext :
    new InteractiveContext()
}
