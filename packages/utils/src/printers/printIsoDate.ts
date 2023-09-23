const printIsoDate = (date?: Date | null | string) =>
  date instanceof Date ? date.toISOString() : date

export default printIsoDate
