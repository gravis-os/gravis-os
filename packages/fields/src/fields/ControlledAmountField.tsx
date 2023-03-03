import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import TextField from './TextField'

export interface ControlledAmountFieldProps {
  control: Control
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
      value={displayValue}
      fullWidth
      thousandSeparator
      decimalScale={2}
      onValueChange={(target) => {
        if (target.floatValue === displayValue) return
        setDisplayValue(target.floatValue || null)
        onChange(target.floatValue || null)
      }}
      isNumericString
      prefix="$ "
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
