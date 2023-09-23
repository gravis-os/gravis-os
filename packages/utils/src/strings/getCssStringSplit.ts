const getCssStringSplit = (str: string): [number, string] => {
  const number = str.replaceAll(/[A-Za-z]/g, '')
  const unit = str.replace(number, '')
  return [Number(number), unit]
}

export default getCssStringSplit
