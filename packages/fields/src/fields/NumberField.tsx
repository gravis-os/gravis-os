import React from 'react'
import NumberFormat from 'react-number-format'

import TextField from './TextField'

const NumberField = (props) => {
  const { onChange, value, ...rest } = props

  return (
    <NumberFormat
      customInput={TextField}
      decimalScale={0}
      fullWidth
      isNumericString
      thousandSeparator
      {...rest}
      onValueChange={(target) => onChange(target.floatValue || null)}
      value={value}
    />
  )
}

export default NumberField
