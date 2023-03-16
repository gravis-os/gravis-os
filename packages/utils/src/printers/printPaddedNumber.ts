const printPaddedNumber = (index: number): string =>
  index < 10 ? String(index).padStart(2, '0') : String(index)

export default printPaddedNumber
