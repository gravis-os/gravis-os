import React from 'react'
import NumberFormat from 'react-number-format'
import TextField from './TextField'

const NumberField = (props) => {
  const { onChange, value, ...rest } = props

  return (
    <NumberFormat
      customInput={TextField}
      decimalScale={0}
      {...rest}
      isNumericString
      fullWidth
      thousandSeparator
      value={value}
      onValueChange={(target) => onChange(target.floatValue)}
    />
  )
}

export default NumberField
