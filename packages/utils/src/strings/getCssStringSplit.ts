const getCssStringSplit = (str: string): [number, string] => {
  const number = str.replace(/[a-zA-Z]/g, '')
  const unit = str.replace(number, '')
  return [Number(number), unit]
}

export default getCssStringSplit
