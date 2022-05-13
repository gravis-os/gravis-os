import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import TextField from './TextField'

export interface AmountFieldProps {
  name: string
}

const AmountField = props => {
  const { onChange, value, ...rest } = props
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return (
    <NumberFormat
      customInput={TextField}
      {...rest}
      value={displayValue}
      fullWidth
      thousandSeparator
      decimalScale={2}
      onValueChange={target => {
        if (target.floatValue === displayValue) return
        setDisplayValue(target.floatValue)
        onChange(target.floatValue)
      }}
      isNumericString
      prefix="$ "
    />
  )
}

export default AmountField
