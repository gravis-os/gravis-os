import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

import TextField from './TextField'

export interface AmountFieldProps {
  name: string
}

const AmountField = (props) => {
  const { onChange, value, ...rest } = props
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return (
    <NumberFormat
      customInput={TextField}
      {...rest}
      decimalScale={2}
      fullWidth
      isNumericString
      onValueChange={(target) => {
        if (target.floatValue === displayValue) return
        setDisplayValue(target.floatValue || null)
        onChange(target.floatValue || null)
      }}
      prefix="$ "
      thousandSeparator
      value={displayValue}
    />
  )
}

export default AmountField
