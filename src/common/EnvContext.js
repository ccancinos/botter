import { chromium } from 'playwright'
import process from 'node:process'
import { randomArrayElement } from './helper.js'

export class EnvContext {

  async init() {
    await this.initBrowser()
    this.detalle = this.randomDetalle()
  }

  async initBrowser() {
    // disable headless to see the browser's action
    this.browser = await chromium.launch({
      headless: false,
      args: ['--disable-dev-shm-usage'],
    })
    this.browserContext = await this.browser.newContext({
      acceptDownloads: true,
    })
    this.page = await this.browserContext.newPage()

    await this.page.setDefaultNavigationTimeout(0)
  }

  async end() {
    await this.waitForPage()
    await this.browser.close()
  }

  async navigationPromise() {
    const navigationPromise = this.page.waitForNavigation({
      waitUntil: 'domcontentloaded',
    })
    await navigationPromise
  }

  async waitForPage(timeout = 1000) {
    await this.page.waitForTimeout(timeout)
  }

  async pages() {
    return await this.browserContext.pages()
  }

  getUserCuil() {
    return process.env.USER_CUIL
  }

  getUserPassword() {
    return process.env.USER_PASS
  }

  getUserName() {
    return process.env.USER_NAME
  }

  getSalesPointNumber() {
    return process.env.N_PUNTO_VENTA
  }

  getInvoicePeriodStartDate() {
    return process.env.PERIODO_DESDE
  }

  getInvoicePeriodEndDate() {
    return process.env.PERIODO_HASTA
  }

  getInvoicePeriodPayDate() {
    return process.env.VENCIMIENTO_PAGO
  }

  getInvoiceDetail() {
    return this.detalle
  }

  getInvoiceValue() {
    return process.env.IMPORTE
  }

  randomDetalle() {
    var detallesArr = JSON.parse(process.env.DETALLES)
    return randomArrayElement(detallesArr) || 'Servicios'
  }

  setInvoiceSearchStartDate (date) {
    this.invoiceSearchStartDate = date
  }

  getInvoiceSearchStartDate () {
    return this.invoiceSearchStartDate
  }

  getDownloadPath() {
    return process.env.DOWNLOAD_PATH
  }
}