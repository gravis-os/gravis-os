const getCsvUri = (headers: string[]): string => {
  const csvContent = `data:text/csv;charset=utf-8,${headers.join(',')}`
  return encodeURI(csvContent)
}

export default getCsvUri
