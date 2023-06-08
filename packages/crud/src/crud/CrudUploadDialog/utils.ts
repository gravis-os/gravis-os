import type { Csv } from 'exceljs'
import ExcelJS from 'exceljs'
import forEach from 'lodash/forEach'
import isNil from 'lodash/isNil'
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream'

const getDataFromWorksheet = (worksheet: ExcelJS.Worksheet) => {
  const data = []

  worksheet.eachRow((row) => {
    const currentRowData = []
    row.eachCell({ includeEmpty: true }, (cell) =>
      currentRowData.push(isNil(cell.value) ? '' : cell.text)
    )
    data.push(currentRowData)
  })

  return data
}

export const extractDataFromExcelFile = async (buffer: ArrayBuffer) => {
  const workbook = new ExcelJS.Workbook()
  const wb = await workbook.xlsx.load(Buffer.from(buffer))
  const wbMediaMappings = new Map<string, ExcelJS.Media>()
  const sheets = []

  forEach(wb.model.media, (media: ExcelJS.Media & { index: string }) => {
    wbMediaMappings[media.index] = media
  })

  wb.eachSheet((worksheet, id) => {
    sheets.push({
      id,
      name: worksheet.name,
      data: getDataFromWorksheet(worksheet),
    })
  })

  return sheets
}

export const extractDataFromCsvFile = async (file: File) => {
  const workbook = new ExcelJS.Workbook()
  const stream = new ReadableWebToNodeStream(
    file.stream() as any
  ) as unknown as Parameters<Csv['read']>[0]

  const wb = await workbook.csv.read(stream)
  const itemArray = []
  const headers = []

  wb.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => {
        headers.push(cell.value)
      })

      return
    }

    const currentItem = {}
    row.eachCell((cell, cellNumber) => {
      currentItem[headers[cellNumber - 1]] = cell.value
    })

    itemArray.push(currentItem)
  })

  return itemArray
}

export const SHEET_FORMATS = ['xlsx', 'csv']
  .map((x) => {
    return `.${x}`
  })
  .join(',')
