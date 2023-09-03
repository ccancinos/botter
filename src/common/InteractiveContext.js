import inquirer from "inquirer"
import { EnvContext } from "./EnvContext.js"

export class InteractiveContext extends EnvContext {

  async init() {
    this.pageContext = new EnvContext()
    let userDataQuestions = [{
        type: 'input',
        name: 'userCuil',
        message: 'Ingrese su cuit',
        default: this.pageContext.getUserCuil()
      },
      {
        type: 'password',
        name: 'password',
        message: 'Ingrese su password',
        default: this.pageContext.getUserPassword()
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Ingrese su usuario como se ve en la pagina de afip',
        default: this.pageContext.getUserName()
      },
      {
        type: 'input',
        name: 'sales_point',
        message: 'Punto de venta Nro:',
        default: this.pageContext.getSalesPointNumber()
      },
      {
        type: 'input',
        name: 'value',
        message: 'Valor a facturar:',
        default: this.pageContext.getInvoiceValue()
      },
      {
        type: 'input',
        name: 'startDate',
        message: 'Inicio de periodo:',
        default: this.pageContext.getInvoicePeriodStartDate()
      },
      {
        type: 'input',
        name: 'endDate',
        message: 'Fin de periodo:',
        default: this.pageContext.getInvoicePeriodEndDate()
      },
      {
        type: 'input',
        name: 'payDate',
        message: 'Vencimiento de pago:',
        default: this.pageContext.getInvoicePeriodPayDate()
      },
      {
        type: 'input',
        name: 'downloadPath',
        message: 'Directorio de descarga:',
        default: this.pageContext.getDownloadPath()
      },
      {
        id:'concepts',
        type: 'list',
        name: 'concepts',
        message: 'Concepto a incluir ',
        choices: ['SERVICE_CONCEPT', 'PRODUCT_CONCEPTO', 'BOTH_CONCEPTS'],
      }]

    this.userData = await inquirer.prompt(userDataQuestions)
    console.log(this.userData)

    // this.pageContext.init
  }

  async end() {
    // this.pageContext.end()
  }

}
