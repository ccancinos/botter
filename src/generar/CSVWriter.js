import { createWriteStream, existsSync } from 'fs'
import {  dateFormatted } from '../common/helper.js'
import CsvWriter from 'csv-write-stream'

/**
   * Guarda facturas generadas a CSV, la crea o agrega
   * @param {date} fecha
   * @param {string} item
   * @param {string} monto
   */
export const saveToSCV = async (context) => {
  const fecha = dateFormatted()
  const item = context.getInvoiceDetail()
  const monto = context.getInvoiceValue()
  let csvFilename = `${context.getDownloadPath()}/${context.getUserCuil()}.csv`
  let writer = new CsvWriter({ sendHeaders: false })

  // If CSV file does not exist, create it and add the headers
  if (!existsSync(csvFilename)) {
    writer = new CsvWriter({ sendHeaders: false })
    writer.pipe(createWriteStream(csvFilename))
    writer.write({
      header1: 'Fecha',
      header3: 'Monto',
      header2: 'Item',
    })
    writer.end()
  }

  // Append some data to CSV the file
  writer = new CsvWriter({ sendHeaders: false })
  writer.pipe(createWriteStream(csvFilename, { flags: 'a' }))
  writer.write({
    header1: fecha,
    header3: monto,
    header2: item,
  })
  writer.end()
}
