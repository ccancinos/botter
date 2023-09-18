import inquirer from "inquirer"
import { EnvContext } from "./EnvContext.js"

export class InteractiveContext extends EnvContext {

  async init() {
    await this.loadInvoiceData()
    await super.init()
  }

  async loadInvoiceData() {
    let userDataQuestions = [{
        type: 'input',
        name: 'userCuil',
        message: 'Ingrese su cuit',
        default: super.getUserCuil()
      },
      {
        type: 'password',
        name: 'password',
        message: 'Ingrese su password',
        default: super.getUserPassword()
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Ingrese su usuario como se ve en la pagina de afip',
        default: super.getUserName()
      },
      {
        type: 'input',
        name: 'sales_point',
        message: 'Punto de venta Nro:',
        default: super.getSalesPointNumber()
      },
      {
        type: 'input',
        name: 'value',
        message: 'Valor a facturar:',
        default: super.getInvoiceValue(),
        validate: (value, _hash) => { 
          return (value == null || (typeof value === "string" && value.trim().length === 0)) ?
            "Valor a facturar es requerido" :
            true
        },
      },
      {
        type: 'input',
        name: 'startDate',
        message: 'Inicio de periodo:',
        default: super.getInvoicePeriodStartDate()
      },
      {
        type: 'input',
        name: 'endDate',
        message: 'Fin de periodo:',
        default: super.getInvoicePeriodEndDate()
      },
      {
        type: 'input',
        name: 'payDate',
        message: 'Vencimiento de pago:',
        default: super.getInvoicePeriodPayDate()
      },
      {
        type: 'input',
        name: 'downloadPath',
        message: 'Directorio de descarga:',
        default: super.getDownloadPath()
      }
    ]

    this.userData = await inquirer.prompt(userDataQuestions)
    const { password, ...data } = this.userData
    console.log(data)

    let confirmation = [{
      id: 'confirmation',
      type: 'list',
      name: 'confirmation',
      message: 'Los datos son correctos?',
      choices: ['Si', 'No']
    }]

    let selection = await inquirer.prompt(confirmation)

    if (selection.confirmation === 'No') {
      await this.loadInvoiceData()
    }
  }

  async hasInvoiceValues() {
    let anotherInvoiceQuestion = [{
      id: 'mode',
      type: 'list',
      name: 'mode',
      message: 'Quiere realizar otra factura?',
      choices: ['Si', 'No']
    }]
    let selection = await inquirer.prompt(anotherInvoiceQuestion)
    return selection.mode === 'Si'
  }

  async reset() {
    await this.loadInvoiceData()
  }


  getUserCuil() {
    return this.userData.userCuil 
  }

  getUserPassword() {
    return this.userData.password
  }

  getUserName() {
    return this.userData.userName
  }

  getSalesPointNumber() {
    return this.userData.sales_point
  }

  getInvoiceValue() {
    return this.userData.value
  }

  getInvoicePeriodStartDate() {
    return this.userData.startDate
  }

  getInvoicePeriodEndDate() {
    return this.userData.endDate
  }

  getInvoicePeriodPayDate() {
    return this.userData.payDate
  }

  getDownloadPath() {
    return this.userData.downloadPath
  }
}
