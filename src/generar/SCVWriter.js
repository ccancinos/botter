import { createWriteStream, existsSync } from 'fs'
import CsvWriter from 'csv-write-stream'

/**
   * Guarda facturas generadas a CSV, la crea o agrega
   * @param {date} fecha
   * @param {string} item
   * @param {string} monto
   */
export const saveToSCV = async (fecha, item, monto, fileName = false) => {
  var writer = new CsvWriter({ sendHeaders: false })
  var csvFilename
  if (fileName) {
    csvFilename = `${fileName}.csv`
  } else {
    csvFilename = `${process.env.USER_CUIL}.csv`
  }

  // If CSV file does not exist, create it and add the headers
  if (!existsSync(csvFilename)) {
    writer = new CsvWriter({ sendHeaders: false })
    writer.pipe(createWriteStream(csvFilename))
    writer.write({
      header1: 'Fecha',
      header2: 'Item',
      header3: 'Monto',
    })
    writer.end()
  }

  // Append some data to CSV the file
  writer = new CsvWriter({ sendHeaders: false })
  writer.pipe(createWriteStream(csvFilename, { flags: 'a' }))
  writer.write({
    header1: fecha,
    header2: item,
    header3: monto,
  })
  writer.end()
}
