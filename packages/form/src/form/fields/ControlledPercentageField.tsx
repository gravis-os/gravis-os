import React, { useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import TextField from './TextField'

export interface ControlledPercentageFieldProps {
  control: Control
  name: string
}

const NumberFormatField = (props) => {
  const { onChange, value, ...rest } = props
  const [displayValue, setDisplayValue] = React.useState(value)

  useEffect(() => {
    setDisplayValue(value * 100)
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
        setDisplayValue(target.floatValue)
        if (target.floatValue !== value) {
          // @ts-ignore
          onChange(target.floatValue / 100)
        }
      }}
      isNumericString
      suffix="%"
    />
  )
}

const ControlledPercentageField: React.FC<ControlledPercentageFieldProps> = (
  props
) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <NumberFormatField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledPercentageField
