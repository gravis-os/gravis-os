import React, { forwardRef, useCallback } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

import debounce from 'lodash/debounce'

import TextField, { TextFieldProps } from './TextField'

export interface PercentageFieldProps
  extends Omit<NumberFormatProps<TextFieldProps>, 'onChange'> {
  onChange: (percentage: number) => void
  value: number
}

const PercentageField = forwardRef<
  NumberFormat<TextFieldProps>,
  PercentageFieldProps
>((props, ref) => {
  const { onChange, value, ...rest } = props
  const [displayValue, setDisplayValue] = React.useState(value * 100)

  const handleValueChange = useCallback(
    debounce((target) => {
      if (target.floatValue !== value * 100) {
        onChange(target.floatValue / 100)
      }
    }, 300),
    []
  )

  return (
    <NumberFormat
      customInput={TextField}
      {...rest}
      decimalScale={2}
      fullWidth
      isNumericString
      onValueChange={(target) => {
        setDisplayValue(target.floatValue)
        handleValueChange(target)
      }}
      ref={ref}
      suffix="%"
      thousandSeparator
      value={displayValue}
    />
  )
})

export default PercentageField
