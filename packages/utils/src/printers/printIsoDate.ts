const printIsoDate = (date?: Date | string | null) =>
  date instanceof Date ? date.toISOString() : date

export default printIsoDate
