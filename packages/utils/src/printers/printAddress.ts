const printAddress = (item, options: { prefix?: string } = {}) => {
  if (!item) return

  const { prefix = 'shipping' } = options
  const line1 = item[`${prefix}_address_line_1`] || ''
  const line2 = item[`${prefix}_address_line_2`] || ''
  return `${line1} ${line2}`.trim()
}

export default printAddress
