export const SHEET_FORMATS = ['xlsx', 'csv']
  .map((x) => {
    return `.${x}`
  })
  .join(',')
