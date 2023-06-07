import type { Csv } from 'exceljs'
import ExcelJS from 'exceljs'
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream'

export const extractDataFromExcelFile = async (buffer: ArrayBuffer) => {
  const workbook = new ExcelJS.Workbook()

  return workbook.xlsx.load(Buffer.from(buffer))
}

export const extractDataFromCsvFile = async (file: File) => {
  const workbook = new ExcelJS.Workbook()
  const stream = new ReadableWebToNodeStream(
    file.stream() as any
  ) as unknown as Parameters<Csv['read']>[0]

  const wb = await workbook.csv.read(stream)
  console.log('news')
  wb.eachRow((row, rowNumber) => {
    // Print the values of each cell in the row
    console.log(`Row ${rowNumber}:`)
    row.eachCell((cell, colNumber) => {
      console.log(`  Column ${colNumber}: ${cell.value}`)
    })
  })

  return wb
}

export const SHEET_FORMATS = ['xlsx', 'csv']
  .map((x) => {
    return `.${x}`
  })
  .join(',')
