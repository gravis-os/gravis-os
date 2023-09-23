import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import TextField from './TextField'

export interface ControlledAmountFieldProps {
  control: Control
  label?: string
  name: string
}

const NumberFormatField = (props) => {
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

const ControlledAmountField: React.FC<ControlledAmountFieldProps> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <NumberFormatField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledAmountField
