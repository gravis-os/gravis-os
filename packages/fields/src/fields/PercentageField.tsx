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
      value={displayValue}
      fullWidth
      thousandSeparator
      decimalScale={2}
      onValueChange={(target) => {
        setDisplayValue(target.floatValue)
        handleValueChange(target)
      }}
      isNumericString
      suffix="%"
      ref={ref}
    />
  )
})

export default PercentageField
