const playwright = require('playwright')
const {
  login,
  randomDetalle,
  randomValor,
  dateAsString,
  dateFormatted,
  saveToCSV,
} = require('./helper.js')

const uuid = require('uuid')

async function main() {
  const detalle = randomDetalle()
  const valor = randomValor()

  // disable headless to see the browser's action
  const browser = await playwright.chromium.launch({
    headless: false,
    args: ['--disable-dev-shm-usage'],
  })
  const context = await browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()

  const navigationPromise = page.waitForNavigation({
    waitUntil: 'domcontentloaded',
  })
  await page.setDefaultNavigationTimeout(0)

  await login(page)

  await navigationPromise
  // Pagina: PortalVerTodosToComprobantesEnLinea ==> SelectComprobantesEnLinea
  await page.click('text=Ver todos')
  await page.waitForTimeout(1000)
  await page.click('text=Comprobantes en línea')
  await page.waitForTimeout(3000)

  let pages = await context.pages()
  const facturadorPage = pages[1]

  // Pagina: SelectEmpresa (CANCINOS CLAUDIO FERNANDO)
  await facturadorPage.click(`input[value="${process.env.USER_NAME}"]`)

  // Pagina: SelectGenerarComprobantes
  await facturadorPage.click('text=Generar Comprobantes')
  await facturadorPage.waitForTimeout(1000)
  // Pagina: GeneracionDeComprobantes (Puntos de Vta y Tipos de Comprobantes)
  await facturadorPage.selectOption(
    'select[name="puntoDeVenta"]',
    process.env.N_PUNTO_VENTA || '1'
  )

  await facturadorPage.waitForTimeout(1000)
  await facturadorPage.click('input[value="Continuar >"]')
  await facturadorPage.waitForTimeout(1000)
  // Pagina: DatosDeEmision (paso 1 de 4 - genracion de comprobantes - factura c)
  await facturadorPage.selectOption('select[name="idConcepto"]', '2')
  await facturadorPage.waitForTimeout(1000)
  // TODO Agregar Periodo Facturado
  // Desde: id="fst" name="periodoFacturadoDesde" ej: 03/09/2023
  // Hasta: id="fsh" name="periodoFacturadoHasta" ej: 03/09/2023
  // Vto para el pago: id="vencimientopago" name="vencimientoPago" ej: 03/09/2023
  await facturadorPage.click('input[value="Continuar >"]')
  // Pagina: DatosDelReceptor (paso 2 de 4 = generacion de comprobantes = factura c) await facturadorPage.selectOption('select[name="idIVAReceptor"]', '5') await facturadorPage.waitForTimeout(1000)
  await facturadorPage.click('input[name="formaDePago"]')
  await facturadorPage.click('input[value="Continuar >"]')
  await facturadorPage.waitForTimeout(1000)
  // Pagina: DatosDeLaOperacion (paso 3 de 4 = Generacion de comprobantes = factura c)
  await facturadorPage.fill('input[name="detalleCodigoArticulo"]', '1')
  await facturadorPage.waitForTimeout(1000)

  await facturadorPage.fill('textarea[name="detalleDescripcion"]', detalle)
  await facturadorPage.waitForTimeout(1000)
  await facturadorPage.fill('input[name="detallePrecio"]', valor)
  await facturadorPage.waitForTimeout(1000)
  await facturadorPage.click('input[value="Continuar >"]')
  await facturadorPage.waitForTimeout(1000)

  //confirmacion
  await facturadorPage.evaluate(
    () =>
      // eslint-disable-next-line no-undef
      (window.confirm = function () {
        return true
      })
  )

  await facturadorPage.click('input[value="Confirmar Datos..."]')

  await facturadorPage.waitForTimeout(1000)

  // Imprimir factura
  const [download] = await Promise.all([
    // Start waiting for the download
    facturadorPage.waitForEvent('download'),
    // Perform the action that initiates download
    facturadorPage.click('input[value="Imprimir..."]'),
  ])

  await download.saveAs(
    `./downloads/factura-${
      process.env.USER_CUIL
    }-${dateAsString()}-${uuid.v1()}.pdf`
  )

  saveToCSV(dateFormatted(), detalle, valor)

  await facturadorPage.waitForTimeout(1000)

  await browser.close()
}
main()